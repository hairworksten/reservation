// グローバル変数
let currentPage = 'top-page';
let selectedMenu = null;
let selectedDate = null;
let selectedTime = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let companions = [];
let menus = {};
let holidays = [];
let reservations = [];

// Cloud Run API設定 - 最新のDeployされたURLに更新
const API_BASE_URL = 'https://hair-works-api-36382648212.asia-northeast1.run.app/api';

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadMenus();
    initCalendar();
    // 事前に休業日データを取得しておく（ページ切り替えを高速化）
    loadHolidays();
    
    // ロゴ画像の表示制御（Safari対応）
    initLogoDisplay();
});

// ロゴ画像の表示制御（Safari対応）
function initLogoDisplay() {
    const logoImg = document.querySelector('.header-logo .logo-image') || document.querySelector('.header-logo img');
    const logoContainer = document.querySelector('.header-logo');
    
    if (logoImg && logoContainer) {
        logoImg.onload = function() {
            logoContainer.classList.add('has-image');
        };
        
        logoImg.onerror = function() {
            logoContainer.classList.remove('has-image');
        };
        
        // 既に画像が読み込まれている場合
        if (logoImg.complete && logoImg.naturalHeight !== 0) {
            logoContainer.classList.add('has-image');
        }
    }
}

// Cloud Run APIからメニューデータの読み込み
async function loadMenus() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '<div class="loading">メニューを読み込んでいます...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/menus`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.menus) {
            menus = data.menus;
            console.log('メニューデータを正常に読み込みました:', menus);
        } else {
            throw new Error('メニューデータの形式が正しくありません');
        }
        
        displayMenus();
        
    } catch (error) {
        console.error('メニューの読み込みに失敗しました:', error);
        menuGrid.innerHTML = `
            <div class="error">
                <h3>メニューの読み込みに失敗しました</h3>
                <p>エラー: ${error.message}</p>
                <p>Cloud Run APIに接続できません。管理者にお問い合わせください。</p>
                <button onclick="loadMenus()" class="select-button" style="margin-top: 15px;">再試行</button>
            </div>
        `;
    }
}

// Cloud Run APIから休業日の読み込み
async function loadHolidays() {
    try {
        console.log('休業日データを取得中...');
        const response = await fetch(`${API_BASE_URL}/holidays`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.holidays)) {
            holidays = data.holidays;
            console.log('休業日データを正常に読み込みました:', holidays);
        } else {
            throw new Error('休業日データの形式が正しくありません');
        }
        
    } catch (error) {
        console.error('休業日の読み込みに失敗しました:', error);
        // エラーの場合は空の配列を使用
        holidays = [];
        
        // ユーザーに分かりやすいエラーメッセージを表示
        if (currentPage === 'datetime-page') {
            const calendarGrid = document.getElementById('calendar-grid');
            calendarGrid.innerHTML = `
                <div class="error">
                    <h4>休業日データの取得に失敗しました</h4>
                    <p>エラー: ${error.message}</p>
                    <button onclick="retryLoadHolidays()" class="select-button" style="margin-top: 15px;">再試行</button>
                </div>
            `;
        }
        
        throw error; // エラーを再スローして呼び出し元で処理
    }
}

// 休業日データの再取得（エラー時の再試行用）
async function retryLoadHolidays() {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '<div class="loading">休業日データを再取得しています...</div>';
    
    try {
        await loadHolidays();
        updateCalendar();
        console.log('休業日データの再取得が成功しました');
    } catch (error) {
        console.error('休業日データの再取得に失敗しました:', error);
        // loadHolidays() 内でエラー表示済み
    }
}

// デフォルト休業日（日曜日）- Firestoreからのデータ取得に失敗した場合のフォールバック
function loadDefaultHolidays() {
    holidays = [
        '2025-07-06', '2025-07-13', '2025-07-20', '2025-07-27',
        '2025-08-03', '2025-08-10', '2025-08-17', '2025-08-24', '2025-08-31'
    ];
}

// Cloud Run APIから予約データの読み込み
async function loadReservations(date) {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.reservations)) {
            reservations = data.reservations;
        } else {
            reservations = [];
        }
        
    } catch (error) {
        console.error('予約データの読み込みに失敗しました:', error);
        reservations = [];
    }
}

// 複数の予約データを一括送信
async function saveMultipleReservations(reservationsArray) {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reservations: reservationsArray
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || '予約の一括保存に失敗しました');
        }
        
        console.log('全ての予約データが正常に保存されました。');
        return result;
        
    } catch (error) {
        console.error('予約データの一括送信に失敗しました:', error);
        throw error;
    }
}

// 予約番号の重複チェック
async function checkReservationNumberExists(reservationNumber) {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/check/${reservationNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.exists || false;
        
    } catch (error) {
        console.error('予約番号の確認に失敗しました:', error);
        return false;
    }
}

// メニューの表示
function displayMenus() {
    const menuGrid = document.getElementById('menu-grid');
    
    if (Object.keys(menus).length === 0) {
        menuGrid.innerHTML = '<div class="error">メニューデータがありません。管理者にお問い合わせください。</div>';
        return;
    }
    
    menuGrid.innerHTML = '';
    
    Object.entries(menus).forEach(([menuName, menuData]) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.onclick = () => selectMenu(menuName, menuData);
        
        menuItem.innerHTML = `
            <div class="menu-header">
                <div class="menu-name">${menuName}</div>
                <div class="menu-price">¥${menuData.fare.toLocaleString()}</div>
            </div>
            <div class="menu-details" id="details-${menuName}">
                <div class="menu-description">${menuData.text}</div>
                <div class="menu-worktime">施術時間：約${menuData.worktime}分</div>
                <div class="reservation-notes">
                    <h4>予約に関する注意事項</h4>
                    <ul>
                        <li>予約受付締切：前日の23:59まで</li>
                        <li>キャンセル締切：1時間前まで</li>
                    </ul>
                </div>
                <button class="select-button" onclick="selectMenuAndGoNext('${menuName}')">このメニューを選択</button>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });
}

// メニュー選択
function selectMenu(menuName, menuData) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('selected');
        const details = item.querySelector('.menu-details');
        if (details) details.classList.remove('show');
    });
    
    event.currentTarget.classList.add('selected');
    const details = document.getElementById(`details-${menuName}`);
    details.classList.add('show');
    
    selectedMenu = { name: menuName, ...menuData };
}

// メニュー選択して次のページへ
async function selectMenuAndGoNext(menuName) {
    selectedMenu = { name: menuName, ...menus[menuName] };
    await goToDatetimePage(); // 非同期で日時選択ページへ
}

// ページ遷移
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
}

async function goToDatetimePage() {
    showPage('datetime-page');
    
    // ローディング表示
    const calendarGrid = document.getElementById('calendar-grid');
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const nextButton = document.getElementById('datetime-next-button');
    
    calendarGrid.innerHTML = '<div class="loading">カレンダーを読み込んでいます...</div>';
    timeSlotsContainer.style.display = 'none';
    nextButton.classList.remove('show');
    
    try {
        // 休業日データを取得
        await loadHolidays();
        
        // カレンダーを更新
        updateCalendar();
        
        console.log('日時選択ページの初期化が完了しました');
    } catch (error) {
        console.error('日時選択ページの初期化に失敗しました:', error);
        calendarGrid.innerHTML = '<div class="error">カレンダーの読み込みに失敗しました。再度お試しください。</div>';
    }
}

function goToInfoPage() {
    if (!selectedDate || !selectedTime) {
        alert('日時を選択してください。');
        return;
    }
    showPage('info-page');
}

function goToConfirmPage() {
    if (!validateInfoForm()) {
        return;
    }
    showPage('confirm-page');
    displayConfirmationDetails();
}

function goToCompletionPage() {
    showPage('completion-page');
}

function goToReservationCheck() {
    // 予約確認システムにリダイレクト
    window.open('https://hairworksten.github.io/reservation-conference/index.html', '_blank');
}

// カレンダーの初期化
function initCalendar() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    updateCalendar();
}

// カレンダーの更新
function updateCalendar() {
    const monthYear = document.getElementById('month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    monthYear.textContent = `${currentYear}年 ${monthNames[currentMonth]}`;
    
    calendarGrid.innerHTML = '';
    
    // 曜日ヘッダー
    const dayHeaders = ['日', '月', '火', '水', '木', '金', '土'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.color = '#ff6b35';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '10px 0';
        calendarGrid.appendChild(dayHeader);
    });
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // 空白セル
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }
    
    // 日付セル
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        const cellDate = new Date(currentYear, currentMonth, day);
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // 過去の日付は無効
        if (cellDate < tomorrow) {
            dayCell.classList.add('disabled');
            dayCell.title = '過去の日付は選択できません';
        } 
        // Firestoreから取得した休業日のみをチェック
        else if (holidays.includes(dateString)) {
            dayCell.classList.add('disabled');
            dayCell.classList.add('holiday');
            dayCell.title = '休業日です';
        } 
        // 1ヶ月を超える日付は無効
        else {
            const oneMonthLater = new Date(today);
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
            if (cellDate > oneMonthLater) {
                dayCell.classList.add('disabled');
                dayCell.title = '予約は1ヶ月先まで可能です';
            } else {
                dayCell.onclick = () => selectDate(dateString);
                dayCell.title = `${dateString}を選択`;
            }
        }
        
        calendarGrid.appendChild(dayCell);
    }
    
    console.log(`カレンダー更新完了 - 休業日: ${holidays.length}件 (${holidays.join(', ')})`);
}

// 月変更
async function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    
    // 選択状態をリセット
    document.getElementById('time-slots-container').style.display = 'none';
    document.getElementById('datetime-next-button').classList.remove('show');
    selectedDate = null;
    selectedTime = null;
    
    // ローディング表示
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '<div class="loading">カレンダーを更新しています...</div>';
    
    try {
        // 休業日データを再取得
        await loadHolidays();
        
        // カレンダーを更新
        updateCalendar();
        
        console.log(`${currentYear}年${currentMonth + 1}月のカレンダーを更新しました`);
    } catch (error) {
        console.error('カレンダー更新に失敗しました:', error);
        calendarGrid.innerHTML = '<div class="error">カレンダーの更新に失敗しました。再度お試しください。</div>';
    }
}

// 日付選択
function selectDate(dateString) {
    document.querySelectorAll('.calendar-day.selected').forEach(day => {
        day.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    selectedDate = dateString;
    selectedTime = null;
    
    displayTimeSlots(dateString);
}

// 時間スロットの表示
async function displayTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const timeSlots = document.getElementById('time-slots');
    
    timeSlotsContainer.style.display = 'block';
    timeSlots.innerHTML = '<div class="loading">時間を確認しています...</div>';
    
    try {
        await loadReservations(date);
        
        const availableTimes = ['10:30', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
        timeSlots.innerHTML = '';
        
        availableTimes.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            
            const isBooked = reservations.some(reservation => 
                reservation.date === date && 
                reservation.Time === time && 
                reservation.states === 0
            );
            
            if (isBooked) {
                timeSlot.classList.add('disabled');
                timeSlot.textContent += ' ✖️';
            } else {
                timeSlot.textContent += ' ⭕';
                timeSlot.onclick = () => selectTime(time);
            }
            
            timeSlots.appendChild(timeSlot);
        });
    } catch (error) {
        console.error('予約状況の確認に失敗しました:', error);
        timeSlots.innerHTML = '<div class="error">予約状況の確認に失敗しました。</div>';
    }
}

// 時間選択
function selectTime(time) {
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    selectedTime = time;
    
    document.getElementById('datetime-next-button').classList.add('show');
}

// 同行者追加
function addCompanion() {
    if (companions.length >= 3) {
        alert('同行者は最大3人まで追加できます。');
        return;
    }
    
    const companionId = `companion-${companions.length}`;
    companions.push({ id: companionId, menu: '', lastName: '', firstName: '' });
    
    const companionsContainer = document.getElementById('companions-container');
    const companionDiv = document.createElement('div');
    companionDiv.className = 'companion-section';
    companionDiv.id = companionId;
    
    companionDiv.innerHTML = `
        <div class="companion-header">
            <div class="companion-title">同行者 ${companions.length}</div>
            <button class="remove-companion" onclick="removeCompanion('${companionId}')">削除</button>
        </div>
        <div class="form-group">
            <label class="form-label">メニュー *</label>
            <select class="form-select" id="${companionId}-menu" required>
                <option value="">メニューを選択</option>
                ${Object.keys(menus).map(menu => `<option value="${menu}">${menu} - ¥${menus[menu].fare.toLocaleString()}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">姓 *</label>
            <input type="text" class="form-input" id="${companionId}-last-name" placeholder="例：田中" required>
        </div>
        <div class="form-group">
            <label class="form-label">名 *</label>
            <input type="text" class="form-input" id="${companionId}-first-name" placeholder="例：花子" required>
        </div>
    `;
    
    companionsContainer.appendChild(companionDiv);
}

// 同行者削除
function removeCompanion(companionId) {
    const companionIndex = companions.findIndex(c => c.id === companionId);
    if (companionIndex > -1) {
        companions.splice(companionIndex, 1);
        document.getElementById(companionId).remove();
        
        companions.forEach((companion, index) => {
            const companionDiv = document.getElementById(companion.id);
            companionDiv.querySelector('.companion-title').textContent = `同行者 ${index + 1}`;
        });
    }
}

// 入力フォームの検証
function validateInfoForm() {
    const lastName = document.getElementById('last-name').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!lastName || !firstName || !email) {
        alert('必須項目を入力してください。');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('正しいメールアドレスを入力してください。');
        return false;
    }
    
    for (let i = 0; i < companions.length; i++) {
        const companion = companions[i];
        const menu = document.getElementById(`${companion.id}-menu`).value;
        const lastName = document.getElementById(`${companion.id}-last-name`).value.trim();
        const firstName = document.getElementById(`${companion.id}-first-name`).value.trim();
        
        if (!menu || !lastName || !firstName) {
            alert(`同行者 ${i + 1} の情報を入力してください。`);
            return false;
        }
        
        companion.menu = menu;
        companion.lastName = lastName;
        companion.firstName = firstName;
    }
    
    return true;
}

// 確認画面の詳細表示
function displayConfirmationDetails() {
    const confirmationDetails = document.getElementById('confirmation-details');
    
    const lastName = document.getElementById('last-name').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    let totalPrice = selectedMenu.fare;
    companions.forEach(companion => {
        totalPrice += menus[companion.menu].fare;
    });
    
    let html = `
        <div class="confirmation-item">
            <span class="confirmation-label">予約日時</span>
            <span class="confirmation-value">${selectedDate} ${selectedTime}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">代表者メニュー</span>
            <span class="confirmation-value">${selectedMenu.name} (¥${selectedMenu.fare.toLocaleString()})</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">代表者お名前</span>
            <span class="confirmation-value">${lastName} ${firstName}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">メールアドレス</span>
            <span class="confirmation-value">${email}</span>
        </div>
    `;
    
    companions.forEach((companion, index) => {
        html += `
            <div class="confirmation-item">
                <span class="confirmation-label">同行者${index + 1}メニュー</span>
                <span class="confirmation-value">${companion.menu} (¥${menus[companion.menu].fare.toLocaleString()})</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">同行者${index + 1}お名前</span>
                <span class="confirmation-value">${companion.lastName} ${companion.firstName}</span>
            </div>
        `;
    });
    
    html += `
        <div class="confirmation-item" style="border-top: 2px solid #e74c3c; padding-top: 15px; margin-top: 15px;">
            <span class="confirmation-label">合計金額</span>
            <span class="confirmation-value">¥${totalPrice.toLocaleString()}</span>
        </div>
    `;
    
    confirmationDetails.innerHTML = html;
}

// 予約番号生成（重複チェック付き）
async function generateReservationNumber() {
    let reservationNumber;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
        reservationNumber = Math.floor(Math.random() * 90000000) + 10000000;
        attempts++;
        
        if (attempts >= maxAttempts) {
            throw new Error('予約番号の生成に失敗しました。しばらく時間をおいてから再度お試しください。');
        }
        
    } while (await checkReservationNumberExists(reservationNumber));
    
    return reservationNumber;
}

// 予約送信
async function submitReservation() {
    try {
        await loadReservations(selectedDate);
        
        const isStillAvailable = !reservations.some(reservation => 
            reservation.date === selectedDate && 
            reservation.Time === selectedTime && 
            reservation.states === 0
        );
        
        if (!isStillAvailable) {
            alert('申し訳ございません。選択された時間は既に予約が入りました。別の時間をお選びください。');
            goToDatetimePage();
            return;
        }
        
        const mainReservationNumber = await generateReservationNumber();
        
        const mainReservation = {
            reservationNumber: mainReservationNumber,
            Menu: selectedMenu.name,
            "Name-f": document.getElementById('last-name').value.trim(),
            "Name-s": document.getElementById('first-name').value.trim(),
            Time: selectedTime,
            WorkTime: selectedMenu.worktime,
            date: selectedDate,
            mail: document.getElementById('email').value.trim(),
            states: 0
        };
        
        const companionReservations = [];
        for (const companion of companions) {
            const companionReservationNumber = await generateReservationNumber();
            companionReservations.push({
                reservationNumber: companionReservationNumber,
                Menu: companion.menu,
                "Name-f": companion.lastName,
                "Name-s": companion.firstName,
                Time: selectedTime,
                WorkTime: menus[companion.menu].worktime,
                date: selectedDate,
                mail: "同行者",
                states: 0
            });
        }
        
        const result = await saveMultipleReservations([mainReservation, ...companionReservations]);
        
        displayCompletionDetails(mainReservation, companionReservations, result.email_sent);
        goToCompletionPage();
        
    } catch (error) {
        console.error('予約の送信に失敗しました:', error);
        alert('予約の送信に失敗しました。もう一度お試しください。');
    }
}

// 完了画面の詳細表示
function displayCompletionDetails(mainReservation, companionReservations, emailSent = false) {
    document.getElementById('completion-reservation-number').textContent = `予約番号: ${mainReservation.reservationNumber}`;
    
    let html = `
        <div class="confirmation-section">
            <div class="confirmation-title">店舗情報</div>
            <div class="confirmation-item">
                <span class="confirmation-label">店舗名</span>
                <span class="confirmation-value">Hair Works天</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">住所</span>
                <span class="confirmation-value">〒420-0817 静岡県静岡市葵区東静岡１丁目１−５７</span>
            </div>
        </div>
        
        <div class="confirmation-section">
            <div class="confirmation-title">予約詳細</div>
            <div class="confirmation-item">
                <span class="confirmation-label">予約日時</span>
                <span class="confirmation-value">${selectedDate} ${selectedTime}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">メニュー</span>
                <span class="confirmation-value">${mainReservation.Menu}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">お名前</span>
                <span class="confirmation-value">${mainReservation["Name-f"]} ${mainReservation["Name-s"]}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">メールアドレス</span>
                <span class="confirmation-value">${mainReservation.mail}</span>
            </div>
        </div>
    `;
    
    if (companionReservations.length > 0) {
        html += '<div class="confirmation-section"><div class="confirmation-title">同行者情報</div>';
        companionReservations.forEach((companion, index) => {
            html += `
                <div class="confirmation-item">
                    <span class="confirmation-label">同行者${index + 1}</span>
                    <span class="confirmation-value">${companion["Name-f"]} ${companion["Name-s"]} (${companion.Menu}) - 予約番号: ${companion.reservationNumber}</span>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // メール送信状況の表示
    if (emailSent) {
        html += `
            <div class="confirmation-section">
                <div class="confirmation-title">✅ 確認メール送信完了</div>
                <div class="confirmation-item">
                    <span class="confirmation-label">送信先</span>
                    <span class="confirmation-value">${mainReservation.mail}</span>
                </div>
                <div style="color: #4CAF50; font-size: 14px; margin-top: 10px;">
                    ご予約の詳細を記載した確認メールを送信いたしました。<br>
                    メールが届かない場合は、迷惑メールフォルダもご確認ください。
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="confirmation-section">
                <div class="confirmation-title">⚠️ メール送信について</div>
                <div style="color: #ff8c42; font-size: 14px;">
                    確認メールの送信に失敗しました。<br>
                    予約は正常に完了しております。<br>
                    詳細は上記の予約番号でご確認いただけます。
                </div>
            </div>
        `;
    }
    
    document.getElementById('completion-details').innerHTML = html;
}

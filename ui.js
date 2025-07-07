// Hair Works天 予約サイト - UI制御モジュール

// ロゴ画像の表示制御（Safari対応）
function initLogoDisplay() {
    const headerLogoImg = document.querySelector('.header-logo .logo-image') || document.querySelector('.header-logo img');
    const headerLogoContainer = document.querySelector('.header-logo');
    
    if (headerLogoImg && headerLogoContainer) {
        headerLogoImg.onload = function() {
            headerLogoContainer.classList.add('has-image');
        };
        
        headerLogoImg.onerror = function() {
            headerLogoContainer.classList.remove('has-image');
        };
        
        if (headerLogoImg.complete && headerLogoImg.naturalHeight !== 0) {
            headerLogoContainer.classList.add('has-image');
        }
    }
}

// ページ遷移
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
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
    
    monthYear.textContent = `${currentYear}年 ${MONTH_NAMES[currentMonth]}`;
    
    calendarGrid.innerHTML = '';
    
    // 曜日ヘッダー
    DAY_HEADERS.forEach(day => {
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
        
        if (cellDate < tomorrow) {
            dayCell.classList.add('disabled');
            dayCell.title = '過去の日付は選択できません';
        } else if (holidays.includes(dateString)) {
            dayCell.classList.add('disabled');
            dayCell.classList.add('holiday');
            dayCell.title = '休業日です';
        } else {
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
        
        timeSlots.innerHTML = '';
        
        APP_CONFIG.timeSlots.forEach(time => {
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
    if (companions.length >= APP_CONFIG.maxCompanions) {
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

// 完了画面の詳細表示
function displayCompletionDetails(mainReservation, companionReservations) {
    document.getElementById('completion-reservation-number').textContent = `予約番号: ${mainReservation.reservationNumber}`;
    
    let html = `
        <div class="confirmation-section">
            <div class="confirmation-title">店舗情報</div>
            <div class="confirmation-item">
                <span class="confirmation-label">店舗名</span>
                <span class="confirmation-value">${APP_CONFIG.shopInfo.name}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">住所</span>
                <span class="confirmation-value">${APP_CONFIG.shopInfo.address}</span>
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
    
    document.getElementById('completion-details').innerHTML = html;
}

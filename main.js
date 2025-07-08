// Hair Works天 予約サイト - メイン処理（緊急対応版）

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadMenus();
    
    // 重要なお知らせの緊急対応: 3秒後にデフォルト表示
    setTimeout(() => {
        if (!notices || notices.length === 0) {
            console.log('緊急対応: デフォルトのお知らせを表示します');
            notices = [
                { icon: '⏰', text: 'ご予約の開始時刻は目安となっており、前のお客様の施術内容によっては、お時間をいただくことがございます。ご理解のほど、よろしくお願いいたします。' },
                { icon: '📞', text: '電話でのご予約は承っておりません。何卒ご了承ください。' },
                { icon: '⏱️', text: 'キャンセルの締切は、ご予約時間の1時間前までとさせていただいております。' }
            ];
            displayNotices();
        }
    }, 3000);
    
    loadNotices(); // 重要なお知らせの読み込みを追加
    initCalendar();
    loadHolidays();
    initLogoDisplay();
});

// ページ遷移関数群
function goToTopPage() {
    showPage('top-page');
    resetFormData();
}

function goToMenuPage() {
    showPage('menu-page');
    if (Object.keys(menus).length === 0) {
        loadMenus();
    }
}

async function goToDatetimePage() {
    showPage('datetime-page');
    
    const calendarGrid = document.getElementById('calendar-grid');
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const nextButton = document.getElementById('datetime-next-button');
    
    calendarGrid.innerHTML = '<div class="loading">カレンダーを読み込んでいます...</div>';
    timeSlotsContainer.style.display = 'none';
    nextButton.classList.remove('show');
    
    try {
        await loadHolidays();
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

// メニュー選択して次のページへ
async function selectMenuAndGoNext(menuName) {
    selectedMenu = { name: menuName, ...menus[menuName] };
    await goToDatetimePage();
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
    
    document.getElementById('time-slots-container').style.display = 'none';
    document.getElementById('datetime-next-button').classList.remove('show');
    selectedDate = null;
    selectedTime = null;
    
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '<div class="loading">カレンダーを更新しています...</div>';
    
    try {
        await loadHolidays();
        updateCalendar();
        console.log(`${currentYear}年${currentMonth + 1}月のカレンダーを更新しました`);
    } catch (error) {
        console.error('カレンダー更新に失敗しました:', error);
        calendarGrid.innerHTML = '<div class="error">カレンダーの更新に失敗しました。再度お試しください。</div>';
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
            alert(`同行者の情報を入力してください。`);
            return false;
        }
        
        companion.menu = menu;
        companion.lastName = lastName;
        companion.firstName = firstName;
    }
    
    return true;
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
        
        await saveMultipleReservations([mainReservation, ...companionReservations]);
        
        displayCompletionDetails(mainReservation, companionReservations);
        goToCompletionPage();
        
    } catch (error) {
        console.error('予約の送信に失敗しました:', error);
        alert('予約の送信に失敗しました。もう一度お試しください。');
    }
}

// フォームデータのリセット
function resetFormData() {
    selectedMenu = null;
    selectedDate = null;
    selectedTime = null;
    companions = [];
    
    const forms = document.querySelectorAll('input, select');
    forms.forEach(form => {
        if (form.type !== 'button' && form.type !== 'submit') {
            form.value = '';
        }
    });
    
    const companionsContainer = document.getElementById('companions-container');
    if (companionsContainer) {
        companionsContainer.innerHTML = '';
    }
}

// エラーハンドリング
window.addEventListener('error', function(event) {
    console.error('JavaScript エラーが発生しました:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('未処理のPromise拒否:', event.reason);
});

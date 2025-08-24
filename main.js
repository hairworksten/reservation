// Hair Works天 予約サイト - メイン処理

// 予約送信の状態管理
let isSubmittingReservation = false;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOMContentLoaded 開始 ===');
    
    // 各関数を順番に呼び出し
    loadReservationSettings(); // 予約設定を最初に読み込み
    console.log('loadReservationSettings() を呼び出しました');
    
    loadMenus();
    console.log('loadMenus() を呼び出しました');
    
    loadNotices(); // 重要なお知らせの読み込み
    console.log('loadNotices() を呼び出しました');
    
    // 祝日データを読み込み
    loadJapaneseHolidays();
    console.log('loadJapaneseHolidays() を呼び出しました');
    
    initCalendar();
    console.log('initCalendar() を呼び出しました');
    
    loadHolidays();
    console.log('loadHolidays() を呼び出しました');
    
    initLogoDisplay();
    console.log('initLogoDisplay() を呼び出しました');
    
    // 同意チェックボックスのイベントリスナーを設定
    initAgreementCheckbox();
    console.log('initAgreementCheckbox() を呼び出しました');
    
    // ローカルストレージ対応チェック
    if (isLocalStorageSupported()) {
        console.log('ローカルストレージがサポートされています');
    } else {
        console.warn('ローカルストレージがサポートされていません');
    }
    
    console.log('=== DOMContentLoaded 完了 ===');
});

// 同意チェックボックスの初期化
function initAgreementCheckbox() {
    const agreementCheckbox = document.getElementById('agreement-checkbox');
    const submitButton = document.getElementById('submit-button');
    
    if (agreementCheckbox && submitButton) {
        agreementCheckbox.addEventListener('change', function() {
            submitButton.disabled = !this.checked;
            if (this.checked) {
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            } else {
                submitButton.style.opacity = '0.5';
                submitButton.style.cursor = 'not-allowed';
            }
        });
    }
}

// 同意チェックボックスをリセット
function resetAgreementCheckbox() {
    const agreementCheckbox = document.getElementById('agreement-checkbox');
    const submitButton = document.getElementById('submit-button');
    
    if (agreementCheckbox && submitButton) {
        agreementCheckbox.checked = false;
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
    }
}

// 同行者のリセット関数（新規追加）
function resetCompanions() {
    // 同行者配列をクリア
    companions = [];
    
    // DOM要素もクリア
    const companionsContainer = document.getElementById('companions-container');
    if (companionsContainer) {
        companionsContainer.innerHTML = '';
    }
    
    console.log('同行者情報をリセットしました');
}

// ページ遷移関数群
function goToTopPage() {
    showPage('top-page');
    resetFormData();
    // 予約送信状態をリセット
    resetSubmissionState();
}

function goToMenuPage() {
    showPage('menu-page');
    if (Object.keys(menus).length === 0) {
        loadMenus();
    }
    // メニューページに戻る際に同行者をリセット
    resetCompanions();
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
        // 予約設定、祝日データ、休業日データを並行して読み込み
        await Promise.all([
            loadReservationSettings(),
            loadJapaneseHolidays(),
            loadHolidays()
        ]);
        updateCalendar();
        console.log('日時選択ページの初期化が完了しました');
    } catch (error) {
        console.error('日時選択ページの初期化に失敗しました:', error);
        calendarGrid.innerHTML = '<div class="error">カレンダーの読み込みに失敗しました。再度お試しください。</div>';
    }
    
    // 日時選択ページに戻る際に同行者をリセット
    resetCompanions();
}

function goToInfoPage() {
    if (!selectedDate || !selectedTime) {
        alert('日時を選択してください。');
        return;
    }
    
    // 選択された日付が予約可能かチェック
    if (!isValidReservationDate(selectedDate)) {
        alert(`選択された日付は予約できません。当日から${APP_CONFIG.maxAdvanceBookingDays}日後まで予約可能です。`);
        goToDatetimePage();
        return;
    }
    
    showPage('info-page');
    // 情報入力ページに来る際に同行者をリセット（戻るボタンで戻ってきた場合に対応）
    resetCompanions();
    
    // 顧客情報の自動入力（新規追加）
    if (isLocalStorageSupported()) {
        setTimeout(() => {
            autoFillCustomerInfo();
        }, 100);
    }
}

function goToConfirmPage() {
    if (!validateInfoForm()) {
        return;
    }
    showPage('confirm-page');
    displayConfirmationDetails();
    // 確認ページに移動した際に予約送信状態をリセット
    resetSubmissionState();
    // チェックボックスの状態をリセット
    resetAgreementCheckbox();
    
    // 情報保存オプションの表示（新規追加）
    if (isLocalStorageSupported()) {
        showSaveInfoOption();
    }
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
        await Promise.all([
            loadReservationSettings(),
            loadHolidays()
        ]);
        updateCalendar();
        console.log(`${currentYear}年${currentMonth + 1}

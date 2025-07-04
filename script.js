// APIベースURL
const API_BASE_URL = "https://reservation-api-36382648212.asia-northeast1.run.app/api";

// グローバル変数
let currentUser = null;
let reservations = [];
let mailTemplates = {};
let currentMailRecipient = ‘’;
let currentMenus = {}; // メニューフォームリセット
function resetMenuForm() {
menuNameInput.value = ‘’;
menuTextInput.value = ‘’;
menuWorktimeInput.value = ‘’;
menuFareInput.value = ‘’;
addMenuBtn.textContent = ‘追加’;
addMenuBtn.onclick = handleAddMenu;
}

// メニュー削除
async function handleDeleteMenu(name) {
showConfirm(‘このメニューを削除しますか？’, ‘’, async () => {
try {
const response = await fetch(`${API_BASE_URL}/menus/${encodeURIComponent(name)}`, {
method: ‘DELETE’
});

```
        if (response.ok) {
            await loadMenus();
        }
    } catch (error) {
        console.error('Error deleting menu:', error);
    }
});
```

}

// 確認モーダル表示
function showConfirm(title, message, onConfirm) {
confirmTitle.textContent = title;
confirmMessage.textContent = message;
confirmYesBtn.onclick = () => {
closeConfirmModal();
onConfirm();
};
confirmModal.classList.add(‘active’);
}

// 確認モーダル閉じる
function closeConfirmModal() {
confirmModal.classList.remove(‘active’);
}

// エラー表示
function showError(message) {
loginError.textContent = message;
loginError.classList.add(‘show’);
}

// エラー非表示
function hideError() {
loginError.classList.remove(‘show’);
}

// 成功メッセージ表示
function showSuccessMessage(message) {
holidayMessage.textContent = message;
holidayMessage.className = ‘message success’;
setTimeout(() => {
holidayMessage.className = ‘message’;
}, 3000);
}

// エラーメッセージ表示
function showErrorMessage(message) {
holidayMessage.textContent = message;
holidayMessage.className = ‘message error’;
setTimeout(() => {
holidayMessage.className = ‘message’;
}, 3000);
}

// ログアウト処理
function handleLogout() {
currentUser = null;
localStorage.removeItem(‘currentUser’);
showLoginScreen();
}

// メイン画面表示
function showMainScreen() {
loginScreen.classList.add(‘hidden’);
mainScreen.classList.remove(‘hidden’);
loadInitialData();
}

// ログイン画面表示
function showLoginScreen() {
mainScreen.classList.add(‘hidden’);
loginScreen.classList.remove(‘hidden’);
userIdInput.value = ‘’;
passwordInput.value = ‘’;
hideError();
}

// 初期データ読み込み
async function loadInitialData() {
await loadPopulation();
await loadReservations();
await loadMailTemplates();
await loadHolidays();
await loadMenus();
}

// タブ切り替え
function switchTab(tabName) {
tabBtns.forEach(btn => btn.classList.remove(‘active’));
tabContents.forEach(content => content.classList.remove(‘active’));

```
const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
const activeContent = document.getElementById(`${tabName}-tab`);

if (activeTab && activeContent) {
    activeTab.classList.add('active');
    activeContent.classList.add('active');
}
```

}

// 人数データ読み込み
async function loadPopulation() {
try {
const response = await fetch(`${API_BASE_URL}/population`);
const data = await response.json();
currentPopulationSpan.textContent = data.now || 0;
} catch (error) {
console.error(‘Error loading population:’, error);
}
}

// 人数更新
async function updatePopulation(change) {
const currentCount = parseInt(currentPopulationSpan.textContent);
const newCount = Math.max(0, currentCount + change);

```
try {
    const response = await fetch(`${API_BASE_URL}/population`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ now: newCount })
    });

    if (response.ok) {
        currentPopulationSpan.textContent = newCount;
    }
} catch (error) {
    console.error('Error updating population:', error);
}
```

}
let currentTemplates = {}; // テンプレートデータを保存

// DOM要素の取得
const loginScreen = document.getElementById(‘login-screen’);
const mainScreen = document.getElementById(‘main-screen’);
const loginBtn = document.getElementById(‘login-btn’);
const logoutBtn = document.getElementById(‘logout-btn’);
const userIdInput = document.getElementById(‘user-id’);
const passwordInput = document.getElementById(‘password’);
const loginError = document.getElementById(‘login-error’);

// タブ関連
const tabBtns = document.querySelectorAll(’.tab-btn’);
const tabContents = document.querySelectorAll(’.tab-content’);

// 人数関連
const currentPopulationSpan = document.getElementById(‘current-population’);
const populationMinusBtn = document.getElementById(‘population-minus’);
const populationPlusBtn = document.getElementById(‘population-plus’);

// 予約表示エリア
const todayReservationsDiv = document.getElementById(‘today-reservations’);
const reservationHistoryDiv = document.getElementById(‘reservation-history’);

// 検索関連
const searchTextInput = document.getElementById(‘search-text’);
const searchDateFromInput = document.getElementById(‘search-date-from’);
const searchDateToInput = document.getElementById(‘search-date-to’);
const searchBtn = document.getElementById(‘search-btn’);
const clearSearchBtn = document.getElementById(‘clear-search-btn’);

// パスワード変更
const oldPasswordInput = document.getElementById(‘old-password’);
const newPasswordInput = document.getElementById(‘new-password’);
const confirmPasswordInput = document.getElementById(‘confirm-password’);
const changePasswordBtn = document.getElementById(‘change-password-btn’);

// 定休日関連
const holidayDateInput = document.getElementById(‘holiday-date’);
const addHolidayBtn = document.getElementById(‘add-holiday-btn’);
const holidaysListDiv = document.getElementById(‘holidays-list’);
const holidayMessage = document.getElementById(‘holiday-message’);

// メニュー関連
const menuNameInput = document.getElementById(‘menu-name’);
const menuTextInput = document.getElementById(‘menu-text’);
const menuWorktimeInput = document.getElementById(‘menu-worktime’);
const menuFareInput = document.getElementById(‘menu-fare’);
const addMenuBtn = document.getElementById(‘add-menu-btn’);
const menusListDiv = document.getElementById(‘menus-list’);

// テンプレート関連
const templateTitleInput = document.getElementById(‘template-title’);
const templateMainInput = document.getElementById(‘template-main’);
const addTemplateBtn = document.getElementById(‘add-template-btn’);
const templatesListDiv = document.getElementById(‘templates-list’);

// モーダル関連
const mailModal = document.getElementById(‘mail-modal’);
const confirmModal = document.getElementById(‘confirm-modal’);
const mailTemplatesListDiv = document.getElementById(‘mail-templates-list’);
const mailSubjectInput = document.getElementById(‘mail-subject’);
const mailBodyInput = document.getElementById(‘mail-body’);
const sendMailBtn = document.getElementById(‘send-mail-btn’);
const cancelMailBtn = document.getElementById(‘cancel-mail-btn’);
const confirmYesBtn = document.getElementById(‘confirm-yes-btn’);
const confirmNoBtn = document.getElementById(‘confirm-no-btn’);
const confirmTitle = document.getElementById(‘confirm-title’);
const confirmMessage = document.getElementById(‘confirm-message’);

// 初期化
document.addEventListener(‘DOMContentLoaded’, function() {
initializeEventListeners();
checkLoginStatus();
});

// イベントリスナーの設定
function initializeEventListeners() {
// ログイン関連
loginBtn.addEventListener(‘click’, handleLogin);
logoutBtn.addEventListener(‘click’, handleLogout);

```
// Enterキーでログイン
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleLogin();
    }
});

// タブ切り替え
tabBtns.forEach(
```

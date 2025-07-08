// Hair Works天 予約サイト - 設定ファイル

// Cloud Run API設定
const API_BASE_URL = 'https://hair-works-api-36382648212.asia-northeast1.run.app/api';

// アプリケーション設定
const APP_CONFIG = {
    maxCompanions: 1, // 最大同行者数を1名に変更
    maxAdvanceBookingDays: 30,
    cancelDeadlineHours: 1,
    reservationCutoffTime: '23:59',
    businessHours: {
        weekday: { start: '10:30', end: '19:30' },
        weekend: { start: '09:30', end: '18:30' }
    },
    timeSlots: ['10:30', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    shopInfo: {
        name: 'Hair Works天',
        address: '〒420-0817 静岡県静岡市葵区東静岡１丁目１−５７',
        phone: null, // 電話予約は受け付けていない
        parkingSpaces: 240
    }
};

// グローバル変数の初期化
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
let notices = []; // 重要なお知らせ用グローバル変数を追加

// 月名配列
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// 曜日配列
const DAY_HEADERS = ['日', '月', '火', '水', '木', '金', '土'];

// エラーメッセージ
const ERROR_MESSAGES = {
    menuLoadFailed: 'メニューの読み込みに失敗しました',
    noticeLoadFailed: '重要なお知らせの読み込みに失敗しました',
    holidayLoadFailed: '休業日データの取得に失敗しました',
    reservationLoadFailed: '予約データの読み込みに失敗しました',
    reservationSubmitFailed: '予約の送信に失敗しました',
    networkError: 'ネットワークエラーが発生しました',
    validationError: '入力内容に不備があります',
    timeSlotUnavailable: '選択された時間は既に予約済みです'
};

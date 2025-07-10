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
        weekday: { start: '10:00', end: '19:00' },
        weekend: { start: '09:00', end: '18:00' }
    },
    // 平日・土日祝で分けた時間スロット
    timeSlots: {
        weekday: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
        weekend: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    },
    shopInfo: {
        name: 'Hair Works天',
        address: '〒420-0817 静岡県静岡市葵区東静岡１丁目１−５７',
        phone: null, // 電話予約は受け付けていない
        parkingSpaces: 240
    }
};

// 日付が平日か土日祝かを判定する関数
function isWeekendOrHoliday(dateString) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0=日曜日, 6=土曜日
    
    // 土曜日(6)または日曜日(0)の場合は土日祝扱い
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return true;
    }
    
    // 日本の祝日リストに含まれている場合
    if (japaneseHolidays.includes(dateString)) {
        return true;
    }
    
    return false;
}

// 指定日付の時間スロットを取得する関数
function getTimeSlotsForDate(dateString) {
    if (isWeekendOrHoliday(dateString)) {
        return APP_CONFIG.timeSlots.weekend;
    } else {
        return APP_CONFIG.timeSlots.weekday;
    }
}

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
let notices = [];
let japaneseHolidays = []; // 日本の祝日リスト

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

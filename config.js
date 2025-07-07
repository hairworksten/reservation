// Hair Works天 予約サイト - 設定ファイル

// Cloud Run API設定
const API_BASE_URL = 'https://hair-works-api-36382648212.asia-northeast1.run.app/api';

// アプリケーション設定
const APP_CONFIG = {
    maxCompanions: 3,
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

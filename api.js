// Hair Works天 予約サイト - API通信モジュール

// メニューデータの読み込み
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
                <h3>${ERROR_MESSAGES.menuLoadFailed}</h3>
                <p>エラー: ${error.message}</p>
                <p>Cloud Run APIに接続できません。管理者にお問い合わせください。</p>
                <button onclick="loadMenus()" class="select-button" style="margin-top: 15px;">再試行</button>
            </div>
        `;
    }
}

// 休業日データの読み込み
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
        holidays = [];
        
        if (currentPage === 'datetime-page') {
            const calendarGrid = document.getElementById('calendar-grid');
            calendarGrid.innerHTML = `
                <div class="error">
                    <h4>${ERROR_MESSAGES.holidayLoadFailed}</h4>
                    <p>エラー: ${error.message}</p>
                    <button onclick="retryLoadHolidays()" class="select-button" style="margin-top: 15px;">再試行</button>
                </div>
            `;
        }
        
        throw error;
    }
}

// 休業日データの再取得
async function retryLoadHolidays() {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '<div class="loading">休業日データを再取得しています...</div>';
    
    try {
        await loadHolidays();
        updateCalendar();
        console.log('休業日データの再取得が成功しました');
    } catch (error) {
        console.error('休業日データの再取得に失敗しました:', error);
    }
}

// 予約データの読み込み
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

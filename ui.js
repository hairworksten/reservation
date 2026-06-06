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

// 重要なお知らせの表示
function displayNotices() {
    console.log('=== displayNotices() 開始 ===');
    console.log('notices配列:', notices);
    
    const noticeContent = document.querySelector('.notice-content');
    
    if (!noticeContent) {
        console.error('notice-content要素が見つかりません');
        return;
    }
    
    console.log('notice-content要素が見つかりました');
    
    if (!notices || notices.length === 0) {
        console.warn('notices配列が空です');
        noticeContent.innerHTML = `
            <div class="error">
                <p>重要なお知らせを取得できませんでした。</p>
                <button onclick="retryLoadNotices()" class="select-button" style="margin-top: 15px;">再試行</button>
            </div>
        `;
        return;
    }
    
    console.log('お知らせを表示開始:', notices.length, '件');
    noticeContent.innerHTML = '';
    
    notices.forEach((notice, index) => {
        console.log(`お知らせ${index + 1}:`, notice);
        
        const noticeItem = document.createElement('div');
        noticeItem.className = 'notice-item';
        
        // notice.iconとnotice.textが存在するかチェック
        const icon = notice.icon || '📝';
        const text = notice.text || 'お知らせ内容が設定されていません';
        
        noticeItem.innerHTML = `
            <span class="notice-icon">${icon}</span>
            <span class="notice-text">${text}</span>
        `;
        
        noticeContent.appendChild(noticeItem);
        console.log(`お知らせ${index + 1}を追加しました`);
    });
    
    console.log(`${notices.length}件の重要なお知らせを表示しました`);
    console.log('最終的なnoticeContentのHTML:', noticeContent.innerHTML);
    console.log('=== displayNotices() 終了 ===');
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
                        <li>ご予約は翌日以降の日程で承っております</li>
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

// カレンダーの更新（スタッフ表示付き・修正版）
async function updateCalendar() {
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
    
    // 月別スタッフ情報を取得
    const monthlyStaffData = await getMonthlyStaffInfo(currentYear, currentMonth);
    console.log('取得したスタッフデータ:', monthlyStaffData);
    
    // 日本時間での今日の日付を取得
    const now = new Date();
    const japanTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
    const today = new Date(japanTime.getFullYear(), japanTime.getMonth(), japanTime.getDate());
    
    // 翌日から予約可能（1日後から）
    const minBookingDate = new Date(today);
    minBookingDate.setDate(minBookingDate.getDate() + APP_CONFIG.minAdvanceBookingDays);
    
    // 最大予約可能日を計算
    const maxBookingDate = new Date(today);
    maxBookingDate.setDate(maxBookingDate.getDate() + APP_CONFIG.maxAdvanceBookingDays);
    
    console.log('カレンダー更新:');
    console.log(`今日（日本時間）: ${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
    console.log(`最小予約日: ${minBookingDate.getFullYear()}-${String(minBookingDate.getMonth() + 1).padStart(2, '0')}-${String(minBookingDate.getDate()).padStart(2, '0')}`);
    console.log(`最大予約日: ${maxBookingDate.getFullYear()}-${String(maxBookingDate.getMonth() + 1).padStart(2, '0')}-${String(maxBookingDate.getDate()).padStart(2, '0')}`);
    
    // 空白セル
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }
    
    // 日付セル
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        const cellDate = new Date(currentYear, currentMonth, day);
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // スタッフ情報を取得（0埋め形式のキーで検索）
        const dayKey = String(day).padStart(2, '0'); // "01", "02", "15"
        const staffName = monthlyStaffData[dayKey] || null;
        
        // 日付番号を表示
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);
        
        // スタッフ名を表示（ある場合）
        if (staffName) {
            const staffElement = document.createElement('div');
            staffElement.className = 'calendar-day-staff';
            staffElement.textContent = staffName;
            dayCell.appendChild(staffElement);
            console.log(`${dateString}にスタッフ表示: ${staffName}`);
        }
        
        // 祝日判定を追加
        const isHoliday = japaneseHolidays.includes(dateString);
        if (isHoliday) {
            dayCell.classList.add('japanese-holiday');
        }
        
        // 予約可能日の判定（翌日から）
        if (cellDate < minBookingDate) {
            dayCell.classList.add('disabled');
            dayCell.title = `予約は翌日以降から可能です`;
            console.log(`❌ ${dateString} は予約不可（当日または過去の日付）`);
        } else if (cellDate > maxBookingDate) {
            dayCell.classList.add('disabled');
            dayCell.title = `予約は${APP_CONFIG.maxAdvanceBookingDays}日後まで可能です`;
            console.log(`❌ ${dateString} は予約不可（最大予約日より後）`);
        } else if (holidays.includes(dateString)) {
            dayCell.classList.add('disabled');
            dayCell.classList.add('holiday');
            dayCell.title = '休業日です';
            console.log(`❌ ${dateString} は予約不可（休業日）`);
        } else {
            dayCell.onclick = () => selectDate(dateString);
            
            // 平日・土日祝を示すツールチップを追加
            const isWeekend = isWeekendOrHoliday(dateString);
            const timeInfo = isWeekend ? '09:00-17:00' : '10:00-18:00';
            const dayType = isWeekend ? '土日祝' : '平日';
            
            let tooltipText = `${dateString}を選択 (${dayType}: ${timeInfo})`;
            if (staffName) {
                tooltipText += ` - 担当: ${staffName}`;
            }
            dayCell.title = tooltipText;
            
            console.log(`✅ ${dateString} は予約可能 - スタッフ: ${staffName || '未設定'}`);
        }
        
        calendarGrid.appendChild(dayCell);
    }
    
    console.log(`カレンダー更新完了 - 休業日: ${holidays.length}件, 祝日: ${japaneseHolidays.length}件`);
    console.log(`予約可能期間: ${minBookingDate.getFullYear()}-${String(minBookingDate.getMonth() + 1).padStart(2, '0')}-${String(minBookingDate.getDate()).padStart(2, '0')} ～ ${maxBookingDate.getFullYear()}-${String(maxBookingDate.getMonth() + 1).padStart(2, '0')}-${String(maxBookingDate.getDate()).padStart(2, '0')}`);
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

// 時間スロットの表示（スタッフ情報付き・修正版）
async function displayTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const timeSlots = document.getElementById('time-slots');
    
    timeSlotsContainer.style.display = 'block';
    timeSlots.innerHTML = '<div class="loading">時間を確認しています...</div>';
    
    try {
        // ui.js内で直接日付判定を行う
        const [year, month, day] = date.split('-').map(Number);
        const targetDate = new Date(year, month - 1, day);
        
        // 日本時間での今日の日付を取得
        const now = new Date();
        const japanTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
        const today = new Date(japanTime.getFullYear(), japanTime.getMonth(), japanTime.getDate());
        
        // 翌日から予約可能（1日後から）
        const minimumDate = new Date(today);
        minimumDate.setDate(minimumDate.getDate() + APP_CONFIG.minAdvanceBookingDays);
        
        // 最大予約日数チェック
        const maximumDate = new Date(today);
        maximumDate.setDate(maximumDate.getDate() + APP_CONFIG.maxAdvanceBookingDays);
        
        console.log(`displayTimeSlots 日付チェック: ${date}`);
        console.log(`今日: ${today.toDateString()}`);
        console.log(`対象日: ${targetDate.toDateString()}`);
        console.log(`最小予約日: ${minimumDate.toDateString()}`);
        console.log(`最大予約日: ${maximumDate.toDateString()}`);
        
        if (targetDate < minimumDate || targetDate > maximumDate) {
            console.log('❌ 予約期間外です');
            timeSlots.innerHTML = '<div class="error">この日は予約できません。</div>';
            return;
        }
        
        // 休業日チェック
        if (holidays.includes(date)) {
            console.log('❌ 休業日です');
            timeSlots.innerHTML = '<div class="error">この日は休業日です。</div>';
            return;
        }
        
        console.log('✅ 予約可能な日付です');
        
        // バックエンドから時間スロット情報とスタッフ情報を取得（フォールバック付き）
        const slotInfo = await getAvailableTimeSlots(date);
        
        // 予約状況を取得
        await loadReservations(date);
        
        timeSlots.innerHTML = '';
        
        // バックエンドから取得した時間スロットを使用
        const availableTimeSlots = slotInfo.timeslots || getTimeSlotsForDate(date);
        const isWeekend = slotInfo.isWeekend !== undefined ? slotInfo.isWeekend : isWeekendOrHoliday(date);
        const staffName = slotInfo.staff; // スタッフ情報を取得
        
        // 時間スロットのタイトルを更新（スタッフ情報付き）
        const timeSelectionTitle = document.querySelector('.time-selection-title');
        if (timeSelectionTitle) {
            const dayType = isWeekend ? '土日祝' : '平日';
            const businessHours = slotInfo.businessHours || APP_CONFIG.businessHours[isWeekend ? 'weekend' : 'weekday'];
            
            let titleText = `時間を選択してください（${dayType}: ${businessHours.start}〜${businessHours.end}）`;
            
            // スタッフ情報がある場合は追加表示
            if (staffName) {
                titleText += ` - 担当：${staffName}`;
            }
            
            timeSelectionTitle.innerHTML = titleText;
            
            // スタッフ情報がある場合はスタイリング
            if (staffName) {
                timeSelectionTitle.classList.add('with-staff');
            } else {
                timeSelectionTitle.classList.remove('with-staff');
            }
        }
        
        if (availableTimeSlots.length === 0) {
            timeSlots.innerHTML = '<div class="error">この日は予約可能な時間がありません。</div>';
            return;
        }
        
        availableTimeSlots.forEach(time => {
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
                timeSlot.title = 'この時間は既に予約済みです';
            } else {
                timeSlot.textContent += ' ⭕';
                timeSlot.onclick = () => selectTime(time);
                let tooltipText = `${time}を選択`;
                if (staffName) {
                    tooltipText += ` (担当: ${staffName})`;
                }
                timeSlot.title = tooltipText;
            }
            
            timeSlots.appendChild(timeSlot);
        });
        
        const dayTypeText = isWeekend ? '土日祝' : '平日';
        console.log(`${date}の時間スロット表示完了 (${dayTypeText}: ${availableTimeSlots.length}件, スタッフ: ${staffName || '未設定'})`);
        
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

// 同行者追加機能は廃止（2026-06 ホットペッパー対応要件にて削除）
// バックエンド側での同行者予約拒否処理はフェーズ2で対応予定

// 確認画面の詳細表示
function displayConfirmationDetails() {
    const confirmationDetails = document.getElementById('confirmation-details');
    
    const lastName = document.getElementById('last-name').value.trim();
    const phoneNumber = document.getElementById('first-name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    let totalPrice = selectedMenu.fare;
    companions.forEach(companion => {
        totalPrice += menus[companion.menu].fare;
    });
    
    // 選択された日時の詳細情報を追加
    const isWeekend = isWeekendOrHoliday(selectedDate);
    const dayType = isWeekend ? '土日祝' : '平日';
    
    let html = `
        <div class="confirmation-item">
            <span class="confirmation-label">予約日時</span>
            <span class="confirmation-value">${selectedDate} ${selectedTime} (${dayType})</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">代表者メニュー</span>
            <span class="confirmation-value">${selectedMenu.name} (¥${selectedMenu.fare.toLocaleString()})</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">代表者お名前</span>
            <span class="confirmation-value">${lastName}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">電話番号</span>
            <span class="confirmation-value">${phoneNumber}</span>
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
                <span class="confirmation-value">${companion.lastName}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">同行者${index + 1}電話番号</span>
                <span class="confirmation-value">${companion.firstName}</span>
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
    
    // 日時の詳細情報を追加
    const isWeekend = isWeekendOrHoliday(selectedDate);
    const dayType = isWeekend ? '土日祝' : '平日';
    
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
                <span class="confirmation-value">${selectedDate} ${selectedTime} (${dayType})</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">メニュー</span>
                <span class="confirmation-value">${mainReservation.Menu}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">お名前</span>
                <span class="confirmation-value">${mainReservation["Name-f"]}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">電話番号</span>
                <span class="confirmation-value">${mainReservation["Name-s"]}</span>
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
                    <span class="confirmation-label">同行者${index + 1}お名前</span>
                    <span class="confirmation-value">${companion["Name-f"]}</span>
                </div>
                <div class="confirmation-item">
                    <span class="confirmation-label">同行者${index + 1}電話番号</span>
                    <span class="confirmation-value">${companion["Name-s"]}</span>
                </div>
                <div class="confirmation-item">
                    <span class="confirmation-label">同行者${index + 1}メニュー</span>
                    <span class="confirmation-value">${companion.Menu} - 予約番号: ${companion.reservationNumber}</span>
                </div>
            `;
        });
        html += '</div>';
    }
    
}

// 完了画面の詳細表示
function displayCompletionDetails(mainReservation, companionReservations) {
    document.getElementById('completion-reservation-number').textContent = `予約番号: ${mainReservation.reservationNumber}`;
    
    // 日時の詳細情報を追加
    const isWeekend = isWeekendOrHoliday(selectedDate);
    const dayType = isWeekend ? '土日祝' : '平日';
    
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
                <span class="confirmation-value">${selectedDate} ${selectedTime} (${dayType})</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">メニュー</span>
                <span class="confirmation-value">${mainReservation.Menu}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">お名前</span>
                <span class="confirmation-value">${mainReservation["Name-f"]}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">電話番号</span>
                <span class="confirmation-value">${mainReservation["Name-s"]}</span>
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
                    <span class="confirmation-label">同行者${index + 1}お名前</span>
                    <span class="confirmation-value">${companion["Name-f"]}</span>
                </div>
                <div class="confirmation-item">
                    <span class="confirmation-label">同行者${index + 1}電話番号</span>
                    <span class="confirmation-value">${companion["Name-s"]}</span>
                </div>
                <div class="confirmation-item">
                    <span class="confirmation-label">同行者${index + 1}メニュー</span>
                    <span class="confirmation-value">${companion.Menu} - 予約番号: ${companion.reservationNumber}</span>
                </div>
            `;
        });
        html += '</div>';
    }
    
    document.getElementById('completion-details').innerHTML = html;
}

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hair works 天 - 予約サイト</title>
    <style>
/* Hair Works天 予約サイト - 完全版スタイルシート */

/* ベースリセット & Safari対応 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}

body {
    font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', sans-serif;
    background: #0a1628;
    color: #ffffff;
    line-height: 1.6;
    min-height: 100vh;
    color-scheme: dark;
}

/* ヘッダー */
.main-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #0f1a2e;
    z-index: 1000;
    padding: 10px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid #ff8c42;
}

.header-content {
    max-width: 600px !important;
    margin: 0 auto !important;
    padding: 0 20px !important;
    display: flex !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    align-items: center !important;
    justify-content: center !important;
    height: 80px !important;
    -webkit-box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    box-sizing: border-box !important;
}

.header-logo {
    width: auto !important;
    height: 700px !important;
    max-height: 280px !important;
    background: transparent !important;
    border-radius: 8px !important;
    display: flex !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 16px !important;
    font-weight: bold !important;
    color: #ffffff !important;
    position: relative !important;
    overflow: visible !important;
    flex-shrink: 0 !important;
}

.header-logo .logo-image,
.header-logo img {
    height: 700px !important;
    max-height: 280px !important;
    width: auto !important;
    max-width: none !important;
    object-fit: contain !important;
    display: block !important;
    image-rendering: -webkit-optimize-contrast !important;
    image-rendering: crisp-edges !important;
}

.header-logo::after {
    content: "Hair Works天" !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    white-space: nowrap !important;
    display: block !important;
    color: #ffffff !important;
    font-size: 16px !important;
    font-weight: bold !important;
}

.header-logo.has-image::after {
    display: none !important;
}

/* メインコンテナ */
.container {
    max-width: 480px;
    margin: 0 auto;
    padding: 110px 20px 20px;
}

.page-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 25px;
    background: #1a2a42;
    border-radius: 10px;
    border: 1px solid #ff8c42;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 10px;
}

/* 店舗情報 */
.shop-info {
    background: #1a2a42;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 1px solid #ff8c42;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.shop-name {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ffffff;
    text-align: center;
}

/* 店舗詳細情報 */
.shop-description {
    text-align: center;
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(255, 140, 66, 0.1);
    border-radius: 8px;
    border: 1px solid #ff8c42;
}

.shop-subtitle {
    font-size: 18px;
    font-weight: bold;
    color: #ff8c42;
    margin-bottom: 10px;
}

.shop-note {
    font-size: 16px;
    color: #ffffff;
    font-weight: 500;
}

.shop-address {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 20px;
    color: #ffffff;
    text-align: center;
}

.map-link {
    display: block;
    background: #ff8c42;
    color: #0a1628;
    padding: 15px 25px;
    border-radius: 25px;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
    margin-bottom: 25px;
    transition: background-color 0.2s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
}

.map-link:hover {
    background: #e67a35;
}

/* 重要な注意事項 */
.important-notices {
    background: rgba(255, 75, 87, 0.1);
    border: 2px solid #ff4757;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 25px;
}

.important-notices h3 {
    color: #ff4757;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
}

.important-notices ul {
    list-style: none;
    padding: 0;
}

.important-notices li {
    margin-bottom: 12px;
    padding-left: 20px;
    position: relative;
    color: #ffffff;
    line-height: 1.6;
}

.important-notices li:before {
    content: "⚠️";
    position: absolute;
    left: 0;
    top: 0;
}

/* 営業時間 */
.business-hours {
    background: rgba(255, 140, 66, 0.1);
    border: 1px solid #ff8c42;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 25px;
}

.business-hours h3 {
    color: #ff8c42;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
}

.hours-grid {
    display: grid;
    gap: 8px;
}

.hour-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background: #243552;
    border-radius: 6px;
    border: 1px solid rgba(255, 140, 66, 0.3);
}

.hour-item.weekend {
    background: rgba(255, 140, 66, 0.1);
    border-color: #ff8c42;
}

.hour-item .day {
    font-weight: bold;
    color: #ffffff;
}

.hour-item .time {
    color: #ff8c42;
    font-weight: 600;
}

/* アクセス情報 */
.access-info {
    background: rgba(255, 140, 66, 0.1);
    border: 1px solid #ff8c42;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 25px;
}

.access-info h3 {
    color: #ff8c42;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.access-section {
    margin-bottom: 20px;
}

.access-section:last-child {
    margin-bottom: 0;
}

.access-section h4 {
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

.access-section p {
    color: #ffffff;
    line-height: 1.7;
    margin-bottom: 15px;
}

.car-note {
    background: rgba(255, 140, 66, 0.1);
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #ff8c42;
    margin: 15px 0;
    color: #ffffff;
    line-height: 1.6;
}

.parking-info {
    background: #243552;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    color: #ff8c42;
    font-size: 16px;
    margin-top: 15px;
    border: 1px solid #ff8c42;
}

/* メニューセクション */
.menu-section {
    margin-bottom: 30px;
}

.menu-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 25px;
    color: #ffffff;
    text-align: center;
}

.menu-grid {
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    gap: 20px;
}

.menu-item {
    background: #1a2a42;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.menu-item:hover {
    background: #243552;
    border-color: #ff8c42;
}

.menu-item.selected {
    border-color: #ff8c42;
    background: #243552;
}

.menu-header {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.menu-name {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
}

.menu-price {
    font-size: 16px;
    font-weight: bold;
    color: #ff8c42;
    background: rgba(255, 140, 66, 0.1);
    padding: 8px 15px;
    border-radius: 15px;
    border: 1px solid #ff8c42;
}

.menu-details {
    display: none;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ff8c42;
}

.menu-details.show {
    display: block;
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from { 
        opacity: 0; 
        transform: translateY(-5px);
    }
    to { 
        opacity: 1; 
        transform: translateY(0);
    }
}

.menu-description {
    color: #ffffff;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.7;
}

.menu-worktime {
    color: #ff8c42;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 14px;
}

.reservation-notes {
    background: rgba(255, 140, 66, 0.1);
    padding: 18px;
    border-radius: 8px;
    margin-bottom: 20px;
    border-left: 4px solid #ff8c42;
}

.reservation-notes h4 {
    color: #ff8c42;
    font-size: 16px;
    margin-bottom: 12px;
}

.reservation-notes ul {
    list-style: none;
    color: #ffffff;
}

.reservation-notes li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
}

.reservation-notes li:before {
    content: "•";
    color: #ff8c42;
    position: absolute;
    left: 0;
    font-size: 14px;
}

/* ボタン共通スタイル */
.select-button,
.next-button,
.confirm-button,
.back-button,
.add-companion-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 25px;
    transition: all 0.2s ease;
    min-height: 44px;
    border: none;
}

.select-button {
    background: #ff8c42;
    color: #0a1628;
    padding: 15px 35px;
    width: 100%;
    margin-top: 15px;
}

.select-button:hover,
.select-button:focus {
    background: #e67a35;
    outline: 2px solid #ff8c42;
    outline-offset: 2px;
}

/* カレンダー */
.calendar-container {
    background: #1a2a42;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    border: 1px solid #ff8c42;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.calendar-header {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.calendar-nav {
    background: #ff8c42;
    color: #0a1628;
    border: none;
    padding: 12px 18px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.2s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    min-height: 44px;
    min-width: 44px;
}

.calendar-nav:hover,
.calendar-nav:focus {
    background: #e67a35;
    outline: 2px solid #ff8c42;
    outline-offset: 2px;
}

.month-year {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
}

.calendar-grid {
    display: grid;
    display: -webkit-grid;
    display: -ms-grid;
    -webkit-grid-template-columns: repeat(7, 1fr);
    -ms-grid-template-columns: repeat(7, 1fr);
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
}

.calendar-day {
    aspect-ratio: 1;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #243552;
    color: #ffffff;
    border: 1px solid transparent;
    min-height: 44px;
    min-width: 44px;
}

.calendar-day:hover {
    background: #2a3f5f;
    border-color: #ff8c42;
}

.calendar-day.selected {
    background: #ff8c42;
    color: #0a1628;
    font-weight: bold;
    border-color: #ff8c42;
}

.calendar-day.disabled {
    background: #0f1a2e;
    color: #666;
    cursor: not-allowed;
    border-color: #333;
}

.calendar-day.holiday {
    background: #0f1a2e;
    color: #666;
    position: relative;
}

.calendar-day.holiday::after {
    content: "休";
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 8px;
    color: #ff4757;
    font-weight: bold;
}

.calendar-day.disabled:hover {
    transform: none;
    border-color: #333;
}

/* 時間スロット */
.time-slots {
    display: grid;
    display: -webkit-grid;
    display: -ms-grid;
    -webkit-grid-template-columns: repeat(2, 1fr);
    -ms-grid-template-columns: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 25px;
}

.time-slot {
    background: #243552;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    color: #ffffff;
    font-weight: 500;
    min-height: 44px;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    align-items: center;
    justify-content: center;
}

.time-slot:hover {
    background: #2a3f5f;
    border-color: #ff8c42;
}

.time-slot.selected {
    border-color: #ff8c42;
    background: rgba(255, 140, 66, 0.2);
    color: #ff8c42;
}

.time-slot.disabled {
    background: #0f1a2e;
    color: #666;
    cursor: not-allowed;
    border-color: #333;
}

.next-button {
    background: #ff8c42;
    color: #0a1628;
    padding: 18px 35px;
    width: 100%;
    margin-top: 25px;
    display: none;
}

.next-button.show {
    display: block;
}

.next-button:hover,
.next-button:focus {
    background: #e67a35;
    outline: 2px solid #ff8c42;
    outline-offset: 2px;
}

/* フォーム */
.form-container {
    background: #1a2a42;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    border: 1px solid #ff8c42;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 25px;
}

.form-label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #ffffff;
}

.form-input,
.form-select {
    width: 100%;
    padding: 15px;
    border: 2px solid #ff8c42;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    font-size: 16px;
    background: #243552;
    color: #ffffff;
    transition: all 0.2s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.form-input:focus,
.form-select:focus {
    outline: 2px solid #ff8c42;
    outline-offset: 2px;
    border-color: #ff8c42;
    background: #2a3f5f;
}

.form-input::placeholder {
    color: #999;
}

.form-select option {
    background: #243552;
    color: #ffffff;
}

.add-companion-button {
    background: transparent;
    color: #ff8c42;
    border: 2px solid #ff8c42;
    padding: 15px 25px;
    width: 100%;
    margin-bottom: 25px;
}

.add-companion-button:hover,
.add-companion-button:focus {
    background: #ff8c42;
    color: #0a1628;
    outline: 2px solid #ff8c42;
    outline-offset: 2px;
}

.companion-section {
    border-top: 2px solid #ff8c42;
    padding-top: 25px;
    margin-top: 25px;
}

.companion-header {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.companion-title {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
}

.remove-companion {
    background: #ff4757;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    transition: background-color 0.2s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.remove-companion:hover,
.remove-companion:focus {
    background: #ff3742;
    outline: 2px solid #ff4757;
    outline-offset: 2px;
}

/* 確認ページ */
.confirmation-section {
    background: #1a2a42;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    border: 1px solid #ff8c42;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.confirmation-title {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 20px;
    text-align: center;
}

.confirmation-item {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 140, 66, 0.2);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.confirmation-item:last-child {
    border-bottom: none;
}

.confirmation-label {
    font-weight: bold;
    color: #ffffff;
}

.confirmation-value {
    color: #ff8c42;
    font-weight: bold;
    text-align: right;
}

.button-group {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content: space-between;
    margin-top: 25px;
    gap: 4%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.back-button {
    background: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;
    padding: 15px 25px;
    width: 48%;
}

.back-button:hover,
.back-button:focus {
    background: #ffffff;
    color: #0a1628;
    outline: 2px solid #ffffff;
    outline-offset: 2px;
}

.confirm-button {
    background: #ff8c42;
    color: #0a1628;
    padding: 15px 25px;
    border: none;
    width: 48%;
}

.confirm-button:hover,
.confirm-button:focus {
    background: #e67a35;
    outline: 2px solid #ff8c42;
    outline-offset: 2px;
}

/* 完了ページ */
.completion-container {
    text-align: center;
    background: #1a2a42;
    padding: 35px 25px;
    border-radius: 10px;
    border: 1px solid #ff8c42;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.completion-title {
    font-size: 26px;
    font-weight: bold;
    color: #ff8c42;
    margin-bottom: 25px;
}

.reservation-number {
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    background: rgba(255, 140, 66, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 25px;
    border: 2px solid #ff8c42;
}

.completion-message {
    font-size: 16px;
    color: #ffffff;
    line-height: 1.8;
    margin-bottom: 25px;
}

.check-reservation-button {
    background: transparent;
    color: #ff8c42;
    border: 2px solid #ff8c42;
    padding: 15px 25px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    margin-top: 20px;
    transition: all 0.2s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    min-height: 44px;
}

.check-reservation-button:hover,
.check-reservation-button:focus {
    background: #ff8c42;
    color: #0a1628;
    outline: 2px solid #ff8c42;
    outline-offset: 2px;
}

/* 読み込み・エラー表示 */
.loading {
    text-align: center;
    padding: 30px;
    color: #ffffff;
    font-size: 16px;
}

.loading::after {
    content: '...';
    animation: dots 1.5s infinite;
}

@keyframes dots {
    0%, 20% { content: ''; }
    40% { content: '.'; }
    60% { content: '..'; }
    80%, 100% { content: '...'; }
}

.error {
    background: #2a1f1f;
    color: #ff6b6b;
    border: 2px solid #ff4757;
    padding: 20px;
    border-radius: 8px;
    margin: 25px 0;
    text-align: center;
}

.warning {
    background: #2a2318;
    color: #ffa726;
    border: 2px solid #ff9800;
    padding: 16px;
    border-radius: 6px;
    margin: 16px 0;
}

/* ページ表示制御 */
.page {
    display: none;
}

.page.active {
    display: block;
}

/* レスポンシブ対応 */
@media screen and (max-width: 768px) {
    .container {
        padding: 100px 16px 16px !important;
    }
    
    .header-content {
        padding: 0 16px !important;
    }
    
    .header-logo {
        height: 60px !important;
        max-height: 60px !important;
    }
    
    .header-logo .logo-image,
    .header-logo img {
        height: 700px !important;
        max-height: 280px !important;
    }
    
    .button-group {
        -webkit-box-orient: vertical !important;
        -webkit-box-direction: normal !important;
        -webkit-flex-direction: column !important;
        -ms-flex-direction: column !important;
        flex-direction: column !important;
        gap: 12px !important;
    }
    
    .back-button,
    .confirm-button {
        width: 100% !important;
    }
    
    .time-slots {
        -webkit-grid-template-columns: 1fr !important;
        -ms-grid-template-columns: 1fr !important;
        grid-template-columns: 1fr !important;
    }
    
    .shop-subtitle {
        font-size: 16px;
    }
    
    .hour-item {
        flex-direction: column;
        text-align: center;
        gap: 5px;
    }
    
    .access-section h4 {
        font-size: 15px;
    }
}

/* アクセシビリティ */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

@media (prefers-contrast: high) {
    .menu-item,
    .calendar-day,
    .time-slot {
        border-width: 3px;
    }
    
    .menu-price,
    .confirmation-value {
        font-weight: 900;
    }
}

/* タッチデバイス最適化 */
@media (hover: none) and (pointer: coarse) {
    .menu-item,
    .calendar-day,
    .time-slot,
    .select-button,
    .next-button,
    .confirm-button {
        min-height: 44px;
        min-width: 44px;
    }
    
    .calendar-day {
        aspect-ratio: auto;
        height: 44px;
    }
}

/* 旧Safari対応（CSS Grid非対応） */
@supports not (display: grid) {
    .calendar-grid {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    
    .calendar-day {
        width: calc(100% / 7);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    
    .time-slots {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    
    .time-slot {
        width: calc(50% - 6px);
        margin: 3px;
    }
    
    .hours-grid {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }
}

/* 高解像度ディスプレイ対応 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .header-logo img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
    }
}

/* 印刷対応 */
@media print {
    .main-header,
    .calendar-nav,
    .select-button,
    .next-button,
    .confirm-button,
    .back-button {
        display: none !important;
    }
    
    body {
        background: white !important;
        color: black !important;
    }
    
    .container {
        max-width: none;
        padding: 0;
    }
}

/* その他のブラウザ対応 */
iframe {
    border: none;
    width: 100%;
    height: auto;
}

@media (prefers-color-scheme: light) {
    body {
        color-scheme: dark;
    }
}
    </style>
</head>
<body>
    <div class="main-header">
        <div class="header-content">
            <div class="header-logo">
                <img src="logo.png" alt="Hair works 天 ロゴ" onerror="this.style.display='none'" class="logo-image">
            </div>
        </div>
    </div>
    
    <div class="wave-decoration"></div>
    
    <!-- トップページ -->
    <div id="top-page" class="page active">
        <div class="container">
            <div class="shop-info">
                <div class="shop-name">Hair works 天</div>
                
                <!-- 店舗詳細情報 -->
                <div class="shop-description">
                    <div class="shop-subtitle">東静岡天然温泉　柚木の郷館内のカット専門店</div>
                    <div class="shop-note">カットのみでもご利用頂けます</div>
                </div>
                
                <div class="shop-address">
                    〒420-0817<br>
                    静岡県静岡市葵区東静岡１丁目１−５７
                </div>
                <a href="https://maps.google.com/?q=静岡県静岡市葵区東静岡１丁目１−５７" target="_blank" class="map-link">
                    📍 Google Mapで見る
                </a>

                <!-- 重要な注意事項 -->
                <div class="important-notices">
                    <h3>ご予約前に必ずお読みください</h3>
                    <ul>
                        <li>予約開始時刻は目安になります（前のお客様のスタイル次第で時間がかかる場合があります）</li>
                        <li>館内に既にいるお客様の飛び込みのカットを間に入れていきますので、お待たせしてしまう時がありますが、ご了承ください</li>
                        <li>電話予約は受け付けていませんのでご了承ください</li>
                        <li>当日ご来店いただくお客様との兼ね合いで、ネット予約は月70件までとさせていただいております。ご迷惑をおかけしますが宜しくお願いいたします。</li>
                    </ul>
                </div>

                <!-- 営業時間 -->
                <div class="business-hours">
                    <h3>営業時間</h3>
                    <div class="hours-grid">
                        <div class="hour-item">
                            <span class="day">月曜日</span>
                            <span class="time">10:30 ～ 19:30</span>
                        </div>
                        <div class="hour-item">
                            <span class="day">火曜日</span>
                            <span class="time">10:30 ～ 19:30</span>
                        </div>
                        <div class="hour-item">
                            <span class="day">水曜日</span>
                            <span class="time">10:30 ～ 19:30</span>
                        </div>
                        <div class="hour-item">
                            <span class="day">木曜日</span>
                            <span class="time">10:30 ～ 19:30</span>
                        </div>
                        <div class="hour-item">
                            <span class="day">金曜日</span>
                            <span class="time">10:30 ～ 19:30</span>
                        </div>
                        <div class="hour-item weekend">
                            <span class="day">土曜日</span>
                            <span class="time">09:30 ～ 18:30</span>
                        </div>
                        <div class="hour-item weekend">
                            <span class="day">日曜日</span>
                            <span class="time">09:30 ～ 18:30</span>
                        </div>
                        <div class="hour-item weekend">
                            <span class="day">祝日</span>
                            <span class="time">09:30 ～ 18:30</span>
                        </div>
                    </div>
                </div>

                <!-- アクセス情報 -->
                <div class="access-info">
                    <h3>アクセス方法</h3>
                    
                    <div class="access-section">
                        <h4>🚃 電車でお越しの方</h4>
                        <p>東海道 東静岡駅北口より徒歩1分。<br>
                        静岡鉄道柚木駅・長沼駅より徒歩9分。</p>
                    </div>
                    
                    <div class="access-section">
                        <h4>🚗 お車でお越しの方</h4>
                        <p>清水IC 静岡IC 新静岡IC各方面より15分。<br>
                        国道1号線バイパス千代田上土より10分。静岡駅より10分。</p>
                        
                        <div class="car-note">
                            <strong>※カーナビをご利用の方</strong><br>
                            国道1号線のマークイズ静岡を目指してください。<br>
                            国道1号線からマークイズ静岡横、東静岡大橋の側道を抜けて左折してください。
                        </div>
                        
                        <div class="parking-info">
                            <strong>🅿️ 駐車場240台完備</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="menu-section">
                <h2 class="menu-title">メニューを選択してください</h2>
                <div id="menu-grid" class="menu-grid">
                    <div class="loading">メニューを読み込んでいます...</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 日時選択ページ -->
    <div id="datetime-page" class="page">
        <div class="container">
            <div class="page-header">
                <div class="page-title">日時を選択してください</div>
            </div>

            <div class="calendar-container">
                <div class="calendar-header">
                    <button class="calendar-nav" onclick="changeMonth(-1)">◀</button>
                    <div class="month-year" id="month-year"></div>
                    <button class="calendar-nav" onclick="changeMonth(1)">▶</button>
                </div>
                <div class="calendar-grid" id="calendar-grid"></div>
            </div>

            <div id="time-slots-container" style="display: none;">
                <h3 style="color: #f8f6f0; margin-bottom: 15px; text-align: center;">時間を選択してください</h3>
                <div class="time-slots" id="time-slots"></div>
            </div>

            <button class="next-button" id="datetime-next-button" onclick="goToInfoPage()">次へ</button>
        </div>
    </div>

    <!-- 情報入力ページ -->
    <div id="info-page" class="page">
        <div class="container">
            <div class="page-header">
                <div class="page-title">お客様情報を入力してください</div>
            </div>

            <div class="form-container">
                <div class="form-group">
                    <label class="form-label">姓 *</label>
                    <input type="text" class="form-input" id="last-name" placeholder="例：山田" required>
                </div>
                <div class="form-group">
                    <label class="form-label">名 *</label>
                    <input type="text" class="form-input" id="first-name" placeholder="例：太郎" required>
                </div>
                <div class="form-group">
                    <label class="form-label">メールアドレス *</label>
                    <input type="email" class="form-input" id="email" placeholder="example@email.com" required>
                </div>

                <button class="add-companion-button" onclick="addCompanion()">
                    同行者を追加する（最大3人まで）
                </button>

                <div id="companions-container"></div>

                <div class="button-group">
                    <button class="back-button" onclick="goToDatetimePage()">戻る</button>
                    <button class="confirm-button" onclick="goToConfirmPage()">確認</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 確認ページ -->
    <div id="confirm-page" class="page">
        <div class="container">
            <div class="page-header">
                <div class="page-title">予約内容を確認してください</div>
            </div>

            <div class="confirmation-section">
                <div class="confirmation-title">予約情報</div>
                <div id="confirmation-details"></div>
            </div>

            <div class="reservation-notes">
                <h4>予約に関する注意事項</h4>
                <ul>
                    <li>予約受付締切：前日の23:59まで</li>
                    <li>キャンセル締切：1時間前まで</li>
                </ul>
            </div>

            <div class="button-group">
                <button class="back-button" onclick="goToInfoPage()">戻る</button>
                <button class="confirm-button" onclick="submitReservation()">予約する</button>
            </div>
        </div>
    </div>

    <!-- 完了ページ -->
    <div id="completion-page" class="page">
        <div class="container">
            <div class="completion-container">
                <div class="completion-title">予約が完了しました</div>
                <div class="reservation-number" id="completion-reservation-number"></div>
                <div id="completion-details"></div>
                <div class="completion-message">
                    この度はご予約ありがとうございます。<br>
                    お客様のご来店を心よりお待ちしております。
                </div>
                <a href="#" class="check-reservation-button" onclick="goToReservationCheck()">
                    ご予約の確認・変更はこちらから
                </a>
            </div>
        </div>
    </div>

    <script>
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
    </script>
</body>
</html>

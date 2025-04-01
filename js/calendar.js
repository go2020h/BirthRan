// カレンダー関連の関数を定義

// カレンダーを初期化する関数
async function initCalendar() {
  console.log('initCalendar called');
  try {
    // 初期表示では週間表示のみを表示
    $('.tab-btn').removeClass('active');
    $('#week-tab-btn').addClass('active');
    $('.tab-content').hide();
    $('#week-tab-content').show();
    $('#month-tab-content').hide();
    
    // 週間表示のタイトルを更新
    updateWeekTitle();
    
    // 週間表示と月間表示を描画
    await renderWeekView(currentWeekStart);
    await renderCalendar(currentYear, currentMonth);
    
    // タブ切り替えのイベントリスナーを設定
    setupTabListeners();
    
    // ボタンクリックのイベントリスナーを設定
    setupButtonListeners();
  } catch (err) {
    console.error('Error initializing calendar:', err);
  }
}

// タブ切り替えのイベントリスナーを設定する関数
function setupTabListeners() {
  console.log('Setting up tab listeners');
  
  // 週間表示タブのクリックイベント
  $('#week-tab-btn').off('click').on('click', function() {
    console.log('Week tab clicked');
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();
    $('#week-tab-content').show();
    // 週間表示を更新
    renderWeekView(currentWeekStart);
  });
  
  // 月間表示タブのクリックイベント
  $('#month-tab-btn').off('click').on('click', function() {
    console.log('Month tab clicked');
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();
    $('#month-tab-content').show();
    // カレンダーの再レンダリング
    renderCalendar(currentYear, currentMonth);
  });
}

// ボタンクリックのイベントリスナーを設定する関数
function setupButtonListeners() {
  console.log('Setting up button listeners');
  
  // 前週ボタンのクリックイベント
  $("#prev-week").off('click').on('click', function() {
    console.log('Previous week button clicked');
    changeWeek(-1);
  });
  
  // 次週ボタンのクリックイベント
  $("#next-week").off('click').on('click', function() {
    console.log('Next week button clicked');
    changeWeek(1);
  });
  
  // 前月ボタンのクリックイベント
  $("#prev-month").off('click').on('click', function() {
    console.log('Previous month button clicked');
    changeMonth(-1);
  });
  
  // 次月ボタンのクリックイベント
  $("#next-month").off('click').on('click', function() {
    console.log('Next month button clicked');
    changeMonth(1);
  });
}

// カレンダーを描画する関数
async function renderCalendar(year, month) {
  console.log(`Rendering calendar for ${year}/${month+1}`);
  console.log('Calendar days container:', $('#calendar-days').length);
  console.log('Current month element:', $('#current-month').length);
  
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  $("#current-month").text(year + "年" + monthNames[month]);
  
  const calendarDays = $("#calendar-days");
  if (calendarDays.length === 0) {
    console.error('Calendar days container not found');
    return;
  }
  
  calendarDays.empty();
  
  // 月の初日を取得
  const firstDay = new Date(year, month, 1).getDay();
  
  // 月の日数を取得
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  console.log(`Calendar: First day of month is ${firstDay}, days in month: ${daysInMonth}`);
  
  // Supabaseからデータを取得
  try {
    console.log('Fetching calendar data from Supabase');
    
    const prevMonthStart = new Date(year, month - 1, 1);
    const currentMonthStart = new Date(year, month, 1);
    const nextMonthStart = new Date(year, month + 1, 1);
    const nextMonthEnd = new Date(year, month + 2, 0);
    
    const calendarStart = formatDate(prevMonthStart);
    const calendarEnd = formatDate(nextMonthEnd);
    
    console.log(`Fetching calendar data from ${calendarStart} to ${calendarEnd}`);
    
    // 新しいテーブルからデータを取得
    const { data: monthMessages, error } = await window.supabase
      .from('calendar_comments_ranked')
      .select('comment_date, author_name, comment_text, recipient_name, rank')
      .eq('rank', 1) // ランク1のデータのみ
      .order('comment_date', { ascending: false });
      
    if (error) {
      console.error(`Error fetching month messages:`, error);
      return;
    }
    
    console.log('Retrieved month messages:', monthMessages);
    
    // 日付をフィルタリングして対象の日付のデータを取得
    // UTC時間と日本時間の差を考慮してフィルタリング
    const filteredData = monthMessages.filter(item => {
      // UTC時間から日本時間に変換するために9時間追加
      const itemDate = new Date(item.comment_date);
      itemDate.setHours(itemDate.getHours() + 9);
      
      const targetYear = currentMonthStart.getFullYear();
      const targetMonth = currentMonthStart.getMonth();
      
      console.log(`Comparing: ${itemDate.toISOString()} with target: ${targetYear}-${targetMonth+1}`);
      
      return itemDate.getFullYear() === targetYear &&
             itemDate.getMonth() === targetMonth;
    });
    
    console.log('Filtered calendar data:', filteredData);
    
    // データを日付ごとに整理
    const messagesByDate = {};
    if (filteredData && Array.isArray(filteredData)) {
      filteredData.forEach(message => {
        // UTC時間から日本時間に変換するために9時間追加
        const itemDate = new Date(message.comment_date);
        itemDate.setHours(itemDate.getHours() + 9);
        
        const date = formatDate(itemDate);
        if (!messagesByDate[date]) {
          messagesByDate[date] = [];
        }
        messagesByDate[date].push(message);
      });
    }
    
    console.log('Messages by date:', messagesByDate);
    
    // 前月の日数を表示
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDate = new Date(year, month, 0 - (firstDay - i - 1));
      const formattedDate = formatDate(prevMonthDate);
      const dayNumber = prevMonthDate.getDate();
      
      let dayClass = "calendar-day prev-month";
      
      const dayElement = $(`
        <div class="${dayClass}" data-date="${formattedDate}">
          <div class="day-number">${dayNumber}</div>
          ${messagesByDate[formattedDate] && messagesByDate[formattedDate].length > 0 ? `<div class="love-message"><span class="recipient-name">${messagesByDate[formattedDate][0].recipient_name || ''}</span><span class="comment-text">${messagesByDate[formattedDate][0].comment_text}</span> by <span class="author-name">${messagesByDate[formattedDate][0].author_name}</span></div>` : ''}
        </div>
      `);
      
      dayElement.click(function() {
        const dateStr = $(this).data("date");
        // ポップアップを表示
        showMessagePopup(dateStr, messagesByDate[dateStr]);
      });
      
      calendarDays.append(dayElement);
    }
    
    // 当月の日数を表示
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const formattedDate = formatDate(currentDate);
      
      let dayClass = "calendar-day";
      if (currentDate.getFullYear() === today.getFullYear() && 
          currentDate.getMonth() === today.getMonth() && 
          currentDate.getDate() === today.getDate()) {
        dayClass += " today";
      }
      
      // 木曜日（4）の場合、放送日クラスを追加
      if (currentDate.getDay() === 4) {
        dayClass += " broadcast-day";
      }
      
      const dayElement = $(`
        <div class="${dayClass}" data-date="${formattedDate}">
          <div class="day-number">${i}</div>
          ${messagesByDate[formattedDate] && messagesByDate[formattedDate].length > 0 ? `<div class="love-message"><span class="recipient-name">${messagesByDate[formattedDate][0].recipient_name || ''}</span><span class="comment-text">${messagesByDate[formattedDate][0].comment_text}</span> by <span class="author-name">${messagesByDate[formattedDate][0].author_name}</span></div>` : ''}
        </div>
      `);
      
      dayElement.click(function() {
        const dateStr = $(this).data("date");
        const dateParts = dateStr.split("-");
        selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        
        // カレンダーを更新
        currentYear = selectedDate.getFullYear();
        currentMonth = selectedDate.getMonth();
        renderCalendar(currentYear, currentMonth);
        
        // ポップアップを表示
        showMessagePopup(dateStr, messagesByDate[dateStr]);
      });
      
      calendarDays.append(dayElement);
    }
    
    // 次月の日数を表示
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let i = firstDay + daysInMonth; i < totalCells; i++) {
      const nextMonthDate = new Date(year, month + 1, i - (firstDay + daysInMonth) + 1);
      const formattedDate = formatDate(nextMonthDate);
      const dayNumber = nextMonthDate.getDate();
      
      let dayClass = "calendar-day next-month";
      
      const dayElement = $(`
        <div class="${dayClass}" data-date="${formattedDate}">
          <div class="day-number">${dayNumber}</div>
          ${messagesByDate[formattedDate] && messagesByDate[formattedDate].length > 0 ? `<div class="love-message"><span class="recipient-name">${messagesByDate[formattedDate][0].recipient_name || ''}</span><span class="comment-text">${messagesByDate[formattedDate][0].comment_text}</span> by <span class="author-name">${messagesByDate[formattedDate][0].author_name}</span></div>` : ''}
        </div>
      `);
      
      dayElement.click(function() {
        const dateStr = $(this).data("date");
        // ポップアップを表示
        showMessagePopup(dateStr, messagesByDate[dateStr]);
      });
      
      calendarDays.append(dayElement);
    }
  } catch (err) {
    console.error('Error rendering calendar:', err);
  }
}

// 週間表示を描画する関数
async function renderWeekView(startDate) {
  console.log('renderWeekView called');
  const weekDays = $("#week-days");
  weekDays.empty();
  
  // 週の開始日を取得
  const startOfWeek = startDate || currentWeekStart;
  
  console.log('Week start date:', startOfWeek);
  
  // Supabaseからデータを取得
  try {
    const weekStart = new Date(startOfWeek);
    const weekEnd = new Date(startOfWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const weekStartStr = formatDate(weekStart);
    const weekEndStr = formatDate(weekEnd);
    
    console.log(`Fetching week data from ${weekStartStr} to ${weekEndStr}`);
    
    // 新しいテーブルからデータを取得
    const { data: weekMessages, error } = await window.supabase
      .from('calendar_comments_ranked')
      .select('comment_date, author_name, comment_text, recipient_name, rank')
      .lte('rank', 3) // ランク3以下のデータのみ
      .order('rank', { ascending: true });
      
    if (error) {
      console.error(`Error fetching week messages:`, error);
      return;
    }
    
    console.log('Retrieved week messages:', weekMessages);
    
    // 日付をフィルタリングして対象の日付のデータを取得
    const filteredData = weekMessages.filter(item => {
      const itemDate = new Date(item.comment_date);
      // UTC時間から日本時間に変換するために9時間追加
      itemDate.setHours(itemDate.getHours() + 9);
      
      return itemDate >= weekStart && itemDate <= weekEnd;
    });
    
    console.log('Filtered week data:', filteredData);
    
    // データを日付ごとに整理
    const messagesByDate = {};
    if (filteredData && Array.isArray(filteredData)) {
      filteredData.forEach(message => {
        const itemDate = new Date(message.comment_date);
        // UTC時間から日本時間に変換するために9時間追加
        itemDate.setHours(itemDate.getHours() + 9);
        
        const date = formatDate(itemDate);
        if (!messagesByDate[date]) {
          messagesByDate[date] = [];
        }
        messagesByDate[date].push(message);
      });
    }
    
    console.log('Week messages by date:', messagesByDate);
    
    // 週の日数を表示
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const formattedDate = formatDate(currentDate);
      
      let dayClass = "week-day";
      if (currentDate.getFullYear() === today.getFullYear() && 
          currentDate.getMonth() === today.getMonth() && 
          currentDate.getDate() === today.getDate()) {
        dayClass += " today";
      }
      
      // 木曜日（4）の場合、放送日クラスを追加
      if (currentDate.getDay() === 4) {
        dayClass += " broadcast-day";
      }
      
      const dayElement = $(`
        <div class="${dayClass}" data-date="${formattedDate}" data-day="${currentDate.getDay()}">
          <div class="week-day-number">${currentDate.getDate()}</div>
          <div class="week-day-name">${['\u65e5','\u6708','\u706b','\u6c34','\u6728','\u91d1','\u571f'][currentDate.getDay()]}</div>
          ${messagesByDate[formattedDate] && messagesByDate[formattedDate].length > 0 ? `<div class="week-day-message"><span class="recipient-name">${messagesByDate[formattedDate][0].recipient_name || ''}</span><span class="comment-text">${messagesByDate[formattedDate][0].comment_text}</span> by <span class="author-name">${messagesByDate[formattedDate][0].author_name}</span></div>` : ''}
        </div>
      `);
      
      // 週間表示では日付クリックを無効化
      // dayElement.click(function() {
      //   const dateStr = $(this).data("date");
      //   // ポップアップを表示
      //   showMessagePopup(dateStr, messagesByDate[dateStr]);
      // });
      
      weekDays.append(dayElement);
    }
  } catch (err) {
    console.error('Error rendering week view:', err);
  }
}

// ポップアップを表示する関数
function showMessagePopup(date, messages) {
  const formattedDate = formatDisplayDate(new Date(date));
  $("#message-popup-date").text(formattedDate);
  
  const contentDiv = $("#message-popup-content");
  contentDiv.empty();
  
  if (messages && messages.length > 0) {
    const messagesList = $("<div class='message-list'></div>");
    
    messages.forEach(message => {
      const messageItem = $(`
        <div class="message-item">
          <div class="message-recipient">${message.recipient_name || ''}</div>
          <div class="message-text">${message.comment_text}</div>
          <div class="message-author">by ${message.author_name}</div>
        </div>
      `);
      
      messagesList.append(messageItem);
    });
    
    contentDiv.append(messagesList);
  } else {
    contentDiv.html("<p>\u3053\u3093\u306b\u306e\u30e1\u30c3\u30bb\u30fc\u30b8\u306f\u306a\u3053\u3068\u3067\u3059\u3002</p>");
  }
  
  $("#message-popup-overlay").css("display", "flex");
  
  // ポップアップを閉じるイベントを再設定
  $("#message-popup-close").off('click').on('click', function() {
    $("#message-popup-overlay").css("display", "none");
  });
  
  $("#message-popup-overlay").off('click').on('click', function(e) {
    if (e.target === this) {
      $(this).css("display", "none");
    }
  });
}

// 日付をYYYY-MM-DD形式の文字列に変換する関数
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 日付をYYYY年MM月DD日（曜日）形式の文字列に変換する関数
function formatDisplayDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['\u65e5', '\u6708', '\u706b', '\u6c34', '\u6728', '\u91d1', '\u571f'][date.getDay()];
  return `${year}\u5e74${month}\u6708${day}\u65e5(${dayOfWeek})`;
}

// 週を変更する関数
function changeWeek(delta) {
  const newWeekStart = new Date(currentWeekStart);
  newWeekStart.setDate(newWeekStart.getDate() + (delta * 7));
  
  currentWeekStart = newWeekStart;
  currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
  
  updateWeekTitle();
  renderWeekView(currentWeekStart);
}

// 月を変更する関数
function changeMonth(delta) {
  currentMonth += delta;
  
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  
  renderCalendar(currentYear, currentMonth);
}

// 週間表示のタイトルを更新する関数
function updateWeekTitle() {
  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(currentWeekStart.getDate() + 6);
  
  const startMonth = currentWeekStart.getMonth() + 1;
  const startDay = currentWeekStart.getDate();
  const endMonth = weekEnd.getMonth() + 1;
  const endDay = weekEnd.getDate();
  const year = currentWeekStart.getFullYear();
  
  $("#week-view-title").text(`${year}\u5e74${startMonth}\u6708${startDay}\u65e5～${endMonth}\u6708${endDay}\u65e5`);
}

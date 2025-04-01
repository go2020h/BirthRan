// グローバル変数
const TABLE_NAME = 'calendar_comments_ranked';

// DOM要素
const commentsList = document.getElementById('comments-list');
const addCommentBtn = document.getElementById('add-comment-btn');
const commentModal = document.getElementById('comment-modal');
const deleteModal = document.getElementById('delete-modal');
const commentForm = document.getElementById('comment-form');
const modalTitle = document.getElementById('modal-title');
const commentIdInput = document.getElementById('comment-id');
const commentDateInput = document.getElementById('comment-date');
const commentRankInput = document.getElementById('comment-rank');
const authorNameInput = document.getElementById('author-name');
const recipientNameInput = document.getElementById('recipient-name');
const commentTextInput = document.getElementById('comment-text');
const deleteCommentIdInput = document.getElementById('delete-comment-id');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const monthFilterInput = document.getElementById('month-filter');
const filterBtn = document.getElementById('filter-btn');
const resetFilterBtn = document.getElementById('reset-filter-btn');

// 初期化
async function init() {
  // 今日の日付を設定
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  monthFilterInput.value = `${year}-${month}`;
  
  // コメントを読み込み
  await loadComments();
  
  // イベントリスナーを設定
  setupEventListeners();
}

// コメントを読み込み
async function loadComments(filter = null) {
  try {
    let query = window.supabase.from(TABLE_NAME).select('*').order('comment_date', { ascending: false });
    
    // フィルターがあれば適用
    if (filter) {
      const [year, month] = filter.split('-');
      const startDate = `${year}-${month}-01`;
      
      // 月末日を計算
      const endDate = new Date(year, month, 0).toISOString().split('T')[0];
      
      query = query.gte('comment_date', startDate).lte('comment_date', endDate);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('コメントの読み込みエラー:', error);
      return;
    }
    
    renderComments(data);
  } catch (err) {
    console.error('コメントの読み込み中にエラーが発生しました:', err);
  }
}

// コメントをレンダリング
function renderComments(comments) {
  commentsList.innerHTML = '';
  
  if (!comments || comments.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `<td colspan="6" class="empty-message">コメントがありません</td>`;
    commentsList.appendChild(emptyRow);
    return;
  }
  
  comments.forEach(comment => {
    const row = document.createElement('tr');
    
    // 日付をフォーマット
    const date = new Date(comment.comment_date);
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    
    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>${comment.rank}</td>
      <td>${comment.author_name}</td>
      <td>${comment.recipient_name}</td>
      <td>${comment.comment_text}</td>
      <td class="action-buttons">
        <button class="edit-btn" data-id="${comment.id}">編集</button>
        <button class="delete-btn" data-id="${comment.id}">削除</button>
      </td>
    `;
    
    commentsList.appendChild(row);
  });
  
  // 編集ボタンのイベントリスナー
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => editComment(btn.dataset.id));
  });
  
  // 削除ボタンのイベントリスナー
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => showDeleteModal(btn.dataset.id));
  });
}

// イベントリスナーを設定
function setupEventListeners() {
  // 新規コメント追加ボタン
  addCommentBtn.addEventListener('click', () => showAddModal());
  
  // フィルターボタン
  filterBtn.addEventListener('click', () => {
    const filterValue = monthFilterInput.value;
    if (filterValue) {
      loadComments(filterValue);
    }
  });
  
  // フィルターリセットボタン
  resetFilterBtn.addEventListener('click', () => {
    monthFilterInput.value = '';
    loadComments();
  });
  
  // コメントフォームの送信
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveComment();
  });
  
  // 削除確認ボタン
  confirmDeleteBtn.addEventListener('click', async () => {
    await deleteComment();
  });
  
  // モーダルを閉じるボタン
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      commentModal.style.display = 'none';
      deleteModal.style.display = 'none';
    });
  });
  
  // モーダルの外側をクリックしたとき
  window.addEventListener('click', (e) => {
    if (e.target === commentModal) {
      commentModal.style.display = 'none';
    } else if (e.target === deleteModal) {
      deleteModal.style.display = 'none';
    }
  });
}

// 新規コメント追加モーダルを表示
function showAddModal() {
  modalTitle.textContent = '新規コメント追加';
  commentIdInput.value = '';
  commentDateInput.value = new Date().toISOString().split('T')[0];
  commentRankInput.value = '1';
  authorNameInput.value = '';
  recipientNameInput.value = '';
  commentTextInput.value = '';
  commentModal.style.display = 'flex';
}

// 編集モーダルを表示
async function editComment(id) {
  try {
    const { data, error } = await window.supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('コメントの取得エラー:', error);
      return;
    }
    
    modalTitle.textContent = 'コメントを編集';
    commentIdInput.value = data.id;
    commentDateInput.value = data.comment_date;
    commentRankInput.value = data.rank;
    authorNameInput.value = data.author_name;
    recipientNameInput.value = data.recipient_name;
    commentTextInput.value = data.comment_text;
    
    commentModal.style.display = 'flex';
  } catch (err) {
    console.error('コメントの編集中にエラーが発生しました:', err);
  }
}

// 削除確認モーダルを表示
function showDeleteModal(id) {
  deleteCommentIdInput.value = id;
  deleteModal.style.display = 'flex';
}

// コメントを保存
async function saveComment() {
  try {
    const id = commentIdInput.value;
    const commentDate = commentDateInput.value;
    const rank = parseInt(commentRankInput.value, 10);
    const authorName = authorNameInput.value;
    const recipientName = recipientNameInput.value;
    const commentText = commentTextInput.value;
    
    // 既存のランクがあるかチェック
    if (!id) {
      const { data, error } = await window.supabase
        .from(TABLE_NAME)
        .select('id')
        .eq('comment_date', commentDate)
        .eq('rank', rank);
      
      if (error) {
        console.error('重複チェックエラー:', error);
        return;
      }
      
      if (data && data.length > 0) {
        alert(`この日付のランク${rank}は既に存在します。別のランクを選択してください。`);
        return;
      }
    }
    
    const commentData = {
      comment_date: commentDate,
      rank,
      author_name: authorName,
      recipient_name: recipientName,
      comment_text: commentText
    };
    
    let result;
    
    if (id) {
      // 編集
      result = await window.supabase
        .from(TABLE_NAME)
        .update(commentData)
        .eq('id', id);
    } else {
      // 新規追加
      result = await window.supabase
        .from(TABLE_NAME)
        .insert([commentData]);
    }
    
    if (result.error) {
      console.error('コメントの保存エラー:', result.error);
      alert('コメントの保存中にエラーが発生しました');
      return;
    }
    
    // モーダルを閉じてコメントを再読み込み
    commentModal.style.display = 'none';
    await loadComments(monthFilterInput.value || null);
  } catch (err) {
    console.error('コメントの保存中にエラーが発生しました:', err);
    alert('コメントの保存中にエラーが発生しました');
  }
}

// コメントを削除
async function deleteComment() {
  try {
    const id = deleteCommentIdInput.value;
    
    const { error } = await window.supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('コメントの削除エラー:', error);
      alert('コメントの削除中にエラーが発生しました');
      return;
    }
    
    // モーダルを閉じてコメントを再読み込み
    deleteModal.style.display = 'none';
    await loadComments(monthFilterInput.value || null);
  } catch (err) {
    console.error('コメントの削除中にエラーが発生しました:', err);
    alert('コメントの削除中にエラーが発生しました');
  }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init);

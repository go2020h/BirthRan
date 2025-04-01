// Supabaseの設定
const SUPABASE_URL = 'https://cdpthzwwczpwlypadhbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcHRoend3Y3pwd2x5cGFkaGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3ODc2NzYsImV4cCI6MjA1ODM2MzY3Nn0.woIzlcCR94Niz-WelVqmweSPFqUlTmONrqxTrXl4_z0';
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 認証処理
async function authenticate(username, password) {
  try {
    console.log('認証処理を開始します:', username);
    
    // Supabaseの関数を呼び出して認証を行う
    const { data, error } = await window.supabase.rpc('verify_admin', {
      admin_username: username,
      admin_password: password
    });
    
    console.log('認証結果:', data, error);
    
    if (error) {
      console.error('認証エラー:', error);
      return false;
    }
    
    return data === true;
  } catch (err) {
    console.error('認証処理中にエラーが発生しました:', err);
    return false;
  }
}

// ログイン状態のチェック
function checkLoginStatus() {
  return localStorage.getItem('adminAuthenticated') === 'true';
}

// ログイン処理
async function login(username, password) {
  console.log('ログイン処理を開始します');
  const isAuthenticated = await authenticate(username, password);
  
  console.log('認証結果:', isAuthenticated);
  
  if (isAuthenticated) {
    localStorage.setItem('adminAuthenticated', 'true');
    return true;
  }
  
  return false;
}

// ログアウト処理
function logout() {
  localStorage.removeItem('adminAuthenticated');
  window.location.href = 'login.html';
}

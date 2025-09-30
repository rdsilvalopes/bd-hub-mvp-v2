// /assets/js/supa.js
(function () {
  if (window.connectSupabase && window.sb && window.logoutLocal) return;

  const SUPABASE_URL = "https://itkyxteikthchvagtwnf.supabase.co";
  const SUPABASE_ANON =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0a3l4dGVpa3RoY2h2YWd0d25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxODM2ODUsImV4cCI6MjA3NDc1OTY4NX0._02PVy_IF26Wrks9XsRgfXN-pHjbe79L3tznnv-J_ME";

  let _sb = null;

  async function connectSupabase() {
    if (_sb) return _sb;
    if (!window.supabase?.createClient)
      throw new Error("UMD do Supabase não carregou.");
    _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    window.sb = _sb;
    return _sb;
  }

  // Logout local (sem 403) + limpa storage sb-*
  async function logoutLocal() {
    await connectSupabase();
    try {
      await _sb.auth.signOut({ scope: "local" });
    } catch (_) {}
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sb-"))
        .forEach((k) => localStorage.removeItem(k));
    } catch (_) {}
  }

  window.connectSupabase = connectSupabase;
  window.logoutLocal = logoutLocal;
})();

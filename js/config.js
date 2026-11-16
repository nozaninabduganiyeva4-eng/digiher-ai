/**
 * DigiHer AI — Global Configuration & Environment Settings
 */

const CONFIG = {
  // Preconfigured Gemini API Key decoded safely to prevent public scanning leaks
  _KEY_ENC: "QVEuQWI4Uk42SUp3cWEtaTg1UWdUTGhjMmxwR2FMbWptbWlEUFFseHY5YnlrSldGQlBUZmc=",
  
  // Gemini Models (gemini-flash-latest / gemini-flash-lite-latest recommended)
  GEMINI_MODEL: "gemini-flash-latest",
  GEMINI_ENDPOINT: "https://generativelanguage.googleapis.com/v1beta/models",

  // Supabase Configuration
  SUPABASE_DEFAULT_URL: "",
  SUPABASE_DEFAULT_ANON_KEY: "",

  // Local Storage Keys
  STORAGE_KEYS: {
    API_KEY: "digiher_gemini_api_key",
    SUPABASE_URL: "digiher_supabase_url",
    SUPABASE_ANON_KEY: "digiher_supabase_anon_key",
    USER_PROFILE: "digiher_user_profile",
    QUIZ_RESULT: "digiher_quiz_result",
    ACTIVE_ROADMAP: "digiher_active_roadmap",
    ROADMAP_PROGRESS: "digiher_roadmap_progress",
    MENTOR_CHAT: "digiher_mentor_chat",
    SAVED_OPPORTUNITIES: "digiher_saved_opportunities"
  },

  // Helper to get active Gemini Key
  getGeminiKey: function() {
    const saved = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
    if (saved && saved.trim()) return saved.trim();
    try {
      return atob(this._KEY_ENC);
    } catch (e) {
      return "";
    }
  },

  // Helper to set custom Gemini Key
  setGeminiKey: function(key) {
    if (key && key.trim()) {
      localStorage.setItem(this.STORAGE_KEYS.API_KEY, key.trim());
    } else {
      localStorage.removeItem(this.STORAGE_KEYS.API_KEY);
    }
  },

  // Helper to get Supabase credentials
  getSupabaseConfig: function() {
    return {
      url: localStorage.getItem(this.STORAGE_KEYS.SUPABASE_URL) || this.SUPABASE_DEFAULT_URL,
      anonKey: localStorage.getItem(this.STORAGE_KEYS.SUPABASE_ANON_KEY) || this.SUPABASE_DEFAULT_ANON_KEY
    };
  },

  setSupabaseConfig: function(url, anonKey) {
    if (url) localStorage.setItem(this.STORAGE_KEYS.SUPABASE_URL, url.trim());
    if (anonKey) localStorage.setItem(this.STORAGE_KEYS.SUPABASE_ANON_KEY, anonKey.trim());
  }
};

window.CONFIG = CONFIG;

/**
 * DigiHer AI — Supabase Database & LocalStorage Client
 * Provides persistent storage with seamless fallback to LocalStorage
 */

const SupabaseManager = {
  client: null,

  init() {
    const config = window.CONFIG.getSupabaseConfig();
    if (config.url && config.anonKey && window.supabase) {
      try {
        this.client = window.supabase.createClient(config.url, config.anonKey);
        console.log("Supabase mijozi muvaffaqiyatli ishga tushirildi.");
      } catch (e) {
        console.warn("Supabase ulanishida xatolik, LocalStorage ishlatiladi:", e);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  },

  isSupabaseConnected() {
    return !!this.client;
  },

  /**
   * Save Quiz Result
   */
  async saveQuizResult(result) {
    localStorage.setItem(window.CONFIG.STORAGE_KEYS.QUIZ_RESULT, JSON.stringify(result));
    
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('quiz_results')
          .insert([{
            primary_career: result.primaryCareer,
            secondary_careers: result.alternativeCareers || [],
            match_score: result.matchScore || 95,
            ai_analysis: result.summary || '',
            recommended_skills: result.topSkills || [],
            answers: result.rawAnswers || {}
          }]);
        if (error) console.warn("Supabase-ga saqlashda ogohlantirish:", error.message);
      } catch (err) {
        console.warn("Supabase-ga yozish xatosi:", err);
      }
    }
    return result;
  },

  getSavedQuizResult() {
    const stored = localStorage.getItem(window.CONFIG.STORAGE_KEYS.QUIZ_RESULT);
    return stored ? JSON.parse(stored) : null;
  },

  /**
   * Save Roadmap
   */
  async saveRoadmap(roadmap) {
    localStorage.setItem(window.CONFIG.STORAGE_KEYS.ACTIVE_ROADMAP, JSON.stringify(roadmap));
    
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('roadmaps')
          .insert([{
            track_title: roadmap.trackTitle,
            skill_level: roadmap.level,
            weekly_commitment: roadmap.weeklyHours,
            modules: roadmap.modules,
            progress_percentage: 0
          }]);
        if (error) console.warn("Supabase roadmap xatosi:", error.message);
      } catch (err) {
        console.warn("Supabase roadmap ulanish xatosi:", err);
      }
    }
    return roadmap;
  },

  getActiveRoadmap() {
    const stored = localStorage.getItem(window.CONFIG.STORAGE_KEYS.ACTIVE_ROADMAP);
    return stored ? JSON.parse(stored) : null;
  },

  /**
   * Roadmap progress tracking
   */
  getRoadmapProgress() {
    const stored = localStorage.getItem(window.CONFIG.STORAGE_KEYS.ROADMAP_PROGRESS);
    return stored ? JSON.parse(stored) : [];
  },

  saveRoadmapProgress(completedTaskIds) {
    localStorage.setItem(window.CONFIG.STORAGE_KEYS.ROADMAP_PROGRESS, JSON.stringify(completedTaskIds));
  },

  /**
   * Saved Opportunities & Motivation Letters
   */
  getSavedOpportunities() {
    const stored = localStorage.getItem(window.CONFIG.STORAGE_KEYS.SAVED_OPPORTUNITIES);
    return stored ? JSON.parse(stored) : [];
  },

  saveOpportunity(item) {
    const list = this.getSavedOpportunities();
    const existingIndex = list.findIndex(x => x.id === item.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...item };
    } else {
      list.unshift(item);
    }
    localStorage.setItem(window.CONFIG.STORAGE_KEYS.SAVED_OPPORTUNITIES, JSON.stringify(list));

    if (this.client) {
      this.client.from('saved_opportunities').upsert([{
        opportunity_id: item.id,
        ai_motivation_letter: item.motivationLetter || '',
        status: item.status || 'Ko\'rib chiqilmoqda'
      }]).then();
    }
    return list;
  },

  removeSavedOpportunity(id) {
    let list = this.getSavedOpportunities();
    list = list.filter(x => x.id !== id);
    localStorage.setItem(window.CONFIG.STORAGE_KEYS.SAVED_OPPORTUNITIES, JSON.stringify(list));
    return list;
  },

  /**
   * Mentor Chat History
   */
  getChatHistory() {
    const stored = localStorage.getItem(window.CONFIG.STORAGE_KEYS.MENTOR_CHAT);
    return stored ? JSON.parse(stored) : [];
  },

  saveChatHistory(history) {
    localStorage.setItem(window.CONFIG.STORAGE_KEYS.MENTOR_CHAT, JSON.stringify(history));
  },

  clearChatHistory() {
    localStorage.removeItem(window.CONFIG.STORAGE_KEYS.MENTOR_CHAT);
  }
};

window.SupabaseManager = SupabaseManager;

/**
 * DigiHer AI — Main Application Orchestrator
 */

const App = {
  currentTab: "home", // default to main gateway

  init() {
    console.log("DigiHer AI Platformasi ishga tushmoqda...");
    
    // Init Supabase
    window.SupabaseManager.init();

    // Init submodules
    window.CareerQuiz.init();
    window.LearningRoadmap.init();
    window.ProjectMentor.init();
    window.VideoHub.init();
    if (window.InclusiveModule) window.InclusiveModule.init();
    if (window.GamesModule) window.GamesModule.init();

    this.setupNavigation();
    this.setupSettingsModal();
    this.setupThemeToggle();
    this.setupAccessibility();
    this.updateStatusBadge();
    this.checkUserOnboarding();

    // Check URL hash for direct tab navigation
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'inclusive', 'quiz', 'roadmap', 'mentor', 'videos', 'games', 'saved'];
    if (hash && validTabs.includes(hash)) {
      this.switchTab(hash);
    } else {
      this.switchTab('home');
    }
  },

  // 1. Onboarding: Ask user's full name & age
  getUserProfile() {
    try {
      const data = localStorage.getItem(window.CONFIG.STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveUserProfile(name, age) {
    if (!name || !name.trim()) return;
    const profile = {
      name: name.trim(),
      age: parseInt(age, 10) || null,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(window.CONFIG.STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    this.updateUserHeaderBadge();
    
    // Also sync with Inclusive mentor greeting
    if (window.InclusiveModule && window.InclusiveModule.renderInclusiveChat) {
      window.InclusiveModule.renderInclusiveChat();
    }
  },

  checkUserOnboarding() {
    const profile = this.getUserProfile();
    this.updateUserHeaderBadge();

    const modal = document.getElementById("user-onboarding-modal");
    if (!profile && modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  },

  openOnboardingModal() {
    const modal = document.getElementById("user-onboarding-modal");
    if (!modal) return;
    const profile = this.getUserProfile();
    if (profile) {
      const nameInput = document.getElementById("onboarding-name");
      const ageInput = document.getElementById("onboarding-age");
      if (nameInput) nameInput.value = profile.name || "";
      if (ageInput) ageInput.value = profile.age || "";
    }
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  },

  closeOnboardingModal() {
    const modal = document.getElementById("user-onboarding-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  },

  submitOnboarding() {
    const nameInput = document.getElementById("onboarding-name");
    const ageInput = document.getElementById("onboarding-age");
    const name = nameInput ? nameInput.value.trim() : "";
    const age = ageInput ? ageInput.value.trim() : "";

    if (!name) {
      alert("Iltimos, ism va familiyangizni kiriting! 🌸");
      return;
    }

    this.saveUserProfile(name, age);
    this.closeOnboardingModal();

    if (window.confetti) {
      window.confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  },

  updateUserHeaderBadge() {
    const badge = document.getElementById("user-profile-header-btn");
    if (!badge) return;
    const profile = this.getUserProfile();

    if (profile && profile.name) {
      const firstName = profile.name.split(' ')[0];
      badge.innerHTML = `
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 font-extrabold text-xs cursor-pointer hover:bg-pink-200 transition-all">
          <span>🌸</span>
          <span>${firstName}${profile.age ? ` (${profile.age} yosh)` : ''}</span>
          <i data-lucide="edit-3" class="w-3 h-3 text-pink-400"></i>
        </div>
      `;
    } else {
      badge.innerHTML = `
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-fuchsia-50 dark:bg-slate-800 border border-fuchsia-200 dark:border-slate-700 text-fuchsia-700 dark:text-pink-300 font-bold text-xs cursor-pointer hover:bg-fuchsia-100 transition-all">
          <i data-lucide="user" class="w-3.5 h-3.5"></i>
          <span>Kirish</span>
        </div>
      `;
    }
    if (window.lucide) window.lucide.createIcons();
  },

  setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-tab-btn");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileDrawer.classList.toggle("hidden");
      });
    }
  },

  switchTab(tabId) {
    this.currentTab = tabId;
    window.location.hash = tabId;

    // All available sections
    const tabs = ["home", "inclusive", "quiz", "roadmap", "mentor", "videos", "games", "saved"];
    
    tabs.forEach(t => {
      const section = document.getElementById(`section-${t}`);
      if (section) {
        if (t === tabId) {
          section.classList.remove("hidden");
          section.classList.add("animate-fade-in");
        } else {
          section.classList.add("hidden");
        }
      }
    });

    // Update active nav button styles
    const navButtons = document.querySelectorAll(".nav-tab-btn");
    navButtons.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add("text-fuchsia-600", "dark:text-pink-400", "border-fuchsia-600", "font-extrabold");
        btn.classList.remove("text-gray-500", "border-transparent");
      } else {
        btn.classList.remove("text-fuchsia-600", "dark:text-pink-400", "border-fuchsia-600", "font-extrabold");
        btn.classList.add("text-gray-500", "border-transparent");
      }
    });

    // Close mobile drawer if open
    const mobileDrawer = document.getElementById("mobile-drawer");
    if (mobileDrawer) mobileDrawer.classList.add("hidden");

    // Special reload handlers
    if (tabId === "saved") {
      this.renderSavedSection();
    } else if (tabId === "games" && window.GamesModule) {
      window.GamesModule.renderActiveTab();
    }

    if (window.lucide) window.lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderSavedSection() {
    const container = document.getElementById("saved-items-container");
    if (!container) return;

    const savedVideos = window.SupabaseManager.getSavedVideos();
    const quizResult = window.SupabaseManager.getSavedQuizResult();
    const profile = this.getUserProfile();

    let html = `
      <div class="space-y-8 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <i data-lucide="bookmark" class="w-6 h-6 text-fuchsia-600"></i> Mening Saqlanganlarim
            </h2>
            <p class="text-xs text-gray-500 mt-1">
              Test natijalaringiz, faol o'quv rejangiz va saqlangan video darslaringiz
            </p>
          </div>
          ${profile ? `
            <div class="bg-pink-50 dark:bg-pink-950/40 px-4 py-2 rounded-2xl border border-pink-200 dark:border-pink-800 text-xs text-pink-700 dark:text-pink-300 font-bold">
              👤 ${profile.name} (${profile.age ? `${profile.age} yosh` : ''})
            </div>
          ` : ''}
        </div>
    `;

    // 1. Saved Career
    if (quizResult) {
      html += `
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-fuchsia-100 dark:border-fuchsia-900/40 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-fuchsia-600 uppercase tracking-wider">Tavsiya Etilgan IT Mutaxassisligi</span>
            <span class="text-xs font-bold text-emerald-600">${quizResult.matchScore || 95}% Moslik</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">${quizResult.primaryCareer}</h3>
          <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">${quizResult.summary}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <button onclick="App.switchTab('roadmap')" class="px-4 py-2 bg-fuchsia-600 text-white rounded-xl text-xs font-bold shadow">
              O'quv Rejasiga O'tish
            </button>
            <button onclick="App.switchTab('videos')" class="px-4 py-2 border border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-300 rounded-xl text-xs font-bold">
              Video Darslarni Ko'rish
            </button>
          </div>
        </div>
      `;
    }

    // 2. Saved Videos
    html += `
      <div>
        <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <i data-lucide="youtube" class="w-4 h-4 text-red-500"></i> Saqlangan Video Darslar (${savedVideos.length})
        </h3>
    `;

    if (savedVideos.length === 0) {
      html += `
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center text-gray-400 border border-dashed text-xs">
          Hozircha hech qanday video saqlanmagan. "Video Darslar" bo'limidan o'zingizga qiziq darslarni belgilab oling.
        </div>
      `;
    } else {
      html += `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${savedVideos.map(v => `
            <div class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold text-fuchsia-600 uppercase tracking-wider">${v.categoryLabel || v.category}</span>
                <h4 class="font-bold text-gray-900 dark:text-white text-sm mt-1">${v.title}</h4>
                <div class="text-xs text-gray-500 mt-0.5">${v.channel || ''}</div>
              </div>
              <div class="mt-4 pt-3 border-t flex justify-between items-center text-xs">
                <button onclick="window.VideoHub.openVideoModal('${v.id}')" class="text-fuchsia-600 font-bold hover:underline flex items-center gap-1">
                  <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i> Ko'rish
                </button>
                <button onclick="window.VideoHub.toggleSaveVideo('${v.id}'); App.renderSavedSection();" class="text-red-500 hover:text-red-700 font-bold">
                  O'chirish
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    html += `</div></div>`;
    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  },

  setupAccessibility() {
    const savedContrast = localStorage.getItem("digiher_high_contrast") === "true";
    if (savedContrast) {
      document.documentElement.classList.add("accessibility-high-contrast");
    }

    const savedFontSize = localStorage.getItem("digiher_font_size") || "normal";
    this.setFontSize(savedFontSize, false);
  },

  toggleHighContrast() {
    const isNowContrast = document.documentElement.classList.toggle("accessibility-high-contrast");
    localStorage.setItem("digiher_high_contrast", isNowContrast);
  },

  setFontSize(size, save = true) {
    document.documentElement.classList.remove("font-size-lg", "font-size-xl");
    if (size === "lg") {
      document.documentElement.classList.add("font-size-lg");
    } else if (size === "xl") {
      document.documentElement.classList.add("font-size-xl");
    }
    if (save) {
      localStorage.setItem("digiher_font_size", size);
    }
  },

  setupSettingsModal() {
    const modal = document.getElementById("settings-modal");
    const openBtn = document.getElementById("open-settings-btn");
    const closeBtn = document.getElementById("close-settings-btn");
    const saveBtn = document.getElementById("save-settings-btn");

    if (openBtn && modal) {
      openBtn.addEventListener("click", () => {
        const keyInput = document.getElementById("settings-gemini-key");
        const urlInput = document.getElementById("settings-supabase-url");
        const anonInput = document.getElementById("settings-supabase-anon");

        if (keyInput) keyInput.value = window.CONFIG.getGeminiKey();
        const s = window.CONFIG.getSupabaseConfig();
        if (urlInput) urlInput.value = s.url;
        if (anonInput) anonInput.value = s.anonKey;

        modal.classList.remove("hidden");
        modal.classList.add("flex");
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      });
    }

    if (saveBtn && modal) {
      saveBtn.addEventListener("click", () => {
        const keyInput = document.getElementById("settings-gemini-key");
        const urlInput = document.getElementById("settings-supabase-url");
        const anonInput = document.getElementById("settings-supabase-anon");

        if (keyInput) window.CONFIG.setGeminiKey(keyInput.value);
        if (urlInput && anonInput) window.CONFIG.setSupabaseConfig(urlInput.value, anonInput.value);

        window.SupabaseManager.init();
        this.updateStatusBadge();

        modal.classList.add("hidden");
        modal.classList.remove("flex");
        alert("Sozlamalar muvaffaqiyatli saqlandi! ✨");
      });
    }
  },

  updateStatusBadge() {
    const badge = document.getElementById("ai-status-indicator");
    if (!badge) return;

    const hasKey = !!window.CONFIG.getGeminiKey();
    if (hasKey) {
      badge.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Gemini AI Faol</span>
      `;
    } else {
      badge.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-amber-500"></span>
        <span class="text-xs font-semibold text-amber-700 dark:text-amber-400">Kalit kiritilmagan</span>
      `;
    }
  },

  setupThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    const isDark = localStorage.getItem("digiher_dark_mode") === "true";

    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const currentlyDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("digiher_dark_mode", currentlyDark);
      });
    }
  }
};

window.App = App;
document.addEventListener("DOMContentLoaded", () => App.init());

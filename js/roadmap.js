/**
 * DigiHer AI — Learning Roadmap Module
 */

const LearningRoadmap = {
  currentTrack: "Sun'iy Intellekt va Data Science",
  currentLevel: "Boshlang'ich (Zero to Hero)",
  currentHours: "6-10 soat",
  roadmapData: null,
  completedTasks: new Set(),

  tracks: [
    { id: "ai", name: "Sun'iy Intellekt va Data Science", icon: "brain-circuit" },
    { id: "frontend", name: "Frontend va UI/UX Dasturlash", icon: "layout" },
    { id: "backend", name: "Python va Backend Dasturlash", icon: "server" },
    { id: "mobile", name: "Mobil Dasturlash (Flutter / iOS)", icon: "smartphone" },
    { id: "cyber", name: "Kiberxavfsizlik va Ma'lumotlar Himoyasi", icon: "shield" }
  ],

  init() {
    this.completedTasks = new Set(window.SupabaseManager.getRoadmapProgress());
    this.renderTrackSelector();
    this.checkActiveRoadmap();
  },

  checkActiveRoadmap() {
    const active = window.SupabaseManager.getActiveRoadmap();
    if (active) {
      this.roadmapData = active;
      this.renderRoadmap(active);
    } else {
      // Generate default roadmap
      this.generateRoadmap();
    }
  },

  selectTrack(trackName) {
    this.currentTrack = trackName;
    const selectElem = document.getElementById("roadmap-track-select");
    if (selectElem) {
      for (let option of selectElem.options) {
        if (option.text.toLowerCase().includes(trackName.toLowerCase()) || trackName.toLowerCase().includes(option.value.toLowerCase())) {
          selectElem.value = option.value;
          break;
        }
      }
    }
    this.generateRoadmap();
  },

  renderTrackSelector() {
    const container = document.getElementById("roadmap-config-box");
    if (!container) return;

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
            Yo'nalish
          </label>
          <select 
            id="roadmap-track-select" 
            onchange="LearningRoadmap.currentTrack = this.value"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
          >
            ${this.tracks.map(t => `<option value="${t.name}" ${t.name === this.currentTrack ? 'selected' : ''}>${t.name}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
            Boshlang'ich Daraja
          </label>
          <select 
            id="roadmap-level-select" 
            onchange="LearningRoadmap.currentLevel = this.value"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
          >
            <option value="Boshlang'ich (Zero to Hero)">Boshlang'ich (Zero to Hero)</option>
            <option value="O'rta (Amaliyotchi)">O'rta (Amaliyotchi)</option>
            <option value="Kuchli (Karyera va Grantlar)">Kuchli (Karyera va Grantlar)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
            Haftalik Vaqt
          </label>
          <select 
            id="roadmap-hours-select" 
            onchange="LearningRoadmap.currentHours = this.value"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
          >
            <option value="3-5 soat">3 - 5 soat (Erkin rejim)</option>
            <option value="6-10 soat" selected>6 - 10 soat (Standart)</option>
            <option value="15+ soat">15+ soat (Intensiv o'qish)</option>
          </select>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <i data-lucide="sparkles" class="w-4 h-4 text-fuchsia-500"></i>
          Gemini AI orqali qizlar uchun moslashtirilgan o'quv traektoriyasi
        </div>
        <button 
          id="btn-generate-roadmap"
          onclick="LearningRoadmap.generateRoadmap()" 
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold text-xs sm:text-sm hover:opacity-95 shadow-md shadow-pink-500/20 flex items-center gap-2"
        >
          <i data-lucide="refresh-cw" class="w-4 h-4"></i> Yangi Reja Tuzish
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  async generateRoadmap() {
    const container = document.getElementById("roadmap-display-container");
    const btn = document.getElementById("btn-generate-roadmap");
    if (!container) return;

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Reja tuzilmoqda...`;
      if (window.lucide) window.lucide.createIcons();
    }

    container.innerHTML = `
      <div class="py-12 text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center mx-auto">
          <i data-lucide="loader-2" class="w-6 h-6 animate-spin"></i>
        </div>
        <div class="text-base font-semibold text-gray-800 dark:text-gray-200">
          DigiHer AI ${this.currentTrack} bo'yicha individual o'quv dasturini tuzmoqda...
        </div>
        <p class="text-xs text-gray-500 max-w-sm mx-auto">
          O'zbek va xalqaro bepul resurslar, haftalik vazifalar va portfolioga loyihalar saralanmoqda.
        </p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();

    try {
      const roadmap = await window.GeminiService.generateLearningRoadmap(this.currentTrack, this.currentLevel, this.currentHours);
      this.roadmapData = roadmap;
      await window.SupabaseManager.saveRoadmap(roadmap);
      this.renderRoadmap(roadmap);
    } catch (e) {
      console.error("Roadmap generation failed:", e);
      const fallback = window.GeminiService.getFallbackRoadmap(this.currentTrack, this.currentLevel, this.currentHours);
      this.roadmapData = fallback;
      this.renderRoadmap(fallback);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="refresh-cw" class="w-4 h-4"></i> Yangi Reja Tuzish`;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  },

  renderRoadmap(roadmap) {
    const container = document.getElementById("roadmap-display-container");
    if (!container) return;

    const totalTasks = roadmap.modules.length;
    let completedCount = 0;
    roadmap.modules.forEach(m => {
      const taskId = `task_week_${m.week}`;
      if (this.completedTasks.has(taskId)) completedCount++;
    });
    const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- Header & Progress Stats -->
        <div class="bg-gradient-to-r from-fuchsia-600/10 via-pink-600/10 to-purple-600/10 rounded-2xl p-5 border border-fuchsia-200 dark:border-fuchsia-800/40 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wider">
              ${roadmap.level} • ${roadmap.weeklyHours}
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
              ${roadmap.trackTitle} — Yo'l Xaritasi
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
              ${roadmap.overview}
            </p>
          </div>

          <div class="min-w-[180px] bg-white dark:bg-gray-800 p-4 rounded-xl border border-pink-100 dark:border-gray-700 shadow-sm">
            <div class="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span class="text-gray-600 dark:text-gray-300">O'quv progressi:</span>
              <span class="text-fuchsia-600 dark:text-fuchsia-400 font-bold">${progressPercent}%</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 transition-all duration-500 rounded-full" style="width: ${progressPercent}%;"></div>
            </div>
            <div class="text-[11px] text-gray-400 mt-1.5 text-center">
              ${completedCount} / ${totalTasks} haftalik vazifa bajarildi
            </div>
          </div>
        </div>

        <!-- Weekly Modules Timeline -->
        <div class="space-y-4">
          ${roadmap.modules.map(mod => {
            const taskId = `task_week_${mod.week}`;
            const isCompleted = this.completedTasks.has(taskId);

            return `
              <div class="relative bg-white dark:bg-gray-900 rounded-2xl p-5 border transition-all ${
                isCompleted 
                  ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/10' 
                  : 'border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-900'
              } shadow-sm">
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                        : 'bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-600 dark:text-fuchsia-400'
                    }">
                      ${isCompleted ? '<i data-lucide="check" class="w-5 h-5"></i>' : `${mod.week}`}
                    </div>

                    <div class="space-y-2">
                      <div>
                        <h4 class="text-base font-bold text-gray-900 dark:text-white ${isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''}">
                          ${mod.title}
                        </h4>
                        <p class="text-xs text-fuchsia-600 dark:text-fuchsia-400 font-medium mt-0.5">
                          🎯 Maqsad: ${mod.goal}
                        </p>
                      </div>

                      <!-- Topics List -->
                      <div class="space-y-1 pt-1">
                        <div class="text-xs font-semibold text-gray-500 dark:text-gray-400">O'rganiladigan mavzular:</div>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                          ${mod.topics.map(t => `
                            <li class="flex items-center gap-1.5">
                              <span class="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                              <span>${t}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>

                      <!-- Practical Task & Resources -->
                      <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div class="bg-fuchsia-50/50 dark:bg-fuchsia-950/20 p-2.5 rounded-xl border border-fuchsia-100 dark:border-fuchsia-900/30">
                          <span class="font-semibold text-fuchsia-700 dark:text-fuchsia-300 block mb-0.5">
                            💻 Amaliy Mini-Loyiha:
                          </span>
                          <span class="text-gray-600 dark:text-gray-300">${mod.practicalTask}</span>
                        </div>

                        <div class="bg-pink-50/50 dark:bg-pink-950/20 p-2.5 rounded-xl border border-pink-100 dark:border-pink-900/30">
                          <span class="font-semibold text-pink-700 dark:text-pink-300 block mb-0.5">
                            📚 Tavsiya Etilgan Bepul Resurslar:
                          </span>
                          <span class="text-gray-600 dark:text-gray-300">${mod.resources.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Complete Action Checkbox -->
                  <div class="shrink-0 flex items-center sm:self-center">
                    <label class="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                        : 'bg-gray-100 hover:bg-fuchsia-50 text-gray-600 hover:text-fuchsia-600 dark:bg-gray-800 dark:text-gray-300'
                    }">
                      <input 
                        type="checkbox" 
                        ${isCompleted ? 'checked' : ''}
                        onchange="LearningRoadmap.toggleTask('${taskId}')"
                        class="w-4 h-4 text-fuchsia-600 rounded focus:ring-fuchsia-500 border-gray-300 cursor-pointer"
                      />
                      <span>${isCompleted ? 'Bajarildi ✓' : 'Bajarildi deb belgilash'}</span>
                    </label>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Export & Share buttons -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button 
            onclick="LearningRoadmap.copyRoadmap()" 
            class="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1.5"
          >
            <i data-lucide="copy" class="w-3.5 h-3.5"></i> Rejani Nusxalash
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  toggleTask(taskId) {
    if (this.completedTasks.has(taskId)) {
      this.completedTasks.delete(taskId);
    } else {
      this.completedTasks.add(taskId);
      if (window.confetti) {
        window.confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      }
    }
    window.SupabaseManager.saveRoadmapProgress(Array.from(this.completedTasks));
    if (this.roadmapData) {
      this.renderRoadmap(this.roadmapData);
    }
  },

  copyRoadmap() {
    if (!this.roadmapData) return;
    let text = `# DigiHer AI — ${this.roadmapData.trackTitle} O'quv Rejasi\n`;
    text += `Daraja: ${this.roadmapData.level} | Vaqt: ${this.roadmapData.weeklyHours}\n\n`;
    this.roadmapData.modules.forEach(m => {
      text += `## ${m.title}\nMaqsad: ${m.goal}\nMavzular: ${m.topics.join(', ')}\nAmaliy vazifa: ${m.practicalTask}\n\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      alert("O'quv rejasi clipboard-ga nusxalandi!");
    });
  }
};

window.LearningRoadmap = LearningRoadmap;

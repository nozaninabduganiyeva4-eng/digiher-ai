/**
 * DigiHer AI — YouTube Learning Hub & AI Video Recommendation Module
 */

const VideoHub = {
  currentCategory: "all",
  searchQuery: "",
  activeVideo: null,

  // Curated High-Quality IT & AI YouTube Video Lessons
  curatedVideos: [
    {
      id: "ai-python-intro",
      youtubeId: "_uQrJ0TkZlc",
      title: "Python Dasturlash Tili Noldan To'liq Kurs",
      channel: "Programming with Mosh / O'zbekcha sharhlar",
      category: "ai",
      categoryLabel: "Sun'iy Intellekt & Python",
      level: "Boshlang'ich",
      duration: "6 soat",
      language: "O'zbekcha / Subtitr",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      description: "Python tilining asosiy sintaksisi, o'zgaruvchilar, shartlar, tsikllar va sun'iy intellektga ilk poydevor.",
      keyTopics: ["Python sintaksisi", "Funksiyalar va ro'yxatlar", "AI uchun kutubxonalar bilan ishlash"]
    },
    {
      id: "ai-gemini-intro",
      youtubeId: "c-_s0oB9Y-g",
      title: "Google Gemini AI API bilan Ishlash va Aqlli Ilova Yaratish",
      channel: "Google for Developers",
      category: "ai",
      categoryLabel: "Sun'iy Intellekt (AI)",
      level: "Boshlang'ich - O'rta",
      duration: "45 daqiqa",
      language: "Inglizcha / O'zbekcha konspekt",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
      description: "Gemini 1.5 & Flash modellarini veb-loyihangizga ulash, prompt engineering va sun'iy intellekt boti yaratish.",
      keyTopics: ["Gemini API kaliti", "generateContent so'rovlari", "Chatbot yaratish"]
    },
    {
      id: "frontend-html-css",
      youtubeId: "G3e-cpL7ofc",
      title: "HTML5 va CSS3 Noldan Professional Veb-Sahifagacha",
      channel: "SuperSimpleDev / Samar Badriddinov",
      category: "frontend",
      categoryLabel: "Frontend & Veb",
      level: "Boshlang'ich",
      duration: "3 soat",
      language: "O'zbek tili / Amaliy",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
      description: "Veb-saytlarning skeleti va tashqi dizayni. Chiroyli, moslashuvchan (responsive) veb-sahifalar qurish sirlari.",
      keyTopics: ["HTML teglar va semantika", "CSS Flexbox va Grid", "Mobil moslashuvchanlik"]
    },
    {
      id: "frontend-javascript",
      youtubeId: "W6NZfCO5SIk",
      title: "JavaScript Asoslari va Interaktiv Veb-Ilovalar",
      channel: "JavaScript Mastery",
      category: "frontend",
      categoryLabel: "Frontend & JS",
      level: "Boshlang'ich - O'rta",
      duration: "4 soat",
      language: "O'zbekcha / Subtitr",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-ddb62129c927?w=600&auto=format&fit=crop&q=80",
      description: "Tugmalar bosilishi, animatsiyalar, ma'lumotlarni hisoblash va foydalanuvchi bilan jonli muloqot qiluvchi skriptlar.",
      keyTopics: ["DOM manipulyatsiyasi", "Hodisalar (Events)", "API fetch va LocalStorage"]
    },
    {
      id: "uiux-figma",
      youtubeId: "FTFaQWZBqQ8",
      title: "Figma Master Klass: Qizlar Uchun Mobil Ilova Dizayni",
      channel: "DesignCourse",
      category: "uiux",
      categoryLabel: "UI/UX Dizayn",
      level: "Boshlang'ich",
      duration: "2 soat",
      language: "O'zbekcha tushuntirish",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
      description: "Mobil ilovalar va veb-saytlar uchun chiroyli prototiplar chizish, ranglar psixologiyasi va foydalanuvchi qulayligi.",
      keyTopics: ["Figma freymlar va auto-layout", "Komponentlar va variantlar", "Mobil ilova prototipi"]
    },
    {
      id: "mobile-flutter",
      youtubeId: "VPvVD8t02U8",
      title: "Flutter va Dart Orqali Birinchi Mobil Ilovangizni Yaratish",
      channel: "Flutter Official",
      category: "mobile",
      categoryLabel: "Mobil Dasturlash",
      level: "Boshlang'ich",
      duration: "3.5 soat",
      language: "O'zbekcha / Subtitr",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
      description: "Bitta kod bilan ham iOS, ham Android uchun chiroyli va tezkor mobil ilovalar yaratish texnologiyasi.",
      keyTopics: ["Dart tili asoslari", "Widgetlar va State management", "Mobil ilovani telefonda ishga tushirish"]
    },
    {
      id: "backend-django",
      youtubeId: "ptgU_A2iO3E",
      title: "Python va Django: Ma'lumotlar Bazasi va Server Yaratish",
      channel: "freeCodeCamp / Anvar Narzullaev",
      category: "backend",
      categoryLabel: "Python & Backend",
      level: "O'rta daraja",
      duration: "4 soat",
      language: "O'zbek tili",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      description: "Veb-saytlarning miyasi — ma'lumotlar bazasi bilan ishlash, ro'yxatdan o'tish tizimi va xavfsiz server arxitekturasi.",
      keyTopics: ["Django modellari va ORM", "REST API yaratish", "PostgreSQL / Supabase integratsiyasi"]
    },
    {
      id: "frontend-react",
      youtubeId: "bMknfKXIFA8",
      title: "React.js 2026: Zamonaviy Veb-Ilovalar Qurish",
      channel: "Traversy Media / Samar Badriddinov",
      category: "frontend",
      categoryLabel: "React & Web",
      level: "O'rta daraja",
      duration: "3 soat",
      language: "O'zbekcha / Subtitr",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
      description: "Dunyoning yetakchi kompaniyalari (Meta, Netflix, Airbnb) foydalanadigan eng mashhur frontend freymvorki.",
      keyTopics: ["React Hooklari (useState, useEffect)", "Props va State", "Tailwind CSS bilan birlashtirish"]
    }
  ],

  init() {
    this.renderVideos();
    this.setupListeners();
  },

  setupListeners() {
    const searchInput = document.getElementById("video-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderVideos();
      });
    }
  },

  setCategory(cat) {
    this.currentCategory = cat;
    
    // Update active filter pill style
    const pills = document.querySelectorAll(".video-filter-pill");
    pills.forEach(p => {
      if (p.dataset.category === cat) {
        p.className = "video-filter-pill px-4 py-2 rounded-xl text-xs font-bold bg-fuchsia-600 text-white shadow-md shadow-pink-500/20";
      } else {
        p.className = "video-filter-pill px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all";
      }
    });

    this.renderVideos();
  },

  renderVideos() {
    const container = document.getElementById("videos-grid");
    if (!container) return;

    let filtered = this.curatedVideos.filter(item => {
      const matchesCategory = this.currentCategory === "all" || item.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.channel.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
          <i data-lucide="video-off" class="w-10 h-10 mx-auto text-gray-400 mb-2"></i>
          Ushbu qidiruv bo'yicha video darslar topilmadi. Boshqa so'z bilan qidirib ko'ring yoki yuqoridagi tahlilchiga YouTube havolasini yuboring.
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const savedIds = new Set(window.SupabaseManager.getSavedVideos().map(x => x.id));

    container.innerHTML = filtered.map(item => {
      const isSaved = savedIds.has(item.id);

      return `
        <div class="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          
          <!-- Thumbnail & Video Badge -->
          <div class="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer" onclick="VideoHub.openVideoModal('${item.id}')">
            <img 
              src="${item.thumbnail}" 
              alt="${item.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
            />
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-fuchsia-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>
              </div>
            </div>

            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/60 text-white backdrop-blur">
              ${item.categoryLabel}
            </span>

            <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-white">
              ${item.duration}
            </span>
          </div>

          <!-- Video Details -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                  ${item.channel}
                </span>
                <span class="text-[11px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  ${item.level}
                </span>
              </div>

              <h3 
                onclick="VideoHub.openVideoModal('${item.id}')"
                class="text-base font-bold text-gray-900 dark:text-white leading-snug cursor-pointer hover:text-fuchsia-600 dark:hover:text-pink-400 transition-colors"
              >
                ${item.title}
              </h3>

              <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                ${item.description}
              </p>

              <!-- Key topics pills -->
              <div class="flex flex-wrap gap-1 mt-3">
                ${item.keyTopics.map(t => `
                  <span class="text-[10px] px-2 py-0.5 rounded bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300">
                    ✓ ${t}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Card Actions -->
            <div class="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
              <button 
                onclick="VideoHub.toggleSaveVideo('${item.id}')"
                class="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSaved 
                    ? 'border-pink-300 bg-pink-50 text-pink-600 dark:bg-pink-950/40' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                }"
              >
                <i data-lucide="bookmark" class="w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}"></i>
                <span>${isSaved ? 'Saqlandi' : 'Saqlash'}</span>
              </button>

              <button 
                onclick="VideoHub.openVideoModal('${item.id}')"
                class="px-4 py-1.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-sm flex items-center gap-1.5"
              >
                Ko'rish <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  /**
   * AI YouTube Link & Video Analyzer
   */
  async analyzeCustomLink() {
    const input = document.getElementById("custom-youtube-input");
    const resultBox = document.getElementById("ai-video-analysis-result");
    const btn = document.getElementById("btn-analyze-youtube");

    const query = input ? input.value.trim() : "";
    if (!query) {
      alert("Iltimos, YouTube video yoki pleylist havolasini kiriting.");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Tahlil qilinmoqda...`;
      if (window.lucide) window.lucide.createIcons();
    }

    try {
      // Call Gemini to analyze the topic or video link
      const analysis = await window.GeminiService.analyzeYouTubeVideoOrTopic(query, this.currentCategory);
      
      // Try to extract YouTube ID if it's a URL
      let embedId = "c-_s0oB9Y-g"; // default high quality AI tutorial fallback
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = query.match(regExp);
      if (match && match[2].length === 11) {
        embedId = match[2];
      }

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <div class="bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-purple-500/10 p-6 rounded-3xl border border-fuchsia-200 dark:border-fuchsia-800 shadow-lg space-y-4 animate-fade-in">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-fuchsia-100 dark:border-fuchsia-900 pb-3">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                <i data-lucide="youtube" class="w-4 h-4"></i>
              </span>
              <div>
                <span class="text-[10px] font-bold text-fuchsia-600 uppercase tracking-wider">AI Video Tahlil Natijasi</span>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">${analysis.detectedTopic}</h4>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/60 dark:text-fuchsia-300">
              ${analysis.categoryLabel} • ${analysis.level}
            </span>
          </div>

          <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            ${analysis.summary}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="bg-white/80 dark:bg-gray-800/80 p-3 rounded-2xl border">
              <span class="font-bold text-pink-600 block mb-1">🎯 O'rganiladigan Asosiy Tushunchalar:</span>
              <ul class="space-y-1 text-gray-600 dark:text-gray-300">
                ${analysis.keyTakeaways.map(t => `<li>• ${t}</li>`).join('')}
              </ul>
            </div>
            <div class="bg-white/80 dark:bg-gray-800/80 p-3 rounded-2xl border">
              <span class="font-bold text-emerald-600 block mb-1">💡 O'quvchi Uchun Amaliy Tavsiya:</span>
              <p class="text-gray-600 dark:text-gray-300">${analysis.recommendedAction}</p>
              <div class="mt-2 text-[11px] text-fuchsia-600 font-semibold">${analysis.matchWithUserTrack}</div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button 
              onclick="VideoHub.playDirectVideo('${embedId}', '${analysis.detectedTopic.replace(/'/g, "\\'")}', '${analysis.summary.replace(/'/g, "\\'")}')" 
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-xs shadow-md hover:opacity-95 flex items-center gap-2"
            >
              <i data-lucide="play" class="w-4 h-4 fill-current"></i> Videoni Platformada Ko'rish
            </button>
          </div>
        </div>
      `;

      if (window.confetti) {
        window.confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }
      if (window.lucide) window.lucide.createIcons();
    } catch (e) {
      alert("Tahlilda xatolik yuz berdi: " + e.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i> AI Bilan Tahlil Qilish`;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  },

  openVideoModal(videoId) {
    const video = this.curatedVideos.find(v => v.id === videoId);
    if (!video) return;

    this.playDirectVideo(video.youtubeId, video.title, video.description, video.keyTopics);
  },

  playDirectVideo(youtubeId, title, description, topics = []) {
    const modal = document.getElementById("video-player-modal");
    if (!modal) return;

    document.getElementById("modal-video-title").textContent = title;
    document.getElementById("modal-video-desc").textContent = description;

    const iframe = document.getElementById("modal-video-iframe");
    if (iframe) {
      iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`;
    }

    const topicsContainer = document.getElementById("modal-video-topics");
    if (topicsContainer) {
      topicsContainer.innerHTML = topics.map(t => `
        <span class="px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 text-xs font-semibold">
          ✓ ${t}
        </span>
      `).join('');
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  },

  closeVideoModal() {
    const modal = document.getElementById("video-player-modal");
    const iframe = document.getElementById("modal-video-iframe");
    if (iframe) iframe.src = "";
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  },

  toggleSaveVideo(videoId) {
    const video = this.curatedVideos.find(v => v.id === videoId);
    if (!video) return;

    const saved = window.SupabaseManager.getSavedVideos();
    const exists = saved.some(x => x.id === videoId);

    if (exists) {
      window.SupabaseManager.removeSavedVideo(videoId);
    } else {
      window.SupabaseManager.saveVideo(video);
      if (window.confetti) {
        window.confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
      }
    }
    this.renderVideos();
  }
};

window.VideoHub = VideoHub;

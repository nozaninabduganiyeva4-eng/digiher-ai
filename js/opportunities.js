/**
 * DigiHer AI — Opportunities, Grants & Competitions Hub
 */

const OpportunitiesHub = {
  currentFilter: "all",
  searchQuery: "",
  opportunities: [
    {
      id: "technovation-girls",
      title: "Technovation Girls Uzbekistan & Global",
      organizer: "Technovation Global & Tech4Impact",
      category: "competition",
      categoryLabel: "Xalqaro Tanlov",
      targetAudience: "8-18 yoshli maktab va litsey o'quvchi qizlari",
      prize: "Xalqaro final, $10,000+ sovrin jamg'armasi va San-Fransiskoga sayohat",
      deadline: "2025-04-15",
      link: "https://technovationchallenge.org",
      tags: ["Mobil Ilovalar", "AI", "Ijtimoiy Loyihalar", "Jamoaviy"],
      description: "Qizlarga texnologiya va tadbirkorlik orqali o'z jamiyatidagi muammolarni hal qilishni o'rgatuvchi jahondagi eng yirik dastur. Jamoangiz bilan mobil ilova yoki AI model yaratasiz va xalqaro miqyosda himoya qilasiz."
    },
    {
      id: "google-wtm-scholars",
      title: "Google Women Techmakers (WTM) Scholarship",
      organizer: "Google",
      category: "grant",
      categoryLabel: "Katta Grant",
      targetAudience: "Universitet yoki institutda o'qiydigan barcha talaba qizlar",
      prize: "€7,000 stipendiya + Google xalqaro retreat forumi",
      deadline: "2025-05-30",
      link: "https://www.womentechmakers.com",
      tags: ["Google", "Stipendiya", "Dasturlash", "Liderlik"],
      description: "Kompyuter fanlari va texnologiya sohasidagi iqtidorli talaba qizlarni qo'llab-quvvatlash uchun Google tomonidan taqdim etiladigan eng nufuzli stipendiyalardan biri."
    },
    {
      id: "girls-in-ai",
      title: "Girls in AI Global Hackathon & Incubator",
      organizer: "Teens in AI & UNESCO",
      category: "competition",
      categoryLabel: "AI Xakaton",
      targetAudience: "12-18 yoshli qizlar",
      prize: "Xalqaro mentorlik, professional noutbuklar va inkubatsiya",
      deadline: "2025-06-01",
      link: "https://www.teensinai.com",
      tags: ["Sun'iy Intellekt", "Python", "BMT SDGs", "Xakaton"],
      description: "Birlashgan Millatlar Tashkilotining barqaror rivojlanish maqsadlariga asoslangan etik AI loyihalarini yaratish bo'yicha global musobaqa."
    },
    {
      id: "grace-hopper",
      title: "Grace Hopper Celebration Student Fellowship",
      organizer: "AnitaB.org",
      category: "grant",
      categoryLabel: "Xalqaro Grant",
      targetAudience: "Barcha IT sohasidagi bakalavr, magistr va doktorant qizlar",
      prize: "AQShga borish-kelish xarajatlari to'liq qoplanadi + GHC Konferensiya chiptasi",
      deadline: "2025-07-10",
      link: "https://ghc.anitab.org",
      tags: ["AQSh Sayyohati", "Global Networking", "Karyera"],
      description: "Ayollar texnologiya olamidagi dunyodagi eng nufuzli yig'in. Apple, Google, Microsoft rahbarlari bilan to'g'ridan-to'g'ri aloqa o'rnatish imkoniyati."
    },
    {
      id: "it-park-women",
      title: "IT-Park 'Qizlar IT-da' Davlat Grantlari",
      organizer: "IT Park Uzbekistan & Raqamli Texnologiyalar Vazirligi",
      category: "course",
      categoryLabel: "Bepul O'quv Dasturi",
      targetAudience: "O'zbekistonlik 16-35 yoshli qizlar va ayollar",
      prize: "100% bepul intensiv ta'lim + amaliyot va ishga joylashish ko'magi",
      deadline: "2025-08-01",
      link: "https://it-park.uz",
      tags: ["O'zbekiston", "Frontend", "QA Testlash", "Python"],
      description: "Mamlakatimiz xotin-qizlarini eng talabgir IT sohalariga bepul o'qitish va kafolatlangan rezyume tayyorlash davlat dasturi."
    },
    {
      id: "mit-solved",
      title: "MIT Solv[ED] Youth Innovation Challenge",
      organizer: "Massachusetts Institute of Technology (MIT)",
      category: "competition",
      categoryLabel: "Innovatsiya Tanlovi",
      targetAudience: "24 yoshgacha bo'lgan yoshlar va talabalar",
      prize: "$200,000+ mukofot jamg'armasi va MIT akseleratsiya dasturi",
      deadline: "2025-09-15",
      link: "https://solve.mit.edu",
      tags: ["MIT", "Startap", "Texnologiya", "Ta'lim"],
      description: "MIT universiteti tomonidan yosh innovatorlar uchun o'tkaziladigan xalqaro loyihalar tanlovi."
    },
    {
      id: "she-codes-scholarship",
      title: "SheCodes Foundation Full Coding Scholarship",
      organizer: "SheCodes",
      category: "course",
      categoryLabel: "Bepul Dasturlash Granti",
      targetAudience: "Texnologiyaga qiziquvchi barcha xotin-qizlar",
      prize: "HTML, CSS, JavaScript va React bo'yicha to'liq bepul litsenziya",
      deadline: "Doimiy qabul",
      link: "https://www.shecodes.io/foundation",
      tags: ["Frontend", "React", "Sertifikat", "Onlayn"],
      description: "Rivojlanayotgan mamlakatlardagi 100,000 dan ortiq ayollarni dasturlashga o'qitish global xayriya tashabbusi."
    }
  ],

  init() {
    this.renderOpportunities();
    this.setupFilters();
  },

  setupFilters() {
    const searchInput = document.getElementById("opp-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderOpportunities();
      });
    }
  },

  setFilter(category) {
    this.currentFilter = category;
    
    // Update active filter pill style
    const pills = document.querySelectorAll(".opp-filter-pill");
    pills.forEach(p => {
      if (p.dataset.category === category) {
        p.className = "opp-filter-pill px-4 py-2 rounded-xl text-xs font-bold bg-fuchsia-600 text-white shadow-md shadow-pink-500/20";
      } else {
        p.className = "opp-filter-pill px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all";
      }
    });

    this.renderOpportunities();
  },

  renderOpportunities() {
    const container = document.getElementById("opportunities-grid");
    if (!container) return;

    let filtered = this.opportunities.filter(item => {
      const matchesCategory = this.currentFilter === "all" || item.category === this.currentFilter;
      const matchesSearch = !this.searchQuery || 
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.organizer.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
          <i data-lucide="search-x" class="w-10 h-10 mx-auto text-gray-400 mb-2"></i>
          Hech qanday imkoniyat topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const savedIds = new Set(window.SupabaseManager.getSavedOpportunities().map(x => x.id));

    container.innerHTML = filtered.map(item => {
      const isSaved = savedIds.has(item.id);

      return `
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3 mb-3">
              <span class="px-3 py-1 rounded-full text-xs font-bold ${
                item.category === 'grant' 
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' 
                  : item.category === 'competition'
                  ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/60 dark:text-fuchsia-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
              }">
                ${item.categoryLabel}
              </span>

              <button 
                onclick="OpportunitiesHub.toggleSave('${item.id}')"
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isSaved 
                    ? 'bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400' 
                    : 'text-gray-400 hover:text-pink-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }"
                title="${isSaved ? 'Saqlanganlardan o\'chirish' : 'Saqlab qo\'yish'}"
              >
                <i data-lucide="bookmark" class="w-4 h-4 ${isSaved ? 'fill-current' : ''}"></i>
              </button>
            </div>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-snug">
              ${item.title}
            </h3>

            <div class="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 mt-1 flex items-center gap-1.5">
              <i data-lucide="building-2" class="w-3.5 h-3.5"></i>
              ${item.organizer}
            </div>

            <p class="text-xs text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
              ${item.description}
            </p>

            <div class="mt-4 space-y-1.5 text-xs bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <i data-lucide="trophy" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
                <span class="font-medium">${item.prize}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <i data-lucide="users" class="w-3.5 h-3.5 text-fuchsia-500 shrink-0"></i>
                <span>${item.targetAudience}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-pink-500 shrink-0"></i>
                <span>Muddati: <strong>${item.deadline}</strong></span>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 mt-3">
              ${item.tags.map(t => `
                <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px]">
                  #${t}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2">
            <button 
              onclick="OpportunitiesHub.openMotivationModal('${item.id}')"
              class="px-4 py-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/50 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <i data-lucide="wand-2" class="w-3.5 h-3.5"></i> AI Motivatsion Xat
            </button>

            <a 
              href="${item.link}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-sm flex items-center gap-1.5"
            >
              Ariza Topshirish <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  toggleSave(oppId) {
    const opp = this.opportunities.find(x => x.id === oppId);
    if (!opp) return;

    const saved = window.SupabaseManager.getSavedOpportunities();
    const exists = saved.some(x => x.id === oppId);

    if (exists) {
      window.SupabaseManager.removeSavedOpportunity(oppId);
    } else {
      window.SupabaseManager.saveOpportunity({
        id: opp.id,
        title: opp.title,
        organizer: opp.organizer,
        deadline: opp.deadline,
        status: "Ko'rib chiqilmoqda"
      });
      if (window.confetti) {
        window.confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
      }
    }
    this.renderOpportunities();
  },

  openMotivationModal(oppId) {
    const opp = this.opportunities.find(x => x.id === oppId);
    if (!opp) return;

    const modal = document.getElementById("motivation-modal");
    if (!modal) return;

    document.getElementById("modal-opp-title").textContent = opp.title;
    document.getElementById("modal-opp-id").value = opp.id;
    document.getElementById("motivation-result-box").classList.add("hidden");
    document.getElementById("motivation-form").classList.remove("hidden");

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  },

  closeMotivationModal() {
    const modal = document.getElementById("motivation-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  },

  async generateMotivationLetter() {
    const oppId = document.getElementById("modal-opp-id").value;
    const opp = this.opportunities.find(x => x.id === oppId);
    const name = document.getElementById("applicant-name").value.trim() || "Dasturchi Qiz";
    const education = document.getElementById("applicant-education").value.trim() || "Talaba / O'quvchi";
    const techInterest = document.getElementById("applicant-interest").value.trim() || "Sun'iy Intellekt va Dasturlash";
    const goals = document.getElementById("applicant-goals").value.trim() || "O'zbekistonda xotin-qizlar uchun IT sohasini rivojlantirish";

    const generateBtn = document.getElementById("btn-generate-motivation");
    const resultBox = document.getElementById("motivation-result-box");
    const formBox = document.getElementById("motivation-form");
    const textOutput = document.getElementById("motivation-letter-output");

    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Gemini AI xatni yozmoqda...`;
    if (window.lucide) window.lucide.createIcons();

    try {
      const letter = await window.GeminiService.generateMotivationLetter({
        opportunityTitle: opp ? opp.title : "Xalqaro Grant",
        name: name,
        education: education,
        techInterest: techInterest,
        goals: goals
      });

      formBox.classList.add("hidden");
      resultBox.classList.remove("hidden");
      textOutput.value = letter;

      // Save to Supabase / LocalStorage
      window.SupabaseManager.saveOpportunity({
        id: opp.id,
        title: opp.title,
        motivationLetter: letter
      });

      if (window.confetti) {
        window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } catch (e) {
      alert("Xatolik yuz berdi: " + e.message);
    } finally {
      generateBtn.disabled = false;
      generateBtn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i> Yozib Berish`;
      if (window.lucide) window.lucide.createIcons();
    }
  },

  copyMotivationLetter() {
    const text = document.getElementById("motivation-letter-output").value;
    navigator.clipboard.writeText(text).then(() => {
      alert("Motivatsion xat nusxalandi! Endi uni arizangizga joylashingiz mumkin. ✨");
    });
  }
};

window.OpportunitiesHub = OpportunitiesHub;

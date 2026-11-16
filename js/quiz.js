/**
 * DigiHer AI — Career Quiz & Profiler Module
 */

const CareerQuiz = {
  currentQuestionIndex: 0,
  answers: {},

  questions: [
    {
      id: "interest",
      question: "Bo‘sh vaqtingizda qaysi faoliyat sizga ko‘proq zavq bag‘ishlaydi?",
      subtitle: "Qiziqishlaringiz sizning kelajakdagi IT sohangizni belgilaydi",
      options: [
        {
          label: "Chiroyli vizual dizaynlar, rasmlar va veb-sahifalar yaratish",
          icon: "palette",
          desc: "Estetika, ranglar va qulaylik uyg'unligi"
        },
        {
          label: "Murakkab mantiqiy jumboqlar, boshqotirmalar va hisob-kitoblar",
          icon: "brain",
          desc: "Mantiq, algoritm va tizimli tahlil"
        },
        {
          label: "Sun'iy intellekt, robotlar va aqlli ovozli yordamchilar bilan ishlash",
          icon: "sparkles",
          desc: "Kelajak texnologiyalari va AI modellari"
        },
        {
          label: "Odamlar bilan muloqot, loyihalarni tashkillashtirish va boshqarish",
          icon: "users",
          desc: "Jamoa yetakchiligi va mahsulot boshqaruvi"
        }
      ]
    },
    {
      id: "subject",
      question: "Qaysi fan yoki soha sizga ko‘proq ilhom beradi?",
      subtitle: "Maktab yoki universitetdagi sevimli yo'nalishingiz",
      options: [
        {
          label: "Informatika va Dasturlash asoslari",
          icon: "code-2",
          desc: "Kompyuter olami va algoritmlar"
        },
        {
          label: "Rasm, Grafika, San'at va Arxitektura",
          icon: "brush",
          desc: "Ijodkorlik va vizual ifoda"
        },
        {
          label: "Matematika, Mantiq va Statistika",
          icon: "binary",
          desc: "Raqamlar va ma'lumotlar tahlili"
        },
        {
          label: "Chet tillari, Psixologiya va Adabiyot",
          icon: "languages",
          desc: "Foydalanuvchi his-tuyg'ulari va global aloqa"
        }
      ]
    },
    {
      id: "projectGoal",
      question: "Kelajakda qanday loyiha yaratishni orzu qilasiz?",
      subtitle: "Sizning IT olamidagi katta maqsadingiz",
      options: [
        {
          label: "Qizlar va ayollar salomatligi yoki ta'limiga oid qulay mobil ilova",
          icon: "smartphone",
          desc: "Millionlab qizlar hayotini o'zgartiruvchi ilova"
        },
        {
          label: "O'zbek tilida so'zlashuvchi aqlli AI yordamchi va ChatGPT analogi",
          icon: "bot",
          desc: "Milliy sun'iy intellekt ekotizimi"
        },
        {
          label: "Xalqaro brendlar uchun zamonaviy, tezkor va go'zal veb-platforma",
          icon: "globe",
          desc: "Global miqyosdagi veb-saytlar"
        },
        {
          label: "Kiberhujumlardan himoya qiluvchi xavfsiz bank yoki ma'lumotlar tizimi",
          icon: "shield-check",
          desc: "Axborot xavfsizligi va kiberhimoya"
        }
      ]
    },
    {
      id: "strength",
      question: "Sizning eng kuchli tomoningiz qaysi?",
      subtitle: "O'zingizga xos iqtidoringiz",
      options: [
        {
          label: "Kreativlik va estetik nozik did",
          icon: "eye",
          desc: "Har bir narsaning chiroyli va qulay bo'lishiga e'tibor"
        },
        {
          label: "Kuchli sabr, qat'iyat va tafsilotlarga e'tibor",
          icon: "check-circle",
          desc: "Xatolarni oxirigacha topish va yechish"
        },
        {
          label: "Yangi narsalarni tez o'rganish va moslashuvchanlik",
          icon: "zap",
          desc: "Har qanday yangi texnologiyani tez o'zlashtirish"
        },
        {
          label: "Insonlarga yordam berish va empatiya",
          icon: "heart-handshake",
          desc: "Odamlar ehtiyojini tez anglash"
        }
      ]
    },
    {
      id: "timeCommitment",
      question: "Haftasiga IT o‘rganishga qancha vaqt ajrata olasiz?",
      subtitle: "O'quv sur'atingizni to'g'ri rejalashtirish uchun",
      options: [
        {
          label: "3 - 5 soat (Kuniga 45 daqiqa)",
          icon: "clock",
          desc: "Darslar yoki ish bilan birga sokin sur'at"
        },
        {
          label: "6 - 10 soat (Kuniga 1-1.5 soat)",
          icon: "trending-up",
          desc: "Oltin o'rtalik: barqaror va samarali o'sish"
        },
        {
          label: "15+ soat (Intensiv o'qish)",
          icon: "flame",
          desc: "Tezkor natija va tez orada ishga kirish maqsadi"
        }
      ]
    },
    {
      id: "experience",
      question: "Hozirgi paytda texnologiya bo‘yicha tajribangiz qanday?",
      subtitle: "Bosqichingizga mos darslarni tanlash uchun",
      options: [
        {
          label: "Mutlaqo yangi boshlovchiman (Noldan boshlayman)",
          icon: "sparkle",
          desc: "Hech qanday kod yozmaganman, lekin juda qiziqaman"
        },
        {
          label: "Boshlang'ich (HTML, CSS yoki Scratch/Python bilan tanishman)",
          icon: "book-open",
          desc: "Bir nechta darslarni ko'rganman va qiziqaman"
        },
        {
          label: "O'rta daraja (O'z mustaqil loyihalarim ustida ishlayapman)",
          icon: "award",
          desc: "Ko'proq amaliyot va grantlarda g'olib bo'lishni xohlayman"
        }
      ]
    }
  ],

  init() {
    this.renderCurrentQuestion();
    this.checkSavedResult();
  },

  checkSavedResult() {
    const saved = window.SupabaseManager.getSavedQuizResult();
    if (saved) {
      this.renderResult(saved, false);
    }
  },

  renderCurrentQuestion() {
    const container = document.getElementById("quiz-step-container");
    if (!container) return;

    const q = this.questions[this.currentQuestionIndex];
    const total = this.questions.length;
    const progress = Math.round(((this.currentQuestionIndex + 1) / total) * 100);

    // Update progress bar & counter
    const progressBar = document.getElementById("quiz-progress-bar");
    const counterText = document.getElementById("quiz-step-counter");
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (counterText) counterText.textContent = `${this.currentQuestionIndex + 1} / ${total}`;

    const currentSelected = this.answers[q.id];

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div>
          <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 mb-2">
            Savol ${this.currentQuestionIndex + 1}
          </span>
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            ${q.question}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ${q.subtitle}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${q.options.map((opt, idx) => {
            const isSelected = currentSelected === opt.label;
            return `
              <div 
                onclick="CareerQuiz.selectOption('${q.id}', '${opt.label.replace(/'/g, "\\'")}')"
                class="quiz-option-card p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected 
                    ? 'border-fuchsia-500 bg-fuchsia-50/70 dark:bg-fuchsia-950/30 shadow-md ring-2 ring-fuchsia-400/30' 
                    : 'border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-900 bg-white dark:bg-gray-900'
                }"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected 
                    ? 'bg-fuchsia-600 text-white' 
                    : 'bg-pink-100 text-pink-600 dark:bg-gray-800 dark:text-pink-400'
                }">
                  <i data-lucide="${opt.icon}" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white text-base">
                    ${opt.label}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ${opt.desc}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <button 
            onclick="CareerQuiz.prevQuestion()" 
            ${this.currentQuestionIndex === 0 ? 'disabled' : ''}
            class="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i data-lucide="chevron-left" class="w-4 h-4"></i> Orqaga
          </button>

          <button 
            onclick="CareerQuiz.nextQuestion()" 
            ${!currentSelected ? 'disabled' : ''}
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold text-sm hover:opacity-95 shadow-lg shadow-pink-500/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            ${this.currentQuestionIndex === total - 1 ? 'Natijani Ko‘rish' : 'Keyingisi'}
            <i data-lucide="${this.currentQuestionIndex === total - 1 ? 'sparkles' : 'chevron-right'}" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  selectOption(questionId, value) {
    this.answers[questionId] = value;
    this.renderCurrentQuestion();
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderCurrentQuestion();
    }
  },

  async nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderCurrentQuestion();
    } else {
      await this.finishQuiz();
    }
  },

  async finishQuiz() {
    const container = document.getElementById("quiz-step-container");
    if (!container) return;

    // Show AI analyzing loading animation
    container.innerHTML = `
      <div class="py-16 text-center space-y-6">
        <div class="relative w-24 h-24 mx-auto">
          <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-500 to-pink-500 animate-ping opacity-25"></div>
          <div class="relative w-24 h-24 rounded-full bg-gradient-to-tr from-fuchsia-600 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/30">
            <i data-lucide="brain-circuit" class="w-12 h-12 animate-pulse"></i>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            DigiHer AI javoblaringizni tahlil qilmoqda...
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Sizning qiziqishlaringiz, kuchli tomonlaringiz va bo'sh vaqtingiz hisobga olingan holda eng maqbul IT kasbi tanlanmoqda.
          </p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();

    try {
      const result = await window.GeminiService.analyzeCareerQuiz(this.answers);
      result.rawAnswers = this.answers;
      await window.SupabaseManager.saveQuizResult(result);

      if (window.confetti) {
        window.confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      this.renderResult(result, true);
    } catch (err) {
      console.error("Quiz error:", err);
      const fallback = window.GeminiService.getFallbackQuizResult(this.answers);
      this.renderResult(fallback, true);
    }
  },

  renderResult(res, scrollIntoView = true) {
    const container = document.getElementById("quiz-step-container");
    const resultBox = document.getElementById("quiz-result-section");
    if (!container || !resultBox) return;

    container.classList.add("hidden");
    resultBox.classList.remove("hidden");

    resultBox.innerHTML = `
      <div class="bg-gradient-to-br from-fuchsia-900/10 via-pink-900/5 to-purple-900/10 rounded-3xl p-6 sm:p-8 border border-fuchsia-200 dark:border-fuchsia-800/50 shadow-xl space-y-6 animate-fade-in">
        <!-- Top Badge & Match Score -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-fuchsia-100 dark:border-fuchsia-900/40 pb-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
              <i data-lucide="sparkles" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                AI Tavsiya Etgan Mutaxassislik
              </span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                ${res.primaryCareer}
              </h2>
            </div>
          </div>
          <div class="px-4 py-2 rounded-2xl bg-white dark:bg-gray-800 border border-fuchsia-200 dark:border-fuchsia-800 text-right shadow-sm">
            <div class="text-xs text-gray-500 dark:text-gray-400">Moslik darajasi</div>
            <div class="text-xl font-black text-fuchsia-600 dark:text-fuchsia-400">
              ${res.matchScore || 95}% Mos
            </div>
          </div>
        </div>

        <!-- Summary & Why for girls -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-5 border border-pink-100 dark:border-gray-800">
            <h4 class="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2 text-sm">
              <i data-lucide="heart" class="w-4 h-4 text-pink-500"></i> Nega aynan sizga mos?
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              ${res.summary}
            </p>
          </div>

          <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-5 border border-pink-100 dark:border-gray-800">
            <h4 class="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2 text-sm">
              <i data-lucide="gem" class="w-4 h-4 text-fuchsia-500"></i> Nega bu soha qizlar uchun qulay?
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              ${res.whyForGirls}
            </p>
            <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <span class="text-gray-500 dark:text-gray-400">Kutilayotgan oylik maosh:</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm">${res.salaryRange || '$800 - $3,000+'}</span>
            </div>
          </div>
        </div>

        <!-- Top Skills & First Steps -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
              <i data-lucide="check-square" class="w-4 h-4 text-pink-500"></i> O'rganilishi kerak bo'lgan asosiy ko'nikmalar:
            </h4>
            <div class="flex flex-wrap gap-2">
              ${(res.topSkills || []).map(skill => `
                <span class="px-3 py-1.5 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-950/50 border border-fuchsia-200 dark:border-fuchsia-800 text-fuchsia-700 dark:text-fuchsia-300 text-xs font-semibold">
                  ${skill}
                </span>
              `).join('')}
            </div>
          </div>

          <div>
            <h4 class="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
              <i data-lucide="compass" class="w-4 h-4 text-pink-500"></i> Sizning ilk 3 ta qadamingiz:
            </h4>
            <ul class="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              ${(res.firstSteps || []).map((step, idx) => `
                <li class="flex items-start gap-2">
                  <span class="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 font-bold flex items-center justify-center shrink-0 text-xs">
                    ${idx + 1}
                  </span>
                  <span>${step}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-fuchsia-100 dark:border-fuchsia-900/40">
          <button 
            onclick="CareerQuiz.restartQuiz()" 
            class="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:bg-white dark:hover:bg-gray-800 flex items-center gap-2"
          >
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Qaytadan test topshirish
          </button>

          <div class="flex flex-wrap gap-2">
            <button 
              onclick="CareerQuiz.openVideosForCareer('${res.primaryCareer.replace(/'/g, "\\'")}')" 
              class="px-5 py-3 rounded-xl border border-pink-300 dark:border-pink-800 text-pink-600 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/40 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
            >
              <i data-lucide="youtube" class="w-4 h-4 text-red-500"></i> Video Darslarni Ko'rish
            </button>

            <button 
              onclick="CareerQuiz.startRoadmapForCareer('${res.primaryCareer.replace(/'/g, "\\'")}')" 
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs sm:text-sm font-bold hover:opacity-95 shadow-lg shadow-pink-500/30 flex items-center gap-2"
            >
              <i data-lucide="map" class="w-4 h-4"></i> O'quv Rejasini Boshlash
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    if (scrollIntoView) {
      resultBox.scrollIntoView({ behavior: 'smooth' });
    }
  },

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.answers = {};
    const resultBox = document.getElementById("quiz-result-section");
    const container = document.getElementById("quiz-step-container");
    if (resultBox) resultBox.classList.add("hidden");
    if (container) {
      container.classList.remove("hidden");
      this.renderCurrentQuestion();
    }
  },

  startRoadmapForCareer(careerName) {
    if (window.App && window.App.switchTab) {
      window.App.switchTab('roadmap');
    }
    if (window.LearningRoadmap && window.LearningRoadmap.selectTrack) {
      window.LearningRoadmap.selectTrack(careerName);
    }
  },

  openVideosForCareer(careerName) {
    if (window.App && window.App.switchTab) {
      window.App.switchTab('videos');
    }
    const lower = (careerName || "").toLowerCase();
    let category = "all";
    if (lower.includes("ai") || lower.includes("intellekt") || lower.includes("data")) category = "ai";
    else if (lower.includes("dizayn") || lower.includes("ui") || lower.includes("ux")) category = "uiux";
    else if (lower.includes("mobil") || lower.includes("flutter")) category = "mobile";
    else if (lower.includes("backend") || lower.includes("python")) category = "backend";
    else if (lower.includes("front") || lower.includes("veb") || lower.includes("web")) category = "frontend";

    if (window.VideoHub && window.VideoHub.setCategory) {
      window.VideoHub.setCategory(category);
    }
  }
};

window.CareerQuiz = CareerQuiz;

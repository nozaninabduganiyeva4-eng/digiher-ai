/**
 * DigiHer AI — Intellektual O'yinlar & Gamification Moduli
 * 1. Inklyuziv Ta'lim O'yinlari
 * 2. AI & IT Education O'yinlari
 */

const GamesModule = {
  activeTab: "inclusive", // "inclusive" or "tech"
  inclusiveScore: 0,
  techScore: 0,

  // --- GAME 1: SHAPE LOGIC SEQUENCE (INCLUSIVE) ---
  shapeQuestions: [
    {
      sequence: ["🌸", "⭐", "🌸", "⭐", "🌸"],
      options: ["⭐", "🌸", "🍎", "🎈"],
      correct: "⭐",
      hint: "Gul va Yulduzcha navbatma-navbat kelmoqda!"
    },
    {
      sequence: ["🔴", "🟢", "🔵", "🔴", "🟢"],
      options: ["🔵", "🔴", "🟡", "🟢"],
      correct: "🔵",
      hint: "Qizil, Yashil, Ko'k ketma-ketligi takrorlanmoqda."
    },
    {
      sequence: ["🐼", "🐼", "🦊", "🐼", "🐼"],
      options: ["🦊", "🐼", "🦉", "🐰"],
      correct: "🦊",
      hint: "Ikkita Panda, bitta Tulki!"
    },
    {
      sequence: ["☀️", "🌙", "☀️", "🌙", "☀️"],
      options: ["🌙", "☀️", "⭐", "🌈"],
      correct: "🌙",
      hint: "Quyoshdan keyin Oy chiqadi!"
    }
  ],
  currentShapeIndex: 0,

  // --- GAME 2: MEMORY CARDS (INCLUSIVE) ---
  memoryCards: [
    { id: 1, symbol: "🐼", name: "Panda" },
    { id: 2, symbol: "🦊", name: "Tulki" },
    { id: 3, symbol: "🦉", name: "Boyqush" },
    { id: 4, symbol: "🌸", name: "Gul" },
    { id: 5, symbol: "💻", name: "Noutbuk" },
    { id: 6, symbol: "✨", name: "Yulduz" }
  ],
  flippedCards: [],
  matchedPairs: 0,

  // --- GAME 3: WORD PUZZLE (INCLUSIVE) ---
  wordPuzzles: [
    {
      question: "Kompyuterda matn va rasmlarni ko'rsatadigan asosiy qism nima?",
      options: ["Monitor (Ekran)", "Mishka (Sichqoncha)", "Klaviatura", "Printer"],
      correct: 0,
      icon: "monitor"
    },
    {
      question: "Qizlar uchun eng mashhur va qulay slayd tayyorlash dasturi qaysi?",
      options: ["Canva va Gamma", "Bloknot", "Kalkulyator", "Paint"],
      correct: 0,
      icon: "presentation"
    },
    {
      question: "Sun'iy intellekt (AI) insonlarga qanday yordam beradi?",
      options: ["Savollarga tez javob beradi va o'rganishga ko'maklashadi", "Faqat musiqa chaladi", "Hech narsa qilmaydi", "Kompyuterni o'chiradi"],
      correct: 0,
      icon: "sparkles"
    }
  ],
  currentWordIndex: 0,

  // --- GAME 4: BUG HUNTER (TECH) ---
  bugQuestions: [
    {
      title: "HTML Tegidagi Xatoni Toping",
      code: '<button onclik="alert(\'Salom\')">Bosish</button>',
      question: "Ushbu koddagi xato qaysi so'zda?",
      options: ["'onclik' emas, 'onclick' bo'lishi kerak", "'alert' o'rniga 'print' kerak", "'button' noto'g'ri yozilgan"],
      correct: 0,
      explanation: "JavaScript hodisasi to'g'ri nomi: 'onclick' (oxirida 'c' harfi bilan)."
    },
    {
      title: "CSS Rang Berishdagi Xato",
      code: '.sarlavha {\n  color: #ff00;\n  font-size: 16px;\n}',
      question: "HEX rang kodida nima yetishmayapti?",
      options: ["HEX rangi 6 ta belgidan iborat bo'lishi kerak (masalan: #ff0080)", "'color' o'rniga 'text-color' yozilishi shart", "font-size 'px' qabul qilmaydi"],
      correct: 0,
      explanation: "Standart to'liq HEX rang kodi 6 ta belgidan (#RRGGBB) iborat bo'ladi."
    },
    {
      title: "Python O'zgaruvchisidagi Xato",
      code: '1_ism = "Mohira"\nprint(1_ism)',
      question: "Nega bu Python kodi xatolik beradi?",
      options: ["O'zgaruvchi nomi raqam bilan boshlanishi mumkin emas", "Matn qo'shtirnoqqa olinmasligi kerak", "'print' bosh harf bilan yozilishi shart"],
      correct: 0,
      explanation: "Dasturlash tillarida o'zgaruvchi nomi harf yoki pastki chiziq (_) bilan boshlanishi shart, raqam bilan emas."
    }
  ],
  currentBugIndex: 0,

  // --- GAME 5: TECH BLITZ QUIZ (TECH) ---
  techQuiz: [
    {
      q: "Gemini va ChatGPT qanday sun'iy intellekt turiga kiradi?",
      options: ["Generativ AI (Katta til modellari - LLM)", "Robot changyutgich dasturi", "Faqat kalkulyator"],
      correct: 0
    },
    {
      q: "Veb-saytning tashqi ko'rinishi va interfeysini bezovchi texnologiya nima?",
      options: ["CSS va Tailwind CSS", "SQL ma'lumotlar bazasi", "C++ tili"],
      correct: 0
    },
    {
      q: "Dasturchilar o'z kodlarini internetda saqlash va boshqalar bilan ulashish uchun qaysi servisdan foydalanadilar?",
      options: ["GitHub", "Faqat Telegram", "Microsoft Excel"],
      correct: 0
    }
  ],
  currentTechQuizIndex: 0,

  init() {
    this.renderActiveTab();
  },

  switchTab(tab) {
    this.activeTab = tab;
    const tabButtons = document.querySelectorAll(".game-tab-btn");
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === tab) {
        btn.className = "game-tab-btn px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-md shadow-pink-500/20";
      } else {
        btn.className = "game-tab-btn px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-slate-200 dark:border-slate-700 hover:border-pink-300";
      }
    });

    const incSec = document.getElementById("games-inclusive-section");
    const techSec = document.getElementById("games-tech-section");

    if (tab === "inclusive") {
      if (incSec) incSec.classList.remove("hidden");
      if (techSec) techSec.classList.add("hidden");
      this.initShapeGame();
      this.initMemoryGame();
      this.initWordGame();
    } else {
      if (incSec) incSec.classList.add("hidden");
      if (techSec) techSec.classList.remove("hidden");
      this.initBugGame();
      this.initTechQuizGame();
    }

    if (window.lucide) window.lucide.createIcons();
  },

  renderActiveTab() {
    this.switchTab(this.activeTab);
  },

  // ================= 1. SHAPE PUZZLE =================
  initShapeGame() {
    const container = document.getElementById("game-shape-container");
    if (!container) return;

    const q = this.shapeQuestions[this.currentShapeIndex];
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-pink-100 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-fuchsia-600 uppercase">1-O'yin: Rangli Shakllar & Mantiqiy Zanjir</span>
          <span class="text-xs font-extrabold bg-pink-100 dark:bg-pink-950/60 text-pink-700 px-3 py-1 rounded-full">
            Ball: ${this.inclusiveScore} ⭐
          </span>
        </div>

        <p class="text-xs text-gray-500 dark:text-gray-400">
          Mantiqiy ketma-ketlikka qarang va bo'sh joyga (❓) mos keluvchi belgini tanlang!
        </p>

        <!-- Sequence Row -->
        <div class="flex flex-wrap items-center justify-center gap-3 py-6 bg-pink-50/50 dark:bg-slate-800/50 rounded-2xl border border-pink-100 dark:border-slate-700 text-3xl sm:text-4xl">
          ${q.sequence.map(s => `
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center transform hover:scale-105 transition-transform">
              ${s}
            </div>
          `).join('')}
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-fuchsia-100 dark:bg-fuchsia-950/60 border-2 border-dashed border-fuchsia-500 text-fuchsia-600 flex items-center justify-center font-bold text-2xl animate-pulse">
            ❓
          </div>
        </div>

        <!-- Options -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          ${q.options.map((opt, i) => `
            <button 
              onclick="GamesModule.checkShapeAnswer('${opt}')"
              class="py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-fuchsia-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-2xl font-bold transition-all transform active:scale-95 shadow-sm"
            >
              ${opt}
            </button>
          `).join('')}
        </div>

        <div id="shape-feedback" class="text-center text-xs font-bold min-h-[20px] pt-1"></div>
      </div>
    `;
  },

  checkShapeAnswer(selected) {
    const q = this.shapeQuestions[this.currentShapeIndex];
    const feedback = document.getElementById("shape-feedback");
    
    if (selected === q.correct) {
      this.inclusiveScore += 10;
      if (feedback) feedback.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400">Barakalla, to'g'ri topdingiz! 🎉 (+10 ball)</span>`;
      
      if (window.confetti) {
        window.confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
      }

      setTimeout(() => {
        this.currentShapeIndex = (this.currentShapeIndex + 1) % this.shapeQuestions.length;
        this.initShapeGame();
      }, 900);
    } else {
      if (feedback) feedback.innerHTML = `<span class="text-pink-600 dark:text-pink-400">Yana bir bor urinib ko'ring! Maslahat: ${q.hint}</span>`;
    }
  },

  // ================= 2. MEMORY CARDS =================
  initMemoryGame() {
    const container = document.getElementById("game-memory-container");
    if (!container) return;

    // Duplicate and shuffle
    let deck = [...this.memoryCards, ...this.memoryCards];
    deck.sort(() => 0.5 - Math.random());

    this.flippedCards = [];
    this.matchedPairs = 0;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-pink-100 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-fuchsia-600 uppercase">2-O'yin: Xotira Kartalari (Juftlikni Toping)</span>
          <span class="text-xs text-gray-500" id="memory-counter">0 / 6 juftlik topildi</span>
        </div>

        <p class="text-xs text-gray-500 dark:text-gray-400">
          Kartalarni bosing va bir xil juftliklarni topib xotirangizni mustahkamlang!
        </p>

        <div class="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3 py-2" id="memory-grid">
          ${deck.map((card, idx) => `
            <div 
              id="mem-card-${idx}"
              onclick="GamesModule.flipCard(${idx}, '${card.symbol}', ${card.id})"
              class="aspect-square rounded-2xl bg-gradient-to-tr from-pink-100 to-fuchsia-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-2xl sm:text-3xl cursor-pointer border-2 border-transparent hover:border-pink-400 transition-all transform active:scale-90 shadow-sm select-none"
            >
              ❓
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  flipCard(idx, symbol, cardId) {
    if (this.flippedCards.length >= 2) return;
    const cardElem = document.getElementById(`mem-card-${idx}`);
    if (!cardElem || cardElem.classList.contains("matched") || this.flippedCards.some(c => c.idx === idx)) return;

    cardElem.textContent = symbol;
    cardElem.classList.add("bg-white", "dark:bg-slate-900", "border-fuchsia-500", "scale-105");

    this.flippedCards.push({ idx, symbol, cardId, elem: cardElem });

    if (this.flippedCards.length === 2) {
      const [c1, c2] = this.flippedCards;
      if (c1.cardId === c2.cardId) {
        c1.elem.classList.add("matched", "border-emerald-500", "bg-emerald-50");
        c2.elem.classList.add("matched", "border-emerald-500", "bg-emerald-50");
        this.matchedPairs++;
        this.inclusiveScore += 15;

        const counter = document.getElementById("memory-counter");
        if (counter) counter.textContent = `${this.matchedPairs} / 6 juftlik topildi!`;

        if (window.confetti) {
          window.confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
        }

        this.flippedCards = [];
        if (this.matchedPairs === 6) {
          setTimeout(() => alert("Tabriklaymiz! Barcha juftliklarni topdingiz! 🏆✨"), 400);
        }
      } else {
        setTimeout(() => {
          c1.elem.textContent = "❓";
          c2.elem.textContent = "❓";
          c1.elem.classList.remove("border-fuchsia-500", "scale-105");
          c2.elem.classList.remove("border-fuchsia-500", "scale-105");
          this.flippedCards = [];
        }, 800);
      }
    }
  },

  // ================= 3. WORD PUZZLE =================
  initWordGame() {
    const container = document.getElementById("game-word-container");
    if (!container) return;

    const q = this.wordPuzzles[this.currentWordIndex];
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-pink-100 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-fuchsia-600 uppercase">3-O'yin: Qiziqarli Savol-Javob</span>
          <span class="text-xs font-semibold text-gray-500">${this.currentWordIndex + 1} / ${this.wordPuzzles.length}</span>
        </div>

        <h4 class="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white leading-relaxed">
          ${q.question}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          ${q.options.map((opt, i) => `
            <button 
              onclick="GamesModule.checkWordAnswer(${i})"
              class="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-pink-400 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 transition-all flex items-center justify-between shadow-sm"
            >
              <span>${opt}</span>
              <span class="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 text-xs font-bold flex items-center justify-center shrink-0">
                ${['A', 'B', 'C', 'D'][i]}
              </span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkWordAnswer(idx) {
    const q = this.wordPuzzles[this.currentWordIndex];
    if (idx === q.correct) {
      this.inclusiveScore += 10;
      if (window.confetti) window.confetti({ particleCount: 25, spread: 50 });
      alert("Ajoyib javob! To'g'ri topdingiz! 🌟");
      this.currentWordIndex = (this.currentWordIndex + 1) % this.wordPuzzles.length;
      this.initWordGame();
      this.initShapeGame(); // update score badge
    } else {
      alert("Qayta o'ylab ko'ring! 🌸");
    }
  },

  // ================= 4. BUG HUNTER (TECH) =================
  initBugGame() {
    const container = document.getElementById("game-bug-container");
    if (!container) return;

    const q = this.bugQuestions[this.currentBugIndex];
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-pink-100 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-fuchsia-600 uppercase">⚡ Bug Hunter — Koddagi Xatoni Toping</span>
          <span class="text-xs font-extrabold bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-700 px-3 py-1 rounded-full">
            IT Ball: ${this.techScore} 🎯
          </span>
        </div>

        <h4 class="font-bold text-sm text-gray-900 dark:text-white">${q.title}</h4>

        <!-- Code Box -->
        <pre class="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800"><code>${q.code}</code></pre>

        <p class="text-xs font-semibold text-gray-700 dark:text-gray-300">${q.question}</p>

        <div class="space-y-2 pt-1">
          ${q.options.map((opt, i) => `
            <button 
              onclick="GamesModule.checkBugAnswer(${i})"
              class="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-fuchsia-500 text-left text-xs font-semibold text-gray-800 dark:text-gray-200 transition-all flex items-center justify-between shadow-sm"
            >
              <span>${opt}</span>
              <i data-lucide="crosshair" class="w-4 h-4 text-gray-400"></i>
            </button>
          `).join('')}
        </div>

        <div id="bug-feedback" class="text-xs font-bold min-h-[18px]"></div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  checkBugAnswer(idx) {
    const q = this.bugQuestions[this.currentBugIndex];
    const fb = document.getElementById("bug-feedback");

    if (idx === q.correct) {
      this.techScore += 15;
      if (fb) fb.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400">To'g'ri! ${q.explanation} (+15 ball) 🚀</span>`;
      if (window.confetti) window.confetti({ particleCount: 30, spread: 60 });

      setTimeout(() => {
        this.currentBugIndex = (this.currentBugIndex + 1) % this.bugQuestions.length;
        this.initBugGame();
      }, 1400);
    } else {
      if (fb) fb.innerHTML = `<span class="text-red-500">Xato tanlov. Kodni sinchiklab qayta ko'rib chiqing! 🔍</span>`;
    }
  },

  // ================= 5. TECH BLITZ QUIZ (TECH) =================
  initTechQuizGame() {
    const container = document.getElementById("game-techquiz-container");
    if (!container) return;

    const q = this.techQuiz[this.currentTechQuizIndex];
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-pink-100 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-fuchsia-600 uppercase">🧠 AI & IT Intellektual Viktorinasi</span>
          <span class="text-xs text-gray-500">${this.currentTechQuizIndex + 1} / ${this.techQuiz.length}</span>
        </div>

        <h4 class="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
          ${q.q}
        </h4>

        <div class="space-y-2 pt-1">
          ${q.options.map((opt, i) => `
            <button 
              onclick="GamesModule.checkTechQuizAnswer(${i})"
              class="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-pink-400 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 transition-all flex items-center justify-between"
            >
              <span>${opt}</span>
              <span class="text-xs text-pink-600 font-bold">Tanlash →</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkTechQuizAnswer(idx) {
    const q = this.techQuiz[this.currentTechQuizIndex];
    if (idx === q.correct) {
      this.techScore += 10;
      if (window.confetti) window.confetti({ particleCount: 30, spread: 60 });
      alert("Ajoyib bilim! To'g'ri topdingiz! 💡✨");
      this.currentTechQuizIndex = (this.currentTechQuizIndex + 1) % this.techQuiz.length;
      this.initTechQuizGame();
      this.initBugGame(); // update score
    } else {
      alert("Kechirasiz, noto'g'ri variant. Qaytadan urinib ko'ring! 🔄");
    }
  }
};

window.GamesModule = GamesModule;

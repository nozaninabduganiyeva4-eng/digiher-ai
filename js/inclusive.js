/**
 * DigiHer AI — Inklyuziv Ta'lim & Virtual Hayvon Mentorlar Moduli
 */

const InclusiveModule = {
  selectedAnimal: "panda",
  voiceEnabled: true,
  chatHistory: [],
  isThinking: false,

  animals: {
    panda: {
      id: "panda",
      name: "Panda Pomi",
      emoji: "🐼",
      title: "Mayin va Mehribon Ustoz",
      greeting: "Salom do'stginam! Men Panda Pomi bo'laman. Men juda sabrli va quvnoqman. Menga 'Ustoz, ...' deb murojaat qilsang, senga dunyodagi eng qiziq narsalarni o'rgataman! 🌸",
      avatarBg: "from-emerald-400 to-teal-500",
      elevenVoiceId: "EXAVITQu4vr4xnSDxMaL", // Sarah (reassuring, gentle)
      voicePitch: 1.1,
      voiceRate: 0.95
    },
    tulki: {
      id: "tulki",
      name: "Zukko Tulki",
      emoji: "🦊",
      title: "Epchil va Topqir Ustoz",
      greeting: "Salom-salom! Men Zukko Tulkivoyman! Har qanday topishmoq va yangi texnologiyalarni tez o'rganamiz! Meni chaqirish uchun 'Ustoz' deb so'z boshlashni unutmang! ✨",
      avatarBg: "from-amber-400 to-orange-500",
      elevenVoiceId: "FGY2WhTYpPnrIDTdsKH5", // Laura (enthusiast, quirky)
      voicePitch: 1.2,
      voiceRate: 1.0
    },
    boyqush: {
      id: "boyqush",
      name: "Dono Boyqush",
      emoji: "🦉",
      title: "Bilimdon va Vazmin Ustoz",
      greeting: "Xush ko'rdik! Men Dono Boyqushman. Kitoblar, ilm-fan va kompyuter sirlarini senga erinmay tushuntirib beraman. Menga 'Ustoz' deb savol bering! 📚",
      avatarBg: "from-indigo-400 to-purple-500",
      elevenVoiceId: "JBFqnCBsd6RMkjVDRZzb", // George (warm storyteller)
      voicePitch: 0.9,
      voiceRate: 0.9
    },
    delfin: {
      id: "delfin",
      name: "Delfin Dilya",
      emoji: "🐬",
      title: "Quvnoq va Chaqqon Ustoz",
      greeting: "Salom! Men sho'x va quvnoq Delfin Dilyaman! O'yinlar, ijodkorlik va slaydlar tayyorlashni birga o'rganamiz! Faqat 'Ustoz' deb murojaat qilish esdan chiqmasin! 🌊",
      avatarBg: "from-cyan-400 to-blue-500",
      elevenVoiceId: "cgSgspJ2msm6clMCkdW9", // Jessica (playful, bright)
      voicePitch: 1.15,
      voiceRate: 1.05
    },
    quyoncha: {
      id: "quyoncha",
      name: "Quyoncha Bonu",
      emoji: "🐰",
      title: "Shirinso'z va Do'stona Ustoz",
      greeting: "Assalomu alaykum! Men Quyoncha Bonuman! Birgalikda dars qilamiz, o'yinlar o'ynaymiz va ajoyib taqdimotlar yasaymiz! Meni 'Ustoz' deb chaqiring! 🥕",
      avatarBg: "from-pink-400 to-rose-500",
      elevenVoiceId: "pFZP5JQG7iQjIQuC4Bku", // Lily (velvety, sweet)
      voicePitch: 1.25,
      voiceRate: 1.0
    }
  },

  // Presentation / Slide creation curated resources in Uzbek
  slideTutorials: [
    {
      title: "Canva orqali noldan chiroyli slayd va taqdimot tayyorlash",
      channel: "O'zbek tilidagi video dars",
      url: "https://www.youtube.com/watch?v=c-_s0oB9Y-g",
      desc: "Tayyor shablonlar bilan 10 daqiqada ajoyib slaydlar yasash"
    },
    {
      title: "Gamma AI — Sun'iy intellekt yordamida 1 daqiqada slayd yasash",
      channel: "AI Darslar O'zbekiston",
      url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
      desc: "Matnni yozasiz, AI sizga to'liq slayd qilib beradi"
    },
    {
      title: "PowerPoint asoslari va qizlar uchun taqdimot sirlari",
      channel: "IT Ta'lim",
      url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
      desc: "Maktab va litsey uchun sifatli taqdimotlar"
    }
  ],

  slideTools: [
    {
      name: "Gamma App (AI Slayd)",
      desc: "Mavzuni yozasiz — AI rasmlari va matnlari bilan tayyor slayd yaratadi!",
      url: "https://gamma.app",
      badge: "AI Sehrgar ✨",
      bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800"
    },
    {
      name: "Canva Presentation",
      desc: "Minglab bepul, qizlarga mos rang-barang taqdimot shablonlari.",
      url: "https://www.canva.com",
      badge: "Oson & Chiroyli 🎨",
      bg: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800"
    },
    {
      name: "Google Slides",
      desc: "Do'stlar va jamoa bilan birgalikda onlayn slayd tayyorlash vositasi.",
      url: "https://slides.google.com",
      badge: "Bepul & Onlayn 📑",
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800"
    }
  ],

  init() {
    this.loadSavedAnimal();
    this.renderAnimalSelector();
    this.renderInclusiveChat();
  },

  loadSavedAnimal() {
    const saved = localStorage.getItem("digiher_selected_animal");
    if (saved && this.animals[saved]) {
      this.selectedAnimal = saved;
    }
  },

  selectAnimal(animalId) {
    if (!this.animals[animalId]) return;
    this.selectedAnimal = animalId;
    localStorage.setItem("digiher_selected_animal", animalId);
    this.renderAnimalSelector();
    
    // Announce with voice
    const animal = this.animals[animalId];
    const profile = window.App ? window.App.getUserProfile() : null;
    const userName = profile?.name ? profile.name.split(' ')[0] : "do'stginam";
    
    const welcomeMsg = `Assalomu alaykum ${userName}! Men sizning tanlagan ustozingiz — ${animal.name}man! ${animal.greeting}`;
    this.addChatMessage("mentor", welcomeMsg);
    this.speakText(welcomeMsg);

    if (window.confetti) {
      window.confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    }
  },

  renderAnimalSelector() {
    const container = document.getElementById("animal-selector-grid");
    if (!container) return;

    container.innerHTML = Object.values(this.animals).map(a => {
      const isSelected = a.id === this.selectedAnimal;
      return `
        <div 
          onclick="InclusiveModule.selectAnimal('${a.id}')"
          class="cursor-pointer rounded-3xl p-4 sm:p-5 border-2 transition-all transform hover:-translate-y-1 ${
            isSelected 
              ? 'border-fuchsia-500 bg-white dark:bg-slate-900 shadow-xl ring-4 ring-pink-500/20' 
              : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-pink-300'
          }"
        >
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${a.avatarBg} flex items-center justify-center text-3xl sm:text-4xl shadow-md mx-auto mb-3">
            ${a.emoji}
          </div>
          <div class="text-center">
            <div class="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
              ${a.name}
              ${isSelected ? '<span class="text-pink-600 text-xs font-black">✓ Faol</span>' : ''}
            </div>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">${a.title}</p>
          </div>
        </div>
      `;
    }).join('');

    // Update active animal badge in chat header
    const currentAnimal = this.animals[this.selectedAnimal];
    const badge = document.getElementById("active-animal-badge");
    if (badge && currentAnimal) {
      badge.innerHTML = `
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr ${currentAnimal.avatarBg} flex items-center justify-center text-xl shadow-md">
          ${currentAnimal.emoji}
        </div>
        <div>
          <div class="font-bold text-sm text-gray-900 dark:text-white">${currentAnimal.name} (AI Ustoz)</div>
          <p class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">«Ustoz» deb murojaat qiling</p>
        </div>
      `;
    }
  },

  renderInclusiveChat() {
    const container = document.getElementById("inclusive-chat-messages");
    if (!container) return;

    if (this.chatHistory.length === 0) {
      const animal = this.animals[this.selectedAnimal];
      const profile = window.App ? window.App.getUserProfile() : null;
      const userName = profile?.name ? profile.name.split(' ')[0] : "aziz do'stim";

      this.chatHistory.push({
        role: "mentor",
        text: `Salom, ${userName}! 🌸 Men sizning ustozingiz **${animal.name}**man!\n\nMen bilan gaplashish uchun xabaringizda albatta **«Ustoz»** so'zini ishlating.\n\nMasalan:\n* «Ustoz, slayd yaratishni o'rgating!»\n* «Ustoz, bugun qanday qiziqarli narsani o'rganamiz?»\n* «Ustoz, kompyuter qanday ishlaydi?»`
      });
    }

    container.innerHTML = this.chatHistory.map(msg => {
      const isUser = msg.role === "user";
      const animal = this.animals[this.selectedAnimal];
      const parsedText = window.marked ? window.marked.parse(msg.text) : msg.text;

      return `
        <div class="flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in">
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-lg shadow-sm ${
            isUser 
              ? 'bg-gradient-to-tr from-fuchsia-600 to-pink-600 text-white' 
              : `bg-gradient-to-tr ${animal.avatarBg} text-white`
          }">
            ${isUser ? '👧' : animal.emoji}
          </div>

          <div class="max-w-[85%] rounded-3xl p-4 text-xs sm:text-sm ${
            isUser 
              ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-tr-none shadow-md' 
              : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-pink-100 dark:border-slate-700 rounded-tl-none shadow-sm'
          }">
            <div class="prose dark:prose-invert prose-sm max-w-none">
              ${parsedText}
            </div>

            ${!isUser ? `
              <div class="mt-2.5 pt-2 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-end">
                <button 
                  onclick="InclusiveModule.speakText('${msg.text.replace(/'/g, "\\'").replace(/\n/g, ' ')}')"
                  class="text-[11px] text-fuchsia-600 dark:text-pink-400 font-bold hover:underline flex items-center gap-1"
                  title="Ovoz chiqarib o'qish"
                >
                  <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Ovozli eshitish
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  },

  addChatMessage(role, text) {
    this.chatHistory.push({ role, text });
    this.renderInclusiveChat();
  },

  async handleUserMessage(customInput = null) {
    if (this.isThinking) return;

    const inputElem = document.getElementById("inclusive-chat-input");
    const text = customInput || (inputElem ? inputElem.value.trim() : "");
    if (!text) return;

    if (inputElem) inputElem.value = "";

    // Add user message
    this.addChatMessage("user", text);

    const animal = this.animals[this.selectedAnimal];
    const profile = window.App ? window.App.getUserProfile() : null;
    const userName = profile?.name ? profile.name.split(' ')[0] : "do'stginam";

    // 1. Strict Gatekeeper: Check if user said "Ustoz"
    const lower = text.toLowerCase();
    const hasUstoz = lower.includes("ustoz") || lower.includes("ustozjon") || lower.includes("ustozim");

    if (!hasUstoz) {
      const promptReminder = `Mening aziz do'stim ${userName}! 🌸\n\nMen senga xursandchilik bilan yordam berishim uchun gapingizda albatta **«Ustoz»** so'zini ishlating.\n\n*Masalan:* **«Ustoz, ${text}»** deb yozsang, darhol javob beraman! 😊✨`;
      setTimeout(() => {
        this.addChatMessage("mentor", promptReminder);
        this.speakText(`Mening aziz do'stim ${userName}! Meni chaqirish uchun gapingizda albatta Ustoz so'zini ishlating.`);
      }, 500);
      return;
    }

    // 2. Specific feature check: Slayd / Taqdimot / Presentation
    const isSlideRequest = lower.includes("slayd") || lower.includes("taqdimot") || lower.includes("presentation") || lower.includes("powerpoint") || lower.includes("gamma") || lower.includes("canva");

    this.isThinking = true;
    const sendBtn = document.getElementById("btn-inclusive-send");
    if (sendBtn) sendBtn.disabled = true;

    // Show typing state
    const container = document.getElementById("inclusive-chat-messages");
    const typingId = "inclusive-typing-indicator";
    if (container) {
      container.innerHTML += `
        <div id="${typingId}" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr ${animal.avatarBg} text-white flex items-center justify-center text-lg">
            ${animal.emoji}
          </div>
          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-pink-100 dark:border-slate-700 text-xs text-gray-500 animate-pulse">
            ${animal.name} o'ylamoqda...
          </div>
        </div>
      `;
      container.scrollTop = container.scrollHeight;
    }

    try {
      let replyText = "";

      if (isSlideRequest) {
        // Specific user scenario: recommends Uzbek video tutorials, then presentation tools, then AI tips!
        replyText = `Ajoyib fikr, ${userName}! 👏 Slayd va taqdimot tayyorlash — o'z g'oyalaringizni hammaga ko'rsatishning eng zo'r yo'lidir!

### 1-Qadam: O'zbek tilidagi Sifatli Video Darslar 📺
Avvalo ushbu qisqa video qo'llanmalarni ko'rib chiqsangiz, slayd yaratish sirlarini bilib olasiz:
* 🎥 **Canva Darsi:** [Canva orqali noldan slayd tayyorlash](${this.slideTutorials[0].url}) — juda oson va chiroyli shablonlar bilan.
* 🎥 **Gamma AI:** [Sun'iy intellekt yordamida 1 daqiqada slayd yasash](${this.slideTutorials[1].url}) — matn yozasiz, u to'liq slayd qilib beradi.
* 🎥 **PowerPoint Asoslari:** [Maktab va tanlovlar uchun slaydlar](${this.slideTutorials[2].url}).

---

### 2-Qadam: Slayd Yaratishning Eng Zo'r Vositalari 🛠️
Endi bevosita o'zingiz sinab ko'rishingiz mumkin bo'lgan eng yaxshi vositalar:
1. 🚀 **[Gamma App (gamma.app)](https://gamma.app)** — Sun'iy intellekt orqali atigi 1 daqiqada taqdimot yaratadi!
2. 🎨 **[Canva Presentations (canva.com)](https://www.canva.com)** — Tayyor rang-barang qizlar uchun shablonlar.
3. 📑 **[Google Slides (slides.google.com)](https://slides.google.com)** — Bepul va brauzerning o'zida do'stlar bilan birgalikda ishlash.

💡 *Ustozingizdan maslahat:* Slaydda matn kam, rasmlar va g'oyalar ko'p bo'lsa, uni hamma maroq bilan tomosha qiladi! Qaysi mavzuda slayd qilmoqchisiz, aytib bering?`;
      } else {
        // General query answered by Gemini using the Animal Mentor persona
        const systemPrompt = `Sen DigiHer AI platformasining Inklyuziv ta'lim bo'limidagi virtual AI ustoz — "${animal.name}" (${animal.title}) san!
Foydalanuvchi qizning ismi: "${userName}".
Sening xaraktering:
1. Sen juda do'stona, sodda, mehribon va quvnoq tilda, sof o'zbek tilida gapirasan.
2. Har bir jumlada mehr, rag'bat va ishonch tuyg'usi bo'lsin.
3. Qiyin tushunchalarni ham oddiy ertaknamo yoki qiziqarli misollar bilan tushuntir.
4. Foydalanuvchiga ismi bilan ("${userName}jon", "${userName}") murojaat qil.
5. Bolalar va o'quvchilar uchun xavfsiz, motivatsion va quvnoq javob ber.`;

        replyText = await window.GeminiService.generateText(text, systemPrompt);
      }

      const indicator = document.getElementById(typingId);
      if (indicator) indicator.remove();

      this.addChatMessage("mentor", replyText);
      this.speakText(replyText.substring(0, 180));
    } catch (err) {
      console.error("Inclusive mentor error:", err);
      const indicator = document.getElementById(typingId);
      if (indicator) indicator.remove();

      const fallback = `Barakalla, ${userName}! 🌸 Men sizning savolingizni eshitdim. Keling, birgalikda o'rganamiz va ajoyib yangi narsalarni kashf qilamiz! Meni yana chaqiring!`;
      this.addChatMessage("mentor", fallback);
    } finally {
      this.isThinking = false;
      if (sendBtn) sendBtn.disabled = false;
    }
  },

  currentAudio: null,

  async speakText(text) {
    if (!this.voiceEnabled) return;

    // Stop ongoing audio or Web Speech
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    const cleanText = text.replace(/[*_#`[\]()]/g, ' ').replace(/https?:\/\/\S+/g, '').trim();
    if (!cleanText) return;

    const animal = this.animals[this.selectedAnimal];
    const voiceId = animal?.elevenVoiceId || 'EXAVITQu4vr4xnSDxMaL';

    // 1. Try ElevenLabs TTS endpoint (Multilingual model with natural Uzbek pronunciation)
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText.substring(0, 300),
          voiceId: voiceId,
          modelId: 'eleven_multilingual_v2'
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;
        audio.play().catch(e => console.warn("ElevenLabs audio play prevented:", e));
        return;
      }
    } catch (err) {
      console.warn("ElevenLabs endpoint not available, falling back to Web Speech:", err);
    }

    // 2. Fallback to browser Web Speech API
    if (window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 250));
        utterance.pitch = animal?.voicePitch || 1.1;
        utterance.rate = animal?.voiceRate || 1.0;
        utterance.lang = "uz-UZ";
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Speech synthesis unavailable:", e);
      }
    }
  },

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    const btn = document.getElementById("btn-toggle-voice");
    if (btn) {
      btn.innerHTML = this.voiceEnabled 
        ? `<i data-lucide="volume-2" class="w-4 h-4 text-emerald-500"></i> Ovozli: Yoqilgan`
        : `<i data-lucide="volume-x" class="w-4 h-4 text-gray-400"></i> Ovozli: O'chirilgan`;
      if (window.lucide) window.lucide.createIcons();
    }
  }
};

window.InclusiveModule = InclusiveModule;

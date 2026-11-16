/**
 * DigiHer AI — AI Mentor & Mini-Project Studio Module
 */

const ProjectMentor = {
  activeProject: null,
  chatHistory: [],
  isGenerating: false,

  curatedProjects: [
    {
      id: "health-app",
      title: "Ayollar Salomatligi va Maslahat Ilovasi",
      badge: "Mashhur",
      level: "Boshlang'ich",
      tech: ["HTML5", "Tailwind CSS", "JavaScript"],
      description: "Qizlar uchun kunlik suv ichish, mashqlar va salomatlik odatlarini kuzatib boruvchi qulay va chiroyli veb-ilova.",
      starterPrompt: "Salom, men 'Ayollar Salomatligi va Maslahat Ilovasi' mini-loyihasini boshlamoqchiman. Menga loyihaning arxitekturasi va HTML/CSS/JS kodining boshlang'ich qismini ber va qadam-baqadam yo'l-yo'riq ko'rsat.",
      defaultCode: `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <title>HealthHer — Salomatlik Kundaligi</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-tr from-pink-50 to-purple-50 min-h-screen p-6 font-sans">
  <div class="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6 text-center">
    <div class="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
      🌸
    </div>
    <h1 class="text-2xl font-bold text-gray-800">HealthHer</h1>
    <p class="text-xs text-gray-500 mt-1">Kunlik salomatlik va odatlar kundaligi</p>

    <div class="mt-6 bg-pink-50/70 p-4 rounded-2xl">
      <div class="text-sm font-semibold text-pink-700">Bugungi Suv Normasi</div>
      <div id="water-count" class="text-3xl font-extrabold text-pink-600 mt-1">0 / 8 stakan</div>
      <button onclick="addWater()" class="mt-3 px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow-md">
        + 1 Stakan Qo'shish
      </button>
    </div>
  </div>

  <script>
    let cups = 0;
    function addWater() {
      if (cups < 8) {
        cups++;
        document.getElementById('water-count').innerText = cups + ' / 8 stakan';
        if (cups === 8) alert('Tabriklaymiz! Kunlik suv normasini bajardingiz! 💧✨');
      }
    }
  </script>
</body>
</html>`
    },
    {
      id: "smart-budget",
      title: "Aqlli Xarajatlar va Shaxsiy Byudjet",
      badge: "Amaliy",
      level: "Boshlang'ich - O'rta",
      tech: ["JavaScript", "Chart.js", "LocalStorage"],
      description: "Talaba qizlar uchun o'z oylik stipendiyasi va xarajatlarini nazorat qiluvchi, tejash maqsadlarini ko'rsatuvchi interaktiv veb-kalkulyator.",
      starterPrompt: "Salom! Men talaba qizlar uchun 'Aqlli Shaxsiy Byudjet' veb-kalkulyatorini yaratmoqchiman. Menga kirim-chiqimlarni hisoblovchi toza JavaScript kodini yozib ber.",
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-6 font-sans">
  <div class="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
    <h2 class="text-xl font-bold text-gray-800">💰 DigiHer Budget</h2>
    <div class="mt-4 flex gap-2">
      <input id="item" placeholder="Nomi (masalan: Kitob)" class="border p-2 rounded text-xs w-full" />
      <input id="amount" type="number" placeholder="Summa" class="border p-2 rounded text-xs w-28" />
      <button onclick="addExpense()" class="bg-fuchsia-600 text-white px-4 rounded text-xs font-bold">+</button>
    </div>
    <ul id="list" class="mt-4 space-y-2 text-xs"></ul>
    <div class="mt-4 pt-3 border-t font-bold text-sm text-gray-700">
      Jami xarajat: <span id="total" class="text-fuchsia-600">0</span> so'm
    </div>
  </div>
  <script>
    let total = 0;
    function addExpense() {
      const item = document.getElementById('item').value;
      const amount = Number(document.getElementById('amount').value);
      if(!item || !amount) return;
      total += amount;
      document.getElementById('total').innerText = total.toLocaleString();
      const li = document.createElement('li');
      li.className = 'flex justify-between border-b pb-1 text-gray-600';
      li.innerHTML = '<span>' + item + '</span><span class="font-bold">' + amount.toLocaleString() + ' so\\'m</span>';
      document.getElementById('list').appendChild(li);
      document.getElementById('item').value = '';
      document.getElementById('amount').value = '';
    }
  </script>
</body>
</html>`
    },
    {
      id: "ai-vision-eco",
      title: "EcoGirl: Chiqindilarni Saralovchi AI Tanish",
      badge: "AI & ML",
      level: "O'rta daraja",
      tech: ["Teachable Machine", "TensorFlow.js", "Webcam"],
      description: "Veb-kamera orqali plastik, qog'oz va shisha chiqindilarini avtomatik taniydigan va saralashni o'rgatuvchi ekologik sun'iy intellekt modeli.",
      starterPrompt: "Salom! Men 'EcoGirl AI' loyihasini yaratmoqchiman. Teachable Machine va veb-kamera orqali chiqindilarni tasniflash (classification) kodini qanday ulashni o'rgat.",
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-emerald-50 p-6 text-center font-sans">
  <div class="max-w-md mx-auto bg-white p-6 rounded-3xl shadow-xl">
    <div class="text-4xl mb-2">🌱</div>
    <h2 class="text-xl font-bold text-emerald-800">EcoGirl AI Classifier</h2>
    <p class="text-xs text-gray-500 mt-1">Ekologik sun'iy intellekt yordamchisi</p>
    <div class="my-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
      <div class="text-xs font-semibold text-emerald-700">Kamera orqali chiqindi turini aniqlash</div>
      <div class="mt-3 text-sm font-bold text-emerald-900" id="result-label">Kutish rejimida...</div>
    </div>
    <button onclick="document.getElementById('result-label').innerText = '♻️ Qayta ishlanadigan QOG\\\'OZ (96% aniqlik)'" class="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow">
      Namuna Tasvirni Tahlil Qilish
    </button>
  </div>
</body>
</html>`
    },
    {
      id: "tech-portfolio",
      title: "Girls In Tech Portfolio Sahifasi",
      badge: "Karyera",
      level: "Boshlang'ich",
      tech: ["HTML5", "Tailwind CSS", "Lucide Icons"],
      description: "Xalqaro IT grantlari, Technovation yoki ishga kirish uchun o'zingizning barcha yutuqlaringiz va loyihalaringizni ko'rsatuvchi zamonaviy shaxsiy veb-sayt.",
      starterPrompt: "Salom! Men o'zim uchun nufuzli IT grantlariga topshirishda kerak bo'ladigan zamonaviy 'Girls in Tech' portfolio veb-saytini yaratmoqchiman. Menga chiroyli shablon kodini yozib ber.",
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white font-sans p-6 min-h-screen">
  <div class="max-w-2xl mx-auto space-y-6">
    <div class="text-center">
      <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-fuchsia-500 to-pink-500 mx-auto flex items-center justify-center text-3xl font-bold shadow-lg shadow-pink-500/30">
        👩‍💻
      </div>
      <h1 class="text-2xl font-bold mt-4">Malika Karimova</h1>
      <p class="text-pink-400 text-sm font-medium">Aspiring AI Engineer & Technovation Alumna</p>
    </div>
    <div class="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
      <h3 class="font-bold text-sm text-pink-300 mb-2">🚀 Mening Loyihalarim</h3>
      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="bg-slate-900 p-3 rounded-xl border border-slate-700">
          <div class="font-bold">HealthHer App</div>
          <div class="text-gray-400 mt-1">Mobil salomatlik yordamchisi</div>
        </div>
        <div class="bg-slate-900 p-3 rounded-xl border border-slate-700">
          <div class="font-bold">EcoGirl AI</div>
          <div class="text-gray-400 mt-1">Chiqindilarni saralovchi neyron tarmoq</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
    }
  ],

  init() {
    this.renderProjectsList();
    this.initChat();
    this.initEditor();
  },

  renderProjectsList() {
    const container = document.getElementById("mentor-projects-grid");
    if (!container) return;

    container.innerHTML = this.curatedProjects.map(p => `
      <div class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-900 shadow-sm transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-700 dark:text-fuchsia-300">
              ${p.badge}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
              ${p.level}
            </span>
          </div>

          <h4 class="font-bold text-gray-900 dark:text-white text-base">
            ${p.title}
          </h4>

          <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
            ${p.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mt-3">
            ${p.tech.map(t => `
              <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-medium">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
          <button 
            onclick="ProjectMentor.loadProjectIntoEditor('${p.id}')"
            class="px-3.5 py-1.5 rounded-xl border border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400 text-xs font-semibold hover:bg-pink-50 dark:hover:bg-pink-950/30 flex items-center gap-1.5"
          >
            <i data-lucide="play" class="w-3.5 h-3.5"></i> Kodni Sinash
          </button>

          <button 
            onclick="ProjectMentor.askMentorAboutProject('${p.id}')"
            class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-sm flex items-center gap-1.5"
          >
            <i data-lucide="message-square" class="w-3.5 h-3.5"></i> AI Mentor
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  initChat() {
    this.chatHistory = window.SupabaseManager.getChatHistory();
    if (this.chatHistory.length === 0) {
      // Add initial greeting
      this.chatHistory.push({
        role: "model",
        text: "Assalomu alaykum! Men sizning **DigiHer AI Ustozi**zman. 🌸\n\nDasturlashni o'rganish, qiziqarli mini-loyihalar yaratish, koddagi xatolarni topish yoki xalqaro grantlarga tayyorlanishda sizga yordam berishdan mamnunman!\n\nBugun qanday loyiha yaratmoqchisiz yoki qaysi savolingizga javob izlayapsiz?"
      });
    }
    this.renderChatMessages();
  },

  renderChatMessages() {
    const container = document.getElementById("mentor-chat-messages");
    if (!container) return;

    container.innerHTML = this.chatHistory.map(msg => {
      const isUser = msg.role === "user";
      const htmlContent = window.marked ? window.marked.parse(msg.text) : msg.text;

      return `
        <div class="flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in">
          <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold ${
            isUser 
              ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-md' 
              : 'bg-gradient-to-tr from-fuchsia-600 to-pink-500 shadow-md shadow-pink-500/20'
          }">
            ${isUser ? '<i data-lucide="user" class="w-4 h-4"></i>' : '<i data-lucide="sparkles" class="w-4 h-4"></i>'}
          </div>

          <div class="max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm ${
            isUser 
              ? 'bg-fuchsia-600 text-white rounded-tr-none' 
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700/80 rounded-tl-none shadow-sm'
          } prose dark:prose-invert prose-sm max-w-none">
            ${htmlContent}
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  },

  async sendMessage(customText = null) {
    if (this.isGenerating) return;

    const input = document.getElementById("mentor-user-input");
    const text = customText || (input ? input.value.trim() : "");
    if (!text) return;

    if (input) input.value = "";

    // Append user message
    this.chatHistory.push({ role: "user", text: text });
    this.renderChatMessages();

    // Get current code in editor if available
    const codeArea = document.getElementById("live-code-editor");
    const currentCode = codeArea ? codeArea.value : "";

    this.isGenerating = true;
    const sendBtn = document.getElementById("btn-mentor-send");
    if (sendBtn) sendBtn.disabled = true;

    // Show temporary typing indicator
    const container = document.getElementById("mentor-chat-messages");
    const typingId = "typing-indicator";
    if (container) {
      container.innerHTML += `
        <div id="${typingId}" class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
            <i data-lucide="sparkles" class="w-4 h-4 animate-spin"></i>
          </div>
          <div class="bg-white dark:bg-gray-800 p-3 rounded-2xl border text-xs text-gray-500 dark:text-gray-400 animate-pulse">
            DigiHer Mentor yozmoqda...
          </div>
        </div>
      `;
      container.scrollTop = container.scrollHeight;
      if (window.lucide) window.lucide.createIcons();
    }

    try {
      const reply = await window.GeminiService.chatWithMentor(text, this.chatHistory, currentCode);
      const indicator = document.getElementById(typingId);
      if (indicator) indicator.remove();

      this.chatHistory.push({ role: "model", text: reply });
      window.SupabaseManager.saveChatHistory(this.chatHistory);
      this.renderChatMessages();
    } catch (e) {
      console.error("Mentor chat error:", e);
      const indicator = document.getElementById(typingId);
      if (indicator) indicator.remove();

      this.chatHistory.push({
        role: "model",
        text: "Kechirasiz, javob olishda vaqtinchalik muammo yuz berdi. Iltimos, Gemini API kalitingiz to'g'ri sozlanganligini tekshirib ko'ring yoki qaytadan yozing."
      });
      this.renderChatMessages();
    } finally {
      this.isGenerating = false;
      if (sendBtn) sendBtn.disabled = false;
    }
  },

  askMentorAboutProject(projectId) {
    const proj = this.curatedProjects.find(p => p.id === projectId);
    if (!proj) return;

    this.sendMessage(proj.starterPrompt);
    // Scroll chat into view
    const chatBox = document.getElementById("mentor-chat-section");
    if (chatBox) chatBox.scrollIntoView({ behavior: 'smooth' });
  },

  initEditor() {
    const codeArea = document.getElementById("live-code-editor");
    if (codeArea && !codeArea.value.trim()) {
      codeArea.value = this.curatedProjects[0].defaultCode;
      this.runLiveCode();
    }
  },

  loadProjectIntoEditor(projectId) {
    const proj = this.curatedProjects.find(p => p.id === projectId);
    if (!proj) return;

    const codeArea = document.getElementById("live-code-editor");
    if (codeArea) {
      codeArea.value = proj.defaultCode;
      this.runLiveCode();
    }

    const editorSection = document.getElementById("code-playground-section");
    if (editorSection) editorSection.scrollIntoView({ behavior: 'smooth' });
  },

  runLiveCode() {
    const codeArea = document.getElementById("live-code-editor");
    const iframe = document.getElementById("live-preview-iframe");
    if (!codeArea || !iframe) return;

    const code = codeArea.value;
    const blob = new Blob([code], { type: "text/html" });
    iframe.src = URL.createObjectURL(blob);
  },

  async reviewCodeWithAI() {
    const codeArea = document.getElementById("live-code-editor");
    if (!codeArea) return;
    const code = codeArea.value;

    const prompt = `Mana mening yozgan kodim. Iltimos, uni ko'rib chiq, xatoliklar bo'lsa to'g'irla, zamonaviy dizayn va qulaylik qo'shish bo'yicha maslahatlar ber va yaxshilangan variantini ko'rsat.`;
    this.sendMessage(prompt);

    const chatBox = document.getElementById("mentor-chat-section");
    if (chatBox) chatBox.scrollIntoView({ behavior: 'smooth' });
  }
};

window.ProjectMentor = ProjectMentor;

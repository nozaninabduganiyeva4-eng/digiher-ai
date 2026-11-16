/**
 * DigiHer AI — Gemini API Integration Module
 * Uses Google Gemini (gemini-flash-latest / gemini-flash-lite-latest)
 */

const GeminiService = {
  /**
   * Universal call to Gemini generateContent
   */
  async generateText(prompt, systemInstruction = "") {
    const apiKey = window.CONFIG.getGeminiKey();
    if (!apiKey) {
      throw new Error("Gemini API kaliti topilmadi. Sozlamalardan kalitni kiriting.");
    }

    const model = window.CONFIG.GEMINI_MODEL || "gemini-flash-latest";
    const url = `${window.CONFIG.GEMINI_ENDPOINT}/${model}:generateContent?key=${apiKey}`;

    const contents = [];
    if (systemInstruction) {
      contents.push({
        role: "user",
        parts: [{ text: `[Tizim Yo'riqnomasi / Rol]: ${systemInstruction}` }]
      });
      contents.push({
        role: "model",
        parts: [{ text: "Tushundim, ushbu yo'riqnoma va rolda yordam beraman." }]
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData?.error?.message || `Xatolik yuz berdi (${response.status})`;
      throw new Error(msg);
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      throw new Error("Gemini javob qaytara olmadi. Iltimos qaytadan urinib ko'ring.");
    }

    return candidate.content.parts[0].text;
  },

  /**
   * 1. Qiziqish va qobiliyatga qarab kasb tahlili (Career Quiz AI)
   */
  async analyzeCareerQuiz(answers) {
    const systemPrompt = `Sen "DigiHer AI" platformasining yetakchi kasb yo'naltiruvchi AI mutaxassisisan. 
Sening vazifang texnologiya sohasiga qiziquvchi qizlar va ayollar uchun ularning javoblariga qarab eng mos IT kasbini aniqlash.
Javobingni DOIMO faqat quyidagi toza JSON formatida ber, hech qanday qo'shimcha belgisiz (markdown codeblock bo'lishi mumkin):
{
  "primaryCareer": "Kasb nomi (masalan: Frontend va UI/UX Dasturchi)",
  "matchScore": 95,
  "badge": "Kreativ Dasturchi",
  "summary": "Foydalanuvchining nima uchun bu kasbga mosligi haqida 2-3 jumlalik motivatsion izoh",
  "whyForGirls": "Nima uchun bu kasb zamonaviy qizlar uchun qulay va katta imkoniyatlar ochadi",
  "salaryRange": "$600 - $2,500+",
  "topSkills": ["Ko'nikma 1", "Ko'nikma 2", "Ko'nikma 3", "Ko'nikma 4"],
  "firstSteps": ["1-qadam...", "2-qadam...", "3-qadam..."],
  "alternativeCareers": ["2-mos kasb", "3-mos kasb"]
}`;

    const prompt = `Foydalanuvchi qizning test javoblari:
- Yoqtirgan mashg'uloti: ${answers.interest || "Dizayn va chiroyli veb-sahifalar yaratish"}
- Qiziqqan fani: ${answers.subject || "Matematika va San'at"}
- Orzusidagi loyiha turi: ${answers.projectGoal || "Qizlar uchun ijtimoiy ta'lim ilovasi"}
- Kuchli tomoni: ${answers.strength || "Kreativlik va mantiqiy fikrlash"}
- Haftasiga ajratadigan vaqti: ${answers.timeCommitment || "6-10 soat"}
- Hozirgi bilim darajasi: ${answers.experience || "Yangi boshlovchi"}

Ushbu qizga eng mos keluvchi zamonaviy IT va AI yo'nalishini tahlil qilib, JSON formatda javob ber.`;

    try {
      const rawText = await this.generateText(prompt, systemPrompt);
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("JSON formati topilmadi");
    } catch (err) {
      console.warn("AI so'rovi xatolik berdi yoki keshlandi, mukammal fallback ishlatiladi:", err);
      // Fallback generator based on answers
      return this.getFallbackQuizResult(answers);
    }
  },

  /**
   * 2. Individual ta'lim rejasi generatsiyasi (Roadmap Generator)
   */
  async generateLearningRoadmap(track, level, weeklyHours) {
    const systemPrompt = `Sen DigiHer AI platformasining professional o'quv dasturchisisan. 
Qizlar uchun ${track} yo'nalishida ${level} darajadan boshlab ${weeklyHours} soatlik individual 4 haftalik bosqichma-bosqich o'quv rejasini tuz.
Javobni DOIMO toza JSON formatida ber:
{
  "trackTitle": "${track}",
  "level": "${level}",
  "estimatedWeeks": 4,
  "weeklyHours": "${weeklyHours}",
  "overview": "Ushbu yo'l xaritasi sizni nimalarga o'rgatishi haqida qisqacha izoh",
  "modules": [
    {
      "week": 1,
      "title": "1-Hafta: Modul nomi",
      "goal": "Ushbu haftaning asosiy maqsadi",
      "topics": ["Mavzu 1", "Mavzu 2", "Mavzu 3"],
      "practicalTask": "Haftalik amaliy mini-vazifa",
      "resources": ["Resurs 1 (Bepul kurs/qo'llanma)", "Resurs 2"]
    }
  ]
}`;

    const prompt = `Iltimos, "${track}" yo'nalishi bo'yicha ${level} darajasidagi qiz uchun haftasiga ${weeklyHours} vaqt ajratgan holda to'liq 4 haftalik o'quv rejasini JSON formatida tuzib ber.`;

    try {
      const rawText = await this.generateText(prompt, systemPrompt);
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("JSON parsing failed");
    } catch (err) {
      console.warn("Roadmap AI xatosi, fallback ishlatilmoqda:", err);
      return this.getFallbackRoadmap(track, level, weeklyHours);
    }
  },

  /**
   * 3. AI Mentor Chat (Mini-loyihalar, kod va maslahat)
   */
  async chatWithMentor(userMessage, conversationHistory = [], currentCode = "") {
    const systemInstruction = `Sen "DigiHer Mentor" san — dasturlash, texnologiya va sun'iy intellektni o'rganayotgan qizlarning do'stona, samimiy va nihoyatda bilimdon AI ustozi va opasisan.
Sening xususiyatlaring:
1. Doimo mehr va hurmat bilan, rag'batlantiruvchi tarzda o'zbek tilida gapirasan.
2. Savollarga aniq, sodda tilda misollar bilan javob berasan.
3. Dasturlash (HTML, CSS, JS, Python, AI) bo'yicha kod misollarini aniq yozib tushuntirasan.
4. Foydalanuvchining ishonchini oshirasan: "Sen buni albatta uddalaysan!", "Ajoyib qadam qo'yding!" kabi ruhlantiruvchi so'zlarni ishlatasan.
5. Har bir kod blokini \`\`\` tilida formatlab berasan.`;

    let context = "";
    if (currentCode && currentCode.trim()) {
      context = `\n[Foydalanuvchining hozirgi kodi]:\n\`\`\`\n${currentCode}\n\`\`\`\n`;
    }

    const fullPrompt = `${context}\nFoydalanuvchi so'rovi: ${userMessage}`;
    return await this.generateText(fullPrompt, systemInstruction);
  },

  /**
   * 4. AI Yordamida Motivatsion Xat (Grantlar uchun Cover Letter)
   */
  async generateMotivationLetter(data) {
    const systemInstruction = `Sen xalqaro grantlar va tanlovlarga talaba qizlarni tayyorlovchi yetuk grant konsultantisan. O'zbek tilida professional, ta'sirchan va aniq dalillarga asoslangan Motivatsion Xat (Statement of Purpose / Cover Letter) yoz.`;

    const prompt = `Quyidagi ma'lumotlar asosida "${data.opportunityTitle}" dasturi/granti uchun ajoyib motivatsion xat yozib ber:
- Ishtirokchi ismi: ${data.name || "Dasturchi Qiz"}
- Yoshi / O'qish joyi: ${data.education || "Talaba / Maktab o'quvchisi"}
- Qiziqish sohasi: ${data.techInterest || "AI va Dasturlash"}
- Maqsadi va orzusi: ${data.goals || "O'zbekistonda xotin-qizlar uchun IT ekotizimini rivojlantirish va xalqaro tajriba to'plash"}
- Grant nima uchun kerak: ${data.reason || "Bilimlarimni chuqurlashtirish va yangi ijtimoiy AI loyihamni ishga tushirish uchun"}

Iltimos, xatni rasmiy, ilhomlantiruvchi va xalqaro komissiya a'zolarini qoyil qoldiradigan uslubda tuz.`;

    return await this.generateText(prompt, systemInstruction);
  },

  /**
   * Fallback for Career Quiz when offline
   */
  getFallbackQuizResult(answers) {
    const interest = (answers.interest || "").toLowerCase();
    
    if (interest.includes("dizayn") || interest.includes("vizual")) {
      return {
        primaryCareer: "Frontend va UI/UX Dizayner",
        matchScore: 98,
        badge: "Kreativ Veb-Ijodkor",
        summary: "Sizda vizual did, go'zallik hissi va odamlarga qulay interfeyslar yaratishga yuqori qobiliyat bor. Veb-saytlar va ilovalar dizayni orqali o'z tasavvuringizni haqiqatga aylantirasiz.",
        whyForGirls: "Dunyo bo'ylab eng ko'p talab qilinadigan, masofadan turib (remote) erkin ishlash mumkin bo'lgan, ijodkorlik va texnologiya uyg'unlashgan soha.",
        salaryRange: "$700 - $2,800+",
        topSkills: ["Figma & UI Dizayn", "HTML5 & Tailwind CSS", "JavaScript & React", "Foydalanuvchi Tajribasi (UX)"],
        firstSteps: [
          "Figma asoslari bilan tanishib, birinchi mobil ilova dizaynini chizing",
          "HTML va CSS da oddiy shaxsiy portfolio sahifangizni yarating",
          "DigiHer AI platformasida haftalik o'quv rejasini boshlang"
        ],
        alternativeCareers: ["Mobil Ilovalar Dizayneri", "Frontend Dasturchi", "Product Manager"]
      };
    } else if (interest.includes("ma'lumot") || interest.includes("bashorat") || interest.includes("sun'iy intellekt") || interest.includes("ai")) {
      return {
        primaryCareer: "Sun'iy Intellekt va Data Science Mutaxassisi",
        matchScore: 96,
        badge: "AI Kelajak Yetakchisi",
        summary: "Sizda mantiqiy tahlil, qonuniyatlarni topish va zamonaviy intellektual modellarni boshqarishga kuchli moyillik mavjud. AI hozirda dunyoni o'zgartirmoqda va siz bu jarayonning markazida bo'lasiz.",
        whyForGirls: "Sun'iy intellekt sohasida qizlar hissasi juda yuqori baholanadi. Xalqaro grantlar va nufuzli kompaniyalarda AI muhandisi qizlarga talab katta.",
        salaryRange: "$1,000 - $4,500+",
        topSkills: ["Python Dasturlash", "Machine Learning & Gemini API", "Pandas & Data Visualization", "Prompt Engineering"],
        firstSteps: [
          "Python tilida asosiy sintaksis va ma'lumot turlarini o'rganing",
          "Gemini va OpenAI API-lar orqali birinchi aqlli yordamchingizni yarating",
          "Kaggle platformasida kichik ma'lumotlar tahlilini bajaring"
        ],
        alternativeCareers: ["Data Analyst", "AI Prompt Engineer", "Machine Learning Muhandisi"]
      };
    } else {
      return {
        primaryCareer: "Full-Stack Veb va Dasturiy Ta'minot Muhandisi",
        matchScore: 94,
        badge: "Universal Dasturchi",
        summary: "Siz tizimli fikrlaydigan va muammolarga noldan tayyor yechim bera oladigan iqtidor egasisiz. Loyihaning tashqi ko'rinishidan tortib, ma'lumotlar bazasigacha bo'lgan to'liq jarayonni boshqara olasiz.",
        whyForGirls: "Yuqori daromadli, mustaqil loyihalar yaratish va xalqaro IT kompaniyalarda tez ko'tarilish imkoniyatini beradi.",
        salaryRange: "$900 - $3,500+",
        topSkills: ["JavaScript & TypeScript", "Node.js & Supabase", "React yoki Vue.js", "Algoritmlar"],
        firstSteps: [
          "JavaScript tili yordamida interaktiv mini-loyihalar quring",
          "Supabase yoki Firebase ma'lumotlar bazasini ulashni o'rganing",
          "GitHub profilingizni ochib, loyihalaringizni joylab boring"
        ],
        alternativeCareers: ["Backend Dasturchi", "Mobile Developer", "QA Automation"]
      };
    }
  },

  /**
   * Fallback for Roadmap
   */
  getFallbackRoadmap(track, level, weeklyHours) {
    return {
      trackTitle: track,
      level: level,
      estimatedWeeks: 4,
      weeklyHours: weeklyHours,
      overview: `Ushbu 4 haftalik reja sizga ${track} bo'yicha poydevor qurish, amaliy ko'nikmalarni shakllantirish va portfolioga dastlabki loyihangizni qo'shish imkonini beradi.`,
      modules: [
        {
          week: 1,
          title: "1-Hafta: Poydevor va Asosiy Tushunchalar",
          goal: "Sohaning tub mohiyatini anglash va ishchi muhitni sozlash",
          topics: [
            "Kirish: Sohaning rivojlanish tarixi va kelajak istiqbollari",
            "Asosiy vositalar: VS Code, Git va GitHub ochish",
            "Sintaksis va birinchi 'Salom, Dunyo' amaliyoti"
          ],
          practicalTask: "GitHub profilingizni ochib, o'zingiz haqingizda birinchi README sahifangizni yaratish.",
          resources: ["W3Schools bepul darslari", "DigiHer AI Mentor yo'riqnomasi", "YouTube darslar"]
        },
        {
          week: 2,
          title: "2-Hafta: Amaliy Ko'nikmalar va Asosiy Mexanizmlar",
          goal: "Nazariyadan amaliyotga o'tish va interaktivlik qo'shish",
          topics: [
            "Ma'lumotlar bilan ishlash va mantiqiy shartlar",
            "Zamonaviy kutubxonalar va qulay freymvorklar",
            "Foydalanuvchi interfeysini loyihalash"
          ],
          practicalTask: "Foydalanuvchi kiritgan ma'lumotlarni qabul qiluvchi va hisoblaydigan kichik kalkulyator/dastur tuzish.",
          resources: ["MDN Web Docs", "FreeCodeCamp interactive exercises", "DigiHer AI Kod Ustaxonasi"]
        },
        {
          week: 3,
          title: "3-Hafta: Sun'iy Intellekt va API Integratsiyasi",
          goal: "Loyihangizga zamonaviy AI imkoniyatlarini qo'shish",
          topics: [
            "API nima va u qanday ishlaydi?",
            "Gemini API bilan so'rovlar yuborish va natijalarni ko'rsatish",
            "Xatoliklarni ushlash va xavfsiz kalit boshqaruvi"
          ],
          practicalTask: "Sun'iy intellekt yordamida savollarga javob beruvchi 'Aqlli Qizlar Boti' mini veb-ilovasini yaratish.",
          resources: ["Google AI Studio qo'llanmasi", "Supabase ma'lumotlar bazasi darsi"]
        },
        {
          week: 4,
          title: "4-Hafta: Portfolioga Loyiha va Vercel-ga Yuklash",
          goal: "Loyihani yakunlash, internetga chiqarish va do'stlarga ko'rsatish",
          topics: [
            "Loyihani tozalash, dizaynini mukammallashtirish",
            "Vercel yoki GitHub Pages orqali bepul jonli efirga (deployment) chiqarish",
            "Rezyume va LinkedIn sahifasiga joylash sirlari"
          ],
          practicalTask: "To'liq tayyor loyihani Vercel ga deploy qilib, havolasini DigiHer hamjamiyatiga ulashish.",
          resources: ["Vercel Deployment Guide", "Women in Tech rezyume shabloni"]
        }
      ]
    };
  }
};

window.GeminiService = GeminiService;

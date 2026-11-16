-- ========================================================
-- DigiHer AI — Supabase Database Schema
-- Platform: Qizlar uchun raqamli imkoniyatlar platformasi
-- ========================================================

-- 1. Create Profiles Table (Foydalanuvchi profillari)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT,
    age INT,
    city TEXT DEFAULT 'Toshkent',
    education_level TEXT DEFAULT 'Maktab / Kollej / Universitet',
    target_role TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Quiz Results Table (AI Kasb testi natijalari)
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    primary_career TEXT NOT NULL,
    secondary_careers TEXT[],
    match_score INT DEFAULT 95,
    ai_analysis TEXT NOT NULL,
    recommended_skills TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Learning Roadmaps Table (Individual o'quv rejalari)
CREATE TABLE IF NOT EXISTS public.roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    track_title TEXT NOT NULL,
    skill_level TEXT NOT NULL, -- 'Boshlang\'ich', 'O\'rta', 'Ilg\'or'
    weekly_commitment TEXT NOT NULL,
    modules JSONB NOT NULL,
    completed_items TEXT[] DEFAULT '{}',
    progress_percentage INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Mentor Chats & Projects Table (AI Mentor suhbatlari va loyihalari)
CREATE TABLE IF NOT EXISTS public.mentor_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_title TEXT NOT NULL,
    project_category TEXT DEFAULT 'Web & AI',
    chat_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    code_snippets JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Opportunities & Grants Table (Grantlar va tanlovlar)
CREATE TABLE IF NOT EXISTS public.opportunities (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    organizer TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Grant', 'Tanlov', 'Kurs', 'Xakaton'
    target_audience TEXT NOT NULL,
    prize_or_grant TEXT,
    deadline DATE,
    link TEXT NOT NULL,
    description TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Saved Opportunities Table (Saqlangan grantlar)
CREATE TABLE IF NOT EXISTS public.saved_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    opportunity_id TEXT REFERENCES public.opportunities(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Ko\'rib chiqilmoqda', -- 'Ko\'rib chiqilmoqda', 'Ariza topshirildi', 'Qabul qilindi'
    ai_motivation_letter TEXT,
    saved_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Seed Initial Opportunities Data (Dastlabki nufuzli grantlar bazasi)
INSERT INTO public.opportunities (id, title, organizer, category, target_audience, prize_or_grant, deadline, link, description, is_featured)
VALUES 
(
    'technovation-girls-uz',
    'Technovation Girls Uzbekistan',
    'Tech4Impact & Technovation Global',
    'Tanlov',
    '8-18 yoshli maktab va litsey qizlari',
    'Xalqaro final, $10,000+ sovrinlar va Silikon vodiysi sayohati',
    '2025-04-15',
    'https://technovationchallenge.org',
    'Dunyo bo\'ylab qizlarni ijtimoiy muammolarni mobil ilovalar va AI orqali hal qilishga o\'rgatuvchi eng nufuzli global dastur.',
    true
),
(
    'wtm-google-scholarship',
    'Google Women Techmakers Scholars Program',
    'Google',
    'Grant',
    'Universitet va institut talaba qizlari',
    '€7,000 stipendiya + Google Retreat anjumani',
    '2025-05-30',
    'https://www.womentechmakers.com',
    'Informatika va texnologiya sohasidagi iqtidorli talaba qizlarni qo\'llab-quvvatlash uchun Google tomonidan ajratiladigan maxsus xalqaro grant.',
    true
),
(
    'girls-in-ai-global',
    'Girls in AI Global Hackathon',
    'Teens in AI',
    'Xakaton',
    '12-18 yoshli o\'smir qizlar',
    'AI mentorlik, noutbuklar va xalqaro inkubatsiya dasturi',
    '2025-06-01',
    'https://www.teensinai.com',
    'BMTning Barqaror rivojlanish maqsadlariga mos sun\'iy intellekt modellarini yaratish bo\'yicha global onlayn xakaton.',
    true
),
(
    'grace-hopper-scholarship',
    'Grace Hopper Celebration (GHC) Student Fellowship',
    'AnitaB.org',
    'Grant',
    'Barcha IT sohasidagi talaba va tadqiqotchi qizlar',
    'AQSh safar xarajatlari to\'liq qoplanadi + GHC chiptasi',
    '2025-07-10',
    'https://ghc.anitab.org',
    'Dunyodagi eng katta ayollar texnologiya anjumanida ishtirok etish uchun xalqaro grant dasturi.',
    true
),
(
    'it-park-women-academy',
    'IT-Park "Qizlar IT-da" Grantlari',
    'IT Park Uzbekistan',
    'Kurs',
    '16+ yoshdagi O\'zbekistonlik qizlar',
    '100% bepul o\'qish va amaliyot kafolati',
    '2025-08-01',
    'https://it-park.uz',
    'O\'zbekiston bo\'ylab qizlarni dasturlash, QA testlash va AI ko\'nikmalariga bepul o\'qitish davlat dasturi.',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;

-- 9. Create Public Policies (Read opportunities is open to everyone)
CREATE POLICY "Public opportunities are viewable by all" 
ON public.opportunities FOR SELECT USING (true);

-- Allow anonymous or authenticated inserts/reads for demo and user convenience
CREATE POLICY "Profiles can be managed by owner" 
ON public.profiles FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Quiz results can be managed by all" 
ON public.quiz_results FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Roadmaps can be managed by all" 
ON public.roadmaps FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Mentor chats can be managed by all" 
ON public.mentor_chats FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Saved opportunities can be managed by all" 
ON public.saved_opportunities FOR ALL USING (true) WITH CHECK (true);

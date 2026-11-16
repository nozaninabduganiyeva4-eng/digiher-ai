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
    skill_level TEXT NOT NULL,
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

-- 5. Saved Videos Table (Saqlangan YouTube video darslari)
CREATE TABLE IF NOT EXISTS public.saved_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    video_id TEXT NOT NULL,
    title TEXT NOT NULL,
    channel TEXT,
    category TEXT,
    saved_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_videos ENABLE ROW LEVEL SECURITY;

-- 7. Create Public Policies
CREATE TABLE IF NOT EXISTS public.saved_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

CREATE POLICY "Profiles can be managed by all" 
ON public.profiles FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Quiz results can be managed by all" 
ON public.quiz_results FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Roadmaps can be managed by all" 
ON public.roadmaps FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Mentor chats can be managed by all" 
ON public.mentor_chats FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Saved videos can be managed by all" 
ON public.saved_videos FOR ALL USING (true) WITH CHECK (true);

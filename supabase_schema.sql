-- =========================================================================
-- ESQUEMA SQL PARA BODA: CAMILA & NOVIAL (SUPABASE)
-- Copia y pega este script en el "SQL Editor" de tu proyecto de Supabase.
-- =========================================================================

-- 1. Crear tabla de invitados
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    phone TEXT,
    passes INTEGER NOT NULL DEFAULT 1,
    confirmed_passes INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined')),
    dietary_preference TEXT DEFAULT 'standard',
    dietary_notes TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas para lectura y actualización pública mediante Anon Key
-- (Permite a los invitados consultar y confirmar su asistencia con su enlace)
CREATE POLICY "Permitir lectura publica de invitados" 
ON public.guests 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Permitir confirmacion de invitados" 
ON public.guests 
FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir agregar invitados (Admin)" 
ON public.guests 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Permitir eliminar invitados (Admin)" 
ON public.guests 
FOR DELETE 
TO anon, authenticated 
USING (true);

-- 4. Insertar datos de prueba iniciales
INSERT INTO public.guests (code, name, phone, passes, status)
VALUES 
    ('FLIAPEREZ', 'Familia Pérez Gómez', '+573001234567', 4, 'pending'),
    ('ANDRESL', 'Andrés Felipe López', '+573109876543', 2, 'confirmed'),
    ('MARIAV', 'María Victoria Restrepo', '+573205551234', 1, 'pending'),
    ('CARLOSM', 'Carlos Mario & Esposa', '+573017778899', 2, 'declined')
ON CONFLICT (code) DO NOTHING;

-- Índices para búsqueda rápida por código y por estado
CREATE INDEX IF NOT EXISTS idx_guests_code ON public.guests(code);
CREATE INDEX IF NOT EXISTS idx_guests_status ON public.guests(status);

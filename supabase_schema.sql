-- =========================================================================
-- ESQUEMA SQL PARA BODA: CAMILA & RAÚL (SUPABASE)
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

-- 4. Insertar datos de prueba iniciales con UUIDs únicos
INSERT INTO public.guests (id, code, name, phone, passes, status)
VALUES 
    ('e8a8b132-7fd8-4d5c-9c02-e22131ec8701', 'FLIAPEREZ', 'Familia Pérez Gómez', '+573001234567', 4, 'confirmed'),
    ('92c58e41-0f38-4e89-a2e6-764bc5f8b902', 'MARIAV', 'María Victoria Restrepo', '+573109876543', 2, 'confirmed'),
    ('15d97a63-b81f-4b0e-9134-2e9124a9c303', 'CARLOSM', 'Carlos Mario Mendoza', '+573204445566', 2, 'declined'),
    ('6b3f71c4-9e52-47d1-a3f2-108154c8d404', 'VALENTINAR', 'Valentina Ramírez & Acompañante', '+573018889900', 2, 'pending'),
    ('a42e85b9-2c17-48f0-b98a-530182d7e505', 'FELIPES', 'Felipe Soto', '+573157772211', 1, 'pending')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    passes = EXCLUDED.passes,
    phone = EXCLUDED.phone;

-- Índices para búsqueda ultra rápida por ID (UUID) y por código
CREATE INDEX IF NOT EXISTS idx_guests_id ON public.guests(id);
CREATE INDEX IF NOT EXISTS idx_guests_code ON public.guests(code);
CREATE INDEX IF NOT EXISTS idx_guests_status ON public.guests(status);

-- Script de mise à jour des politiques Supabase
-- Exécutez ceci dans l'éditeur SQL de Supabase

-- Supprimer les anciennes politiques pour courses
DROP POLICY IF EXISTS "Anyone can view available courses" ON courses;
DROP POLICY IF EXISTS "Teachers can manage their courses" ON courses;
DROP POLICY IF EXISTS "Teachers can insert courses" ON courses;
DROP POLICY IF EXISTS "Teachers can update their courses" ON courses;
DROP POLICY IF EXISTS "Teachers can delete their courses" ON courses;

-- Créer des politiques plus permissives pour déboguer
CREATE POLICY "Allow all operations on courses" ON courses FOR ALL USING (true) WITH CHECK (true);

-- Supprimer les anciennes politiques pour bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Students can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;

-- Créer des politiques plus permissives pour bookings
CREATE POLICY "Allow all operations on bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);

-- Vérifier que RLS est activé
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

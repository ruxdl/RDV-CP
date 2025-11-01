-- Créer la table des utilisateurs
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(10) CHECK (role IN ('teacher', 'student')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table des cours/créneaux
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT,
  is_online BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table des réservations
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  duration INTEGER NOT NULL, -- en minutes
  subject VARCHAR(100) NOT NULL,
  notes TEXT,
  status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table des documents
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer des données de test
INSERT INTO users (email, name, role) VALUES
('professor@test.com', 'Professeur Martin', 'teacher'),
('marie@test.com', 'Marie Dupont', 'student'),
('paul@test.com', 'Paul Bernard', 'student'),
('sophie@test.com', 'Sophie Moreau', 'student');

-- Insérer des créneaux de test
INSERT INTO courses (teacher_id, date, time, location, is_online) VALUES
((SELECT id FROM users WHERE email = 'professor@test.com'), '2025-11-08', '14:00', 'En ligne', true),
((SELECT id FROM users WHERE email = 'professor@test.com'), '2025-11-10', '16:00', 'Bibliothèque Centrale, Salle 204', false),
((SELECT id FROM users WHERE email = 'professor@test.com'), '2025-11-12', '10:00', 'En ligne', true),
((SELECT id FROM users WHERE email = 'professor@test.com'), '2025-11-15', '15:00', 'Café Study, 1er étage', false);

-- Politiques de sécurité (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Politiques pour users
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (true);

-- Politiques pour courses
CREATE POLICY "Anyone can view available courses" ON courses FOR SELECT USING (is_available = true);
CREATE POLICY "Teachers can insert courses" ON courses FOR INSERT WITH CHECK (true);
CREATE POLICY "Teachers can update their courses" ON courses FOR UPDATE USING (true);
CREATE POLICY "Teachers can delete their courses" ON courses FOR DELETE USING (true);

-- Politiques pour bookings
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Students can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own bookings" ON bookings FOR UPDATE USING (true);

-- Politiques pour documents
CREATE POLICY "Users can view their own documents" ON documents FOR SELECT USING (true);
CREATE POLICY "Students can upload documents" ON documents FOR INSERT WITH CHECK (true);


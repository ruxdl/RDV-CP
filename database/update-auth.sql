-- Mise à jour de la base de données pour le système d'authentification

-- Ajouter les colonnes username et password à la table users
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- Supprimer les contraintes existantes si elles existent
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_username_key;

-- Ajouter la contrainte unique sur username
ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);

-- Supprimer les anciens utilisateurs de test
DELETE FROM users WHERE email IN ('professor@test.com', 'marie@test.com', 'paul@test.com', 'sophie@test.com');

-- Insérer les nouveaux utilisateurs avec identifiants et mots de passe
INSERT INTO users (username, password, email, name, role) VALUES
('ruxdl', 'MdpCPRDV6737', 'professor@test.com', 'Professeur Martin', 'teacher'),
('Hamza6E', 'MdpHamza6ET', 'hamza@test.com', 'Hamza', 'student'),
('ELISE4EEMMA1E', 'MdpEE4E1E', 'elise@test.com', 'Elise', 'student');

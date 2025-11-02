-- SCRIPT DE MISE À JOUR POUR AJOUTER L'AUTHENTIFICATION
-- À exécuter en plus de votre structure existante

-- 1. Ajouter les colonnes username et password à la table users existante
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- 2. Ajouter la contrainte unique sur username (si elle n'existe pas déjà)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'users_username_key' 
        AND table_name = 'users'
    ) THEN
        ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);
    END IF;
END $$;

-- 3. Mettre à jour les utilisateurs existants avec les nouveaux identifiants
UPDATE users SET 
    username = 'ruxdl', 
    password = 'MdpCPRDV6737' 
WHERE email = 'professor@test.com';

UPDATE users SET 
    username = 'Hamza6E', 
    password = 'MdpHamza6ET',
    name = 'Hamza',
    email = 'hamza@test.com'
WHERE email = 'marie@test.com';

UPDATE users SET 
    username = 'ELISE4EEMMA1E', 
    password = 'MdpEE4E1E',
    name = 'Elise',
    email = 'elise@test.com'
WHERE email = 'paul@test.com';

-- 4. Supprimer l'utilisateur Sophie qui n'est plus nécessaire
DELETE FROM users WHERE email = 'sophie@test.com';

-- 5. Vérifier que tout s'est bien passé
SELECT username, name, email, role FROM users;

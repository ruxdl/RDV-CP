-- SCRIPT SIMPLIFIÉ - Mise à jour de l'authentification
-- À exécuter dans Supabase si la contrainte existe déjà

-- 1. Ajouter les colonnes username et password (si elles n'existent pas)
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- 2. Supprimer la contrainte NOT NULL sur email (optionnel maintenant)
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;

-- 3. Ignorer la contrainte username (elle existe déjà)
-- La contrainte users_username_key existe déjà, on continue

-- 4. Mettre à jour les utilisateurs existants avec les nouveaux identifiants
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

-- 5. Supprimer l'utilisateur Sophie qui n'est plus nécessaire
DELETE FROM users WHERE email = 'sophie@test.com';

-- 6. Vérifier le résultat
SELECT id, username, name, email, role FROM users ORDER BY role, name;

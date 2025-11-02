-- SCRIPT DE VÉRIFICATION
-- À exécuter après la migration pour vérifier que tout fonctionne

-- Vérifier que les colonnes existent
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('username', 'password')
ORDER BY column_name;

-- Vérifier les utilisateurs créés
SELECT 
    id,
    username,
    name,
    email,
    role,
    CASE 
        WHEN password IS NOT NULL THEN '✅ Configuré'
        ELSE '❌ Manquant'
    END as password_status
FROM users 
ORDER BY role, name;

-- Compter les utilisateurs par rôle
SELECT 
    role,
    COUNT(*) as nombre_utilisateurs
FROM users 
GROUP BY role
ORDER BY role;

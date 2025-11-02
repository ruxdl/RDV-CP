-- SCRIPT POUR CRÉER DE NOUVEAUX UTILISATEURS (identifiant + mot de passe uniquement)
-- Exécuter ce script pour ajouter de nouveaux utilisateurs sans email obligatoire

-- Exemple d'ajout d'un nouvel élève :
-- INSERT INTO users (username, password, name, role) VALUES
-- ('NouvelEleve', 'MotDePasseSecurise', 'Nom de l\'élève', 'student');

-- Exemple d'ajout d'un nouveau professeur :
-- INSERT INTO users (username, password, name, role) VALUES
-- ('NouveauProf', 'MotDePasseSecurise', 'Nom du professeur', 'teacher');

-- Pour vérifier les utilisateurs existants :
SELECT username, name, role, created_at FROM users ORDER BY role, name;

-- Pour supprimer un utilisateur (si nécessaire) :
-- DELETE FROM users WHERE username = 'IdentifiantASupprimer';

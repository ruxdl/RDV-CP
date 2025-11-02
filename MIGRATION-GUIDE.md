# Guide de Migration de Base de Données

## ⚠️ IMPORTANT : Exécuter la Migration Supabase

Pour que l'authentification par identifiant/mot de passe fonctionne, vous devez exécuter le script de migration dans votre base de données Supabase.

## 📋 Instructions d'exécution :

### 1. Aller dans Supabase Dashboard
- Connectez-vous à [supabase.com](https://supabase.com)
- Ouvrez votre projet
- Allez dans **"SQL Editor"** dans le menu de gauche

### 2. Exécuter le script
- Cliquez sur **"New query"**
- Copiez-collez le contenu du fichier `database/SIMPLE-UPDATE-AUTH.sql`
- Cliquez sur **"Run"** pour exécuter le script

### 3. Vérification
Le script va :
- ✅ Ajouter les colonnes `username` et `password` 
- ✅ Mettre à jour les utilisateurs avec les nouveaux identifiants :
  - **Professeur** : `ruxdl` / `MdpCPRDV6737`
  - **Étudiant 1** : `Hamza6E` / `MdpHamza6ET`
  - **Étudiant 2** : `ELISE4EEMMA1E` / `MdpEE4E1E`
- ✅ Afficher le résultat final

## 🔑 Identifiants de test après migration :

| Rôle | Identifiant | Mot de passe |
|------|-------------|--------------|
| Professeur | `ruxdl` | `MdpCPRDV6737` |
| Étudiant | `Hamza6E` | `MdpHamza6ET` |
| Étudiant | `ELISE4EEMMA1E` | `MdpEE4E1E` |

## 🚀 Après la migration :

Une fois le script exécuté, vous pourrez :
- Vous connecter avec les identifiants ci-dessus
- Le professeur sera redirigé vers `/prof`
- Les étudiants vers `/student`

---

**Note** : Si vous rencontrez des erreurs, c'est normal - le script gère les contraintes existantes automatiquement.

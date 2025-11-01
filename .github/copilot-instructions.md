# Instructions Copilot pour le Site de Cours Particuliers

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexte du Projet
Ce projet est un site web moderne pour la gestion de cours particuliers. Il permet à un professeur de publier ses créneaux disponibles et aux élèves de réserver des cours en spécifiant différents paramètres.

## Technologies Utilisées
- **Framework**: Next.js 15 avec App Router
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: SQLite/Prisma (pour commencer)
- **Authentification**: NextAuth.js
- **Upload de fichiers**: Système d'upload intégré

## Fonctionnalités Principales
1. **Interface Professeur**:
   - Gestion des créneaux disponibles
   - Visualisation des réservations
   - Gestion du profil et des matières enseignées

2. **Interface Élèves**:
   - Visualisation des créneaux disponibles
   - Réservation avec paramètres (durée, programme, etc.)
   - Upload de documents (photos, exercices, etc.)
   - Historique des cours

3. **Système de Réservation**:
   - Calendrier interactif
   - Sélection de la durée du cours
   - Choix du programme/matière
   - Notes additionnelles
   - Upload de documents

## Conventions de Code
- Utiliser des composants fonctionnels React avec hooks
- Nomenclature en camelCase pour les variables et fonctions
- Nomenclature en PascalCase pour les composants
- Utiliser TypeScript pour le typage strict
- Classes Tailwind pour le styling
- Composants réutilisables dans `/src/components`
- Pages dans `/src/app`
- Utilitaires dans `/src/lib`

## Structure des Données
- **Users**: Professeur et élèves avec rôles différents
- **Courses**: Créneaux de cours avec horaires et disponibilité
- **Bookings**: Réservations avec paramètres spécifiques
- **Documents**: Fichiers uploadés par les élèves
- **Subjects**: Matières enseignées

## Design Guidelines
- Interface moderne et épurée
- Responsive design (mobile-first)
- Couleurs professionnelles et accessibles
- Animations subtiles pour l'UX
- Navigation intuitive

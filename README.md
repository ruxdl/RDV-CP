# 📚 Plateforme de Cours Particuliers

Une application web moderne et élégante pour la gestion de cours particuliers, construite avec Next.js, TypeScript et Tailwind CSS.

## 🌟 Fonctionnalités

### Pour les Professeurs
- ✅ Gestion des créneaux disponibles
- ✅ Visualisation des réservations
- ✅ Interface d'administration
- ✅ Gestion des matières enseignées

### Pour les Élèves
- ✅ Réservation de créneaux interactive
- ✅ Sélection de la durée du cours
- ✅ Choix du programme/matière
- ✅ Upload de documents (photos, exercices, etc.)
- ✅ Historique des cours

### Fonctionnalités Générales
- 🎨 Interface moderne et responsive
- 🔐 Système d'authentification sécurisé
- 📱 Compatible mobile et desktop
- 🗄️ Base de données SQLite avec Prisma
- 📎 Gestion d'upload de fichiers

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Installation

1. **Cloner le repository**
   ```bash
   git clone <url-du-repo>
   cd cours-particuliers
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir l'application**
   Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## 🛠️ Stack Technologique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: SQLite + Prisma ORM
- **Authentification**: NextAuth.js
- **Composants UI**: Composants personnalisés + Lucide React
- **Déploiement**: Optimisé pour GitHub Pages

## 📁 Structure du Projet

```
├── src/
│   ├── app/                # Pages et routing (App Router)
│   ├── components/         # Composants réutilisables
│   │   └── ui/            # Composants UI de base
│   └── lib/               # Utilitaires et configuration
├── prisma/                # Schéma de base de données
├── public/                # Assets statiques
└── uploads/               # Fichiers uploadés (local)
```

## 🗄️ Modèle de Données

### Entités Principales
- **User**: Utilisateurs (professeurs et élèves)
- **Course**: Créneaux de cours
- **Booking**: Réservations
- **Subject**: Matières enseignées
- **Document**: Fichiers uploadés
- **Message**: Système de messagerie

## 🎨 Personnalisation

Le design utilise un système de tokens de couleurs configurables dans `tailwind.config.ts` et `globals.css`. Les couleurs principales peuvent être facilement modifiées pour s'adapter à votre charte graphique.

## 🚀 Déploiement

### GitHub Pages
1. Configurer les GitHub Actions (fichier workflow fourni)
2. Activer GitHub Pages dans les paramètres du repository
3. Push vers la branche `main`

### Autres Plateformes
- **Vercel**: Déploiement automatique depuis GitHub
- **Netlify**: Compatible avec les builds statiques
- **Railway/Render**: Pour les déploiements avec base de données

## 🔧 Configuration

### Variables d'Environnement
Copiez `.env.example` vers `.env` et configurez :

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Base de Données
Pour réinitialiser la base de données :
```bash
npx prisma db reset
npx prisma db push
```

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large écrans (1440px+)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

En cas de problème :
1. Vérifiez les [Issues existantes](../../issues)
2. Créez une nouvelle issue avec les détails
3. Consultez la documentation de [Next.js](https://nextjs.org/docs)

---

**Développé avec ❤️ pour faciliter l'organisation des cours particuliers**

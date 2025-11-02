#!/bin/bash

echo "🔄 HARD REFRESH - Correction formulaire de connexion"
echo "=================================================="
echo ""

# Arrêter les anciens serveurs
echo "1. Arrêt des anciens serveurs..."
pkill -f "next dev" 2>/dev/null || true

# Nettoyer le cache
echo "2. Nettoyage du cache..."
rm -rf .next node_modules/.cache 2>/dev/null || true

# Redémarrer le serveur
echo "3. Redémarrage du serveur..."
npm run dev &
sleep 3

echo ""
echo "✅ Serveur redémarré !"
echo ""
echo "🧪 TESTS À EFFECTUER :"
echo ""
echo "1. LOCAL (doit être correct) :"
echo "   👉 http://localhost:3000/auth"
echo "   ✅ Doit afficher 'Identifiant (pas email !)'"
echo ""
echo "2. PRODUCTION (peut prendre 5-10 minutes) :"
echo "   👉 https://ruxdl.github.io/RDV-CP/auth"
echo "   ⏳ GitHub Pages met du temps à se mettre à jour"
echo ""
echo "3. HARD REFRESH dans le navigateur :"
echo "   👉 Cmd+Shift+R (Mac) ou Ctrl+Shift+R (PC)"
echo "   👉 Ou mode navigation privée"
echo ""
echo "🔑 IDENTIFIANTS DE TEST :"
echo "   Professor: ruxdl / MdpCPRDV6737"
echo "   Student: Hamza6E / MdpHamza6ET"
echo ""
echo "⚠️  N'oubliez pas d'exécuter database/SIMPLE-UPDATE-AUTH.sql dans Supabase !"

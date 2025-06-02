# 🚀 Quick Start Guide - Queens Game LinkedIn

## Installation Rapide

```bash
# 1. Cloner le repository
git clone https://github.com/creach-t/queens-game-linkedin.git
cd queens-game-linkedin

# 2. Installer les dépendances
npm install

# 3. Lancer le projet
npm start
```

## 📱 Tester sur votre appareil

1. **Installer Expo Go** sur votre téléphone :
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scanner le QR code** affiché dans votre terminal

3. **L'app se lance automatiquement** sur votre téléphone !

## 🎮 Comment Jouer

### Règles Simples
- **Objectif** : Placer 1 reine par rangée, colonne ET région colorée
- **Contrainte** : Les reines ne peuvent pas se toucher (même en diagonale)

### Contrôles
- **Tap simple** : Place un marqueur ✗
- **Double-tap** : Place une reine 👑
- **Tap sur reine** : La retire

### Feedback Visuel
- **Rouge** : Reines en conflit
- **Vert** : Puzzle résolu !
- **Vibration** : Feedback haptique

## 🛠 Development

### Structure du Code
```
src/
├── components/     # UI Components
├── hooks/         # Game Logic
├── screens/       # App Screens  
├── utils/         # Validation & Generation
├── types/         # TypeScript Types
└── constants/     # Colors & Sizes
```

### Scripts Disponibles
```bash
npm start          # Lancer en mode dev
npm run android    # Ouvrir sur Android
npm run ios        # Ouvrir sur iOS
npm run web        # Lancer sur navigateur
```

## 🔧 Prérequis

- **Node.js** 18+
- **Expo CLI** : `npm install -g @expo/cli`
- **Expo Go** app sur mobile

## 📋 Fonctionnalités du POC

✅ **Implémenté** :
- Plateau 6×6 avec régions colorées
- Validation des règles Queens
- Interface tap/double-tap
- Feedback haptique
- Détection de victoire

🔄 **À venir** :
- Tailles variables (7×7, 8×8, 9×9)
- Générateur de régions complexes
- Système de niveaux
- Mode tutoriel

## 🐛 Problèmes Courants

**"Module not found" ?**
```bash
npm install
expo install --fix
```

**QR code ne marche pas ?**
- Vérifiez que votre téléphone et PC sont sur le même WiFi
- Relancez avec `npm start --tunnel`

**App plante ?**
- Vérifiez les logs avec `npx react-native log-ios` ou `npx react-native log-android`

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche : `git checkout -b feature/ma-feature`
3. Commit : `git commit -m 'Add amazing feature'`
4. Push : `git push origin feature/ma-feature`
5. Pull Request

---

**Bon développement ! 🎯**
# 🎯 Queens Game LinkedIn - POC

POC d'une application mobile qui reproduit le jeu Queens de LinkedIn, développée avec Expo SDK 53.

![Queens Game](https://img.shields.io/badge/Expo-SDK%2053-blue?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.76.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript)

## 🎮 Règles du Jeu

Le Queens Game est un puzzle logique où vous devez :

- **Placer exactement une reine** dans chaque rangée, colonne ET région colorée
- **Les reines ne peuvent pas se toucher** - ni horizontalement, ni verticalement, ni en diagonale
- **Interaction** :
  - Tap simple : place un marqueur ✗
  - Double-tap : place une reine 👑
  - Les régions colorées doivent chacune contenir exactement une reine

## 🚀 Installation et Lancement

### Prérequis
- Node.js 18+
- Expo CLI
- Expo Go app sur votre téléphone (ou simulateur iOS/Android)

### Installation
```bash
# Cloner le repository
git clone https://github.com/creach-t/queens-game-linkedin.git
cd queens-game-linkedin

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

### Lancement sur appareil
1. Installer l'app **Expo Go** sur votre téléphone
2. Scanner le QR code affiché dans le terminal
3. L'application se lance automatiquement

## 📱 Fonctionnalités du POC

### ✅ Implémentées
- [x] Plateau de jeu avec régions colorées
- [x] Logique de placement des reines (tap/double-tap)
- [x] Validation des règles en temps réel
- [x] Détection des conflits avec feedback visuel
- [x] Feedback haptique pour les interactions
- [x] Interface utilisateur responsive
- [x] Compteur de mouvements et progression
- [x] Détection automatique de la victoire
- [x] Boutons Reset et Nouveau jeu

### 🔄 À améliorer
- [ ] Générateur de régions plus sophistiqué
- [ ] Système de niveaux avec progression
- [ ] Animations plus fluides
- [ ] Solveur automatique
- [ ] Système de hints
- [ ] Sauvegarde de progression
- [ ] Mode multijoueur

## 🏗️ Architecture

```
src/
├── components/     # Composants réutilisables
│   ├── GameBoard.tsx
│   ├── GameCell.tsx
│   └── GameControls.tsx
├── hooks/          # Logique métier
│   └── useGameLogic.ts
├── screens/        # Écrans de l'app
│   └── GameScreen.tsx
├── utils/          # Utilitaires
│   ├── gameValidation.ts
│   └── levelGenerator.ts
├── types/          # Types TypeScript
│   └── game.ts
└── constants/      # Constantes
    ├── Colors.ts
    └── GridSizes.ts
```

## 🎨 Design

- **Palette de couleurs** : Inspirée de LinkedIn (bleu #0077B5)
- **Responsive** : S'adapte à toutes les tailles d'écran
- **Accessibilité** : Contrastes appropriés et feedback haptique
- **UX** : Interactions intuitives avec feedback immédiat

## 🧪 Technologies Utilisées

- **Expo SDK 53** - Framework de développement
- **React Native 0.76.3** - Interface utilisateur native
- **TypeScript 5.7.2** - Typage statique
- **Expo Haptics** - Feedback tactile
- **React Native Reanimated** - Animations performantes

## 📝 Instructions de Jeu

1. **Objectif** : Placer une reine dans chaque région colorée
2. **Contraintes** :
   - Une reine par rangée
   - Une reine par colonne  
   - Une reine par région colorée
   - Les reines ne peuvent pas se toucher
3. **Contrôles** :
   - Tap simple : marqueur ✗
   - Double-tap : reine 👑
4. **Victoire** : Toutes les reines placées correctement !

---

**Développé avec ❤️ pour la communauté des puzzle games**
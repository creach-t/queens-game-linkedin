# 🔧 Installation - POC Queens Game LinkedIn

## ✅ Version Simplifiée pour Expo SDK 53

Le package.json a été simplifié pour éviter les conflits de versions avec Expo SDK 53. Les fonctionnalités avancées (haptics, animations) seront ajoutées dans une version future.

## 🚀 Installation Rapide

```bash
# 1. Cloner le repository
git clone https://github.com/creach-t/queens-game-linkedin.git
cd queens-game-linkedin

# 2. Nettoyer le cache (recommandé)
npm cache clean --force

# 3. Installer les dépendances
npm install

# 4. Lancer l'application
npm start
```

## 📦 Dépendances Actuelles

Version minimaliste pour assurer la compatibilité :
- ✅ `expo: ~53.0.0`
- ✅ `react: 18.3.1` 
- ✅ `react-native: 0.76.3`
- ✅ `@expo/vector-icons: ^14.1.0`
- ✅ `expo-status-bar: ~2.0.0`
- ✅ `expo-haptics: ~14.0.0`

## 🎯 Fonctionnalités du POC

### ✅ **Fonctionnel Maintenant :**
- Plateau de jeu 6×6 avec régions colorées
- Placement/retrait des reines (tap/double-tap)
- Validation des règles Queens LinkedIn
- Détection des conflits visuels
- Interface utilisateur complète
- Compteur de mouvements et progression
- Détection automatique de victoire

### 🔄 **Temporairement Désactivé :**
- ~~Feedback haptique~~ (sera réactivé dans v2)
- ~~Animations fluides~~ (sera réactivé dans v2)

## 📱 Test sur Appareil

1. **Installer Expo Go** :
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Lancer le serveur de dev :**
   ```bash
   npm start
   ```

3. **Scanner le QR code** avec Expo Go

## 🎮 Gameplay

- **Tap simple** → Marqueur ✗
- **Double-tap** → Reine 👑
- **Objectif** : 1 reine par rangée/colonne/région colorée
- **Règle** : Les reines ne peuvent pas se toucher

## 🛠️ Développement

### Scripts Disponibles
```bash
npm start          # Mode développement
npm run android    # Android Emulator  
npm run ios        # iOS Simulator
npm run web        # Navigateur web
```

### Structure Simplifiée
```
src/
├── components/     # GameBoard, GameCell, GameControls
├── hooks/         # useGameLogic (sans haptics)
├── screens/       # GameScreen
├── utils/         # Validation et génération
├── types/         # Types TypeScript
└── constants/     # Colors, GridSizes
```

## ⚠️ Problèmes Connus

### Si npm install échoue :
```bash
# Option 1: Forcer l'installation
npm install --force

# Option 2: Utiliser Yarn
npm install -g yarn
yarn install

# Option 3: Legacy peer deps
npm install --legacy-peer-deps
```

### Si l'app ne se lance pas :
```bash
# Nettoyer complètement
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start -- --clear
```

## 🔮 Roadmap v2

Une fois la compatibilité Expo SDK 53 stabilisée :
1. **Réajouter expo-haptics** pour le feedback tactile
2. **Ajouter react-native-reanimated** pour les animations  
3. **Améliorer le générateur de régions** (formes irrégulières)
4. **Système de niveaux** progressifs
5. **Mode tutoriel** interactif

## ✅ Vérification Fonctionnelle

L'app devrait afficher :
- Header bleu "Queens Game"
- Plateau 6×6 avec régions colorées (rangées)
- Boutons "Reset" et "Nouveau" fonctionnels
- Interaction tap/double-tap opérationnelle
- Message de victoire quand puzzle résolu

---

**🎯 Cette version minimaliste garantit un fonctionnement immédiat sur Expo SDK 53 !**
# 🔧 Guide de Dépannage - Installation

## Problème Résolu ✅

Le package.json a été corrigé avec les bonnes versions pour Expo SDK 53 :
- `@expo/vector-icons: ^14.1.0` (au lieu de ^15.0.0 qui n'existe pas)

## 🚀 Installation Corrigée

```bash
# 1. Effacer le cache npm (optionnel mais recommandé)
npm cache clean --force

# 2. Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json
# Ou sur Windows:
# rmdir /s node_modules
# del package-lock.json

# 3. Installer les dépendances
npm install

# 4. Si ça ne marche toujours pas, essayer :
npm install --legacy-peer-deps

# 5. Lancer le projet
npm start
```

## 🛠️ Solutions Alternatives

### Si npm continue à poser problème :

**Option 1: Utiliser Yarn**
```bash
npm install -g yarn
yarn install
yarn start
```

**Option 2: Forcer l'installation**
```bash
npm install --force
```

**Option 3: Créer un .npmrc**
```bash
echo "legacy-peer-deps=true" > .npmrc
npm install
```

## 📱 Après Installation Réussie

1. **Lancer le serveur de développement :**
   ```bash
   npm start
   ```

2. **Scanner le QR code avec Expo Go** sur votre téléphone

3. **Ou lancer sur simulateur :**
   ```bash
   npm run ios      # iOS Simulator
   npm run android  # Android Emulator
   npm run web      # Navigateur web
   ```

## 🔍 Vérification que ça fonctionne

Une fois l'app lancée, vous devriez voir :
- ✅ Un plateau de jeu 6×6 avec régions colorées
- ✅ Header "Queens Game" en bleu LinkedIn
- ✅ Boutons "Reset" et "Nouveau" fonctionnels
- ✅ Tap simple → marqueur ✗
- ✅ Double-tap → reine 👑

## 🐛 Autres Problèmes Possibles

### "Expo command not found"
```bash
npm install -g @expo/cli
```

### "Metro bundler crashed"
```bash
npx expo start --clear
```

### "Unable to resolve module"
```bash
npx expo install --fix
```

### Problèmes sur simulateur iOS
```bash
# Réinstaller les pods
cd ios && pod install && cd ..
```

## 📞 Support

Si vous rencontrez encore des problèmes :
1. Vérifiez la version de Node.js : `node --version` (>= 18)
2. Créez une issue sur GitHub avec les logs d'erreur
3. Ou contactez-moi avec le message d'erreur exact

---

**Le projet devrait maintenant s'installer sans erreur ! 🎯**
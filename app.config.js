export default {
  expo: {
    name: 'Queens Game LinkedIn',
    slug: 'queens-game-linkedin',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0077B5'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.queensgame.linkedin'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0077B5'
      },
      package: 'com.queensgame.linkedin'
    },
    web: {
      favicon: './assets/favicon.png'
    },
    platforms: ['ios', 'android', 'web']
  }
};
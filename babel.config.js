module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Note: react-native-reanimated/plugin removed for compatibility
      // Will be re-added when reanimated is properly configured
    ],
  };
};
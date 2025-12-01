// Web-safe replacements for native modules
export const expoSecureStore = {
  getItemAsync: async () => null,
  setItemAsync: async () => {},
  deleteItemAsync: async () => {},
};

// Fake Google Sign-In
export const GoogleSignin = {
  configure: () => {},
  signIn: async () => ({ idToken: null }),
  signOut: async () => {},
  isSignedIn: async () => false,
};

// Fake DateTimePicker for web
export const DateTimePicker = () => null;

// Fake Notifications
export const Notifications = {
  scheduleNotificationAsync: async () => {},
  requestPermissionsAsync: async () => ({ status: "denied" }),
};

// Fake Ads
export const BannerAd = () => null;
export const BannerAdSize = {};
export const TestIds = {};

// Export a wrapper component for compatibility
export function SafeAdBanner() {
  return null;
}

// Convenience export for everything
export default {
  expoSecureStore,
  GoogleSignin,
  DateTimePicker,
  Notifications,
  BannerAd,
  BannerAdSize,
  TestIds,
  SafeAdBanner,
};

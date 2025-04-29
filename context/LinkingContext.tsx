import * as React from 'react';
import { Linking, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

// Regular LinkingContext for opened URLs
const LinkingContext = React.createContext<{
  openURL: (url: string) => Promise<void>;
}>({
  openURL: async () => {},
});

// UnhandledLinkingContext for handling unhandled links
export const UnhandledLinkingContext = React.createContext<{
  handleURL: (url: string) => Promise<boolean>;
}>({
  handleURL: async () => false,
});

export function LinkingProvider({ children }: { children: React.ReactNode }) {
  const openURL = React.useCallback(async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL with Linking:', error);
    }
  }, []);

  const handleURL = React.useCallback(async (url: string) => {
    try {
      // Check if URL is valid before attempting to open
      if (!url || typeof url !== 'string') {
        console.warn('Invalid URL provided to handleURL:', url);
        return false;
      }

      // On web, use window.open
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
        return true;
      }

      // Try to open with WebBrowser for better UX on mobile
      await WebBrowser.openBrowserAsync(url);
      return true;
    } catch (error) {
      try {
        // Fallback to default Linking
        await Linking.openURL(url);
        return true;
      } catch (secondError) {
        console.error('Failed to open URL:', url, secondError);
        return false;
      }
    }
  }, []);

  // Create context values once to avoid rerenders
  const linkingValue = React.useMemo(() => ({ openURL }), [openURL]);
  const unhandledLinkingValue = React.useMemo(() => ({ handleURL }), [handleURL]);

  return (
    <LinkingContext.Provider value={linkingValue}>
      <UnhandledLinkingContext.Provider value={unhandledLinkingValue}>
        {children}
      </UnhandledLinkingContext.Provider>
    </LinkingContext.Provider>
  );
}

export function useLinking() {
  const context = React.useContext(LinkingContext);
  if (context === undefined) {
    throw new Error('useLinking must be used within a LinkingProvider');
  }
  return context;
}

export function useUnhandledLinking() {
  const context = React.useContext(UnhandledLinkingContext);
  if (context === undefined) {
    throw new Error('useUnhandledLinking must be used within a LinkingProvider');
  }
  return context;
} 
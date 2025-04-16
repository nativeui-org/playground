import * as React from 'react';
import { Linking } from 'react-native';
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
    await Linking.openURL(url);
  }, []);

  const handleURL = React.useCallback(async (url: string) => {
    try {
      // Try to open with WebBrowser for better UX
      await WebBrowser.openBrowserAsync(url);
      return true;
    } catch (error) {
      try {
        // Fallback to default Linking
        await Linking.openURL(url);
        return true;
      } catch (error) {
        console.error('Error opening URL:', error);
        return false;
      }
    }
  }, []);

  return (
    <LinkingContext.Provider value={{ openURL }}>
      <UnhandledLinkingContext.Provider value={{ handleURL }}>
        {children}
      </UnhandledLinkingContext.Provider>
    </LinkingContext.Provider>
  );
}

export function useLinking() {
  return React.useContext(LinkingContext);
}

export function useUnhandledLinking() {
  return React.useContext(UnhandledLinkingContext);
} 
import { Header } from '@/components/header';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from '@/lib/theme-context';
import { Stack, usePathname, useRouter } from 'expo-router';

export default function ComponentsLayout() {
    const { theme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    // Extraire le nom du composant à partir du chemin
    const componentName = pathname.split('/').pop()?.replace('Example', '') || 'Component';
    const formattedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    return (
        <Stack
            screenOptions={{
                // Ne pas désactiver l'en-tête au niveau global
                headerShown: true,
                // Définir l'en-tête personnalisé pour toutes les routes dans ce layout
                header: () => (
                    <Header
                        title={formattedComponentName}
                        showBackButton={true}
                        rightContent={<ThemeToggle />}
                        className="bg-background border-b border-border"
                        titleClassName="text-foreground"
                    />
                ),
            }}
        >
            {/* Vous n'avez pas besoin de redéfinir les options d'en-tête ici */}
            <Stack.Screen name="[...component]" />
        </Stack>
    );
}
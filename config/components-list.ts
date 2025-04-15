import { Feather } from '@expo/vector-icons';

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
}

export const componentsList: ComponentItem[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'Un composant bouton flexible avec différentes variantes et tailles',
    icon: 'box',
    route: 'components/button',
  },
  {
    id: 'theme-toggle',
    name: 'Theme Toggle',
    description: 'Bascule entre les modes clair et sombre',
    icon: 'moon',
    route: 'components/theme-toggle',
  },
  {
    id: 'custom-styling',
    name: 'Custom Styling',
    description: 'Composants UI modernes avec ombres et arrondis stylisés',
    icon: 'layout',
    route: 'components/custom-styling',
  },
  // Vous pourrez ajouter d'autres composants ici au fil du temps
]; 
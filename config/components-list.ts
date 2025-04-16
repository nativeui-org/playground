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
    description: 'A flexible button component with different variants and sizes',
    icon: 'box',
    route: 'components/button',
  },
  {
    id: 'theme-toggle',
    name: 'Theme Toggle',
    description: 'Toggle between light and dark modes',
    icon: 'moon',
    route: 'components/theme-toggle',
  },
  {
    id: 'custom-styling',
    name: 'Custom Styling',
    description: 'Modern UI components with styled shadows and rounded corners',
    icon: 'layout',
    route: 'components/custom-styling',
  },
  // Vous pourrez ajouter d'autres composants ici au fil du temps
]; 
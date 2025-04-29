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
    route: 'components/buttonExample',
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'A collapsible content component with an icon',
    icon: 'chevron-down',
    route: 'components/accordionExample',
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'A small, colored label component',
    icon: 'tag',
    route: 'components/badgeExample',
  },
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'A circular image component',
    icon: 'user',
    route: 'components/avatarExample',
  },
  {
    id: 'input',
    name: 'Input',
    description: 'A text input component',
    icon: 'mail',
    route: 'components/inputExample',
  },
]; 
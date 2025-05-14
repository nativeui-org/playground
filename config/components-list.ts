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
    description: 'A flexible button component',
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
  {
    id: 'textarea',
    name: 'Textarea',
    description: 'A multi-line text input component',
    icon: 'message-circle',
    route: 'components/textAreaExample',
  },
  {
    id: 'inputOTP',
    name: 'Input OTP',
    description: 'A component for entering OTP codes',
    icon: 'lock',
    route: 'components/inputOTPExample',
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'A switch component',
    icon: 'toggle-right',
    route: 'components/switchExample',
  },
  {
    id: 'radioGroup',
    name: 'Radio Group',
    description: 'A group of radio buttons',
    icon: 'radio',
    route: 'components/radioGroupExample',
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'A checkbox component',
    icon: 'check',
    route: 'components/checkboxExample',
  },
  {
    id: 'slider',
    name: 'Slider',
    description: 'A slider component',
    icon: 'sliders',
    route: 'components/sliderExample',
  },
  {
    id: 'select',
    name: 'Select',
    description: 'A select component',
    icon: 'chevron-down',
    route: 'components/selectExample',
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'A popover component',
    icon: 'chevron-up',
    route: 'components/popoverExample',
  },
  {
    id: 'drawer',
    name: 'Drawer',
    description: 'A drawer component',
    icon: 'menu',
    route: 'components/drawerExample',
  },
  {
    id: 'combobox',
    name: 'Combobox',
    description: 'A combobox component',
    icon: 'search',
    route: 'components/comboboxExample',
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'A skeleton component',
    icon: 'loader',
    route: 'components/skeletonExample',
  },
  {
    id: 'separator',
    name: 'Separator',
    description: 'A visual divider between content areas',
    icon: 'minus',
    route: 'components/separatorExample',
  },
  {
    id: 'sheet',
    name: 'Sheet',
    description: 'A sheet component',
    icon: 'layout',
    route: 'components/sheetExample',
  },
]; 
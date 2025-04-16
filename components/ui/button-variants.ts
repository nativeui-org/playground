import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground shadow',
        destructive: 'bg-destructive text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground shadow-sm',
        outline: 'border border-input bg-background text-foreground dark:border-input dark:bg-background dark:text-foreground shadow-sm',
        secondary: 'bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-sm',
        ghost: 'text-foreground dark:text-foreground',
        link: 'text-primary dark:text-primary underline',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-10 px-4',
        lg: 'h-14 px-8',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>; 
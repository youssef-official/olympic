import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading,
  ...props
}) => {
  const variants = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-stone-200',
    secondary: 'bg-stone-100 text-stone-900 hover:bg-stone-200 dark:bg-neutral-800 dark:text-stone-100 dark:hover:bg-neutral-700',
    outline: 'border border-stone-200 hover:bg-stone-50 dark:border-neutral-800 dark:hover:bg-neutral-900',
    ghost: 'hover:bg-stone-100 dark:hover:bg-neutral-800',
    gold: 'bg-accent text-white hover:opacity-90 shadow-lg shadow-accent/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
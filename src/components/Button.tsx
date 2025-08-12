// Button.tsx
// Purpose: Reusable button with variants, sizes, and loading state
// 🕒 2025-08-06 — Initial creation with support for variants and disabled state
// 🕒 2025-08-12 — Add size prop (sm|md|lg), loading state, default type, a11y polish
// 🕒 2025-08-12 — Forward ref, pointer-events when disabled, DRY rounded

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default1' | 'default2' | 'arcade1' | 'arcade2' | 'confirm' | 'cancel' | 'back';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'default1',
    size = 'md',
    isLoading = false,
    children,
    className = '',
    type,
    disabled,
    ...props
  },
  ref
) {
  // Base styles shared across variants
  const baseStyles = [
    'inline-flex items-center justify-center gap-2 select-none',
    'rounded font-semibold',
    'transition-colors duration-700 ease-out hover:duration-0',
    'focus:outline-none focus:ring-2 focus:ring-borderDim focus:ring-offset-0',
    'border-2 border-white',
    'disabled:opacity-60 disabled:cursor-not-allowed',
  ].join(' ');

  // Variant look & feel (using your theme tokens)
  const variantClasses: Record<string, string> = {
    default1:
      'font-market bg-transparent hover:bg-white hover:text-background active:bg-neonBlue active:text-background',
    default2:
      'font-market font-bold bg-transparent hover:bg-white hover:text-background active:bg-neonBlue active:text-background',
    arcade1:
      'font-arcade bg-transparent hover:bg-primary hover:text-black active:bg-neonBlue active:text-background',
    arcade2:
      'font-arcade font-bold bg-transparent hover:bg-casinoYellow hover:text-background active:bg-neonBlue active:text-background',
    confirm:
      'font-market bg-profitGreen !text-black hover:bg-white hover:!text-black active:bg-neonBlue active:text-background',
    cancel:
      'font-market bg-lossRed text-background hover:bg-white hover:text-black active:bg-neonBlue active:text-background',
    back:
      'font-market bg-transparent text-white hover:bg-white hover:text-black active:bg-neonBlue active:text-background',
  };

  // Size system — ensures comfortable tap targets; does not override variant padding
  const sizeClasses = {
    sm: 'text-sm leading-none px-4 py-2.5',
    md: 'text-base leading-none px-5 py-3',
    lg: 'text-xl leading-none px-6 py-3.5',
  } as const;

  const isDisabled = disabled || isLoading;
  const btnType = type ?? 'button'; // default to non-submit unless specified

  return (
    <div
      className={`inline-block w-max p-[3px] border-2 border-white transition-all duration-150 ${
        isDisabled ? 'pointer-events-none' : 'group'
      }`}
      aria-disabled={isDisabled || undefined}
    >
      <button
        ref={ref}
        type={btnType}
        aria-busy={isLoading || undefined}
        disabled={isDisabled}
        className={`${baseStyles} ${variantClasses[variant] || variantClasses.default1} ${
          sizeClasses[size]
        } ${className}`}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {children}
      </button>
    </div>
  );
});

export default Button;
export { Button };
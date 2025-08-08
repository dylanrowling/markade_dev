// Button.tsx
// Purpose: Reusable button component for consistent styling across the app
// 🕒 2025-08-06 — Initial creation with support for variants and disabled state

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default1' | 'default2' | 'arcade1' | 'arcade2' | 'confirm' | 'cancel' | 'back';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default1',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded font-semibold transition-colors duration-700 ease-out hover:duration-0 focus:outline-none focus:ring-2 focus:ring-borderDim focus:ring-offset-0 border-2 border-white';
  const variantClasses: Record<string, string> = {
    default1: 'font-market bg-transparent hover:bg-white hover:text-background active:bg-neonBlue active:text-background rounded px-4 py-2 text-base',
    default2: 'font-market-header bg-transparent hover:bg-white hover:text-background active:bg-neonBlue active:text-background rounded px-6 py-3 text-xl',
    arcade1: 'font-arcade bg-transparent hover:bg-casinoYellow hover:text-background active:bg-neonBlue active:text-background rounded px-4 py-2 text-base',
    arcade2: 'font-arcade-bold bg-transparent hover:bg-casinoYellow hover:text-background active:bg-neonBlue active:text-background rounded px-6 py-3 text-xl',
    confirm: 'font-market bg-profitGreen text-background hover:bg-neonBlue hover:text-background active:bg-neonBlue active:text-background rounded px-4 py-2 text-base',
    cancel: 'font-market bg-lossRed text-background hover:bg-neonBlue hover:text-background active:bg-neonBlue active:text-background rounded px-4 py-2 text-base',
    back: 'font-market bg-transparent text-white hover:bg-surface hover:text-white active:bg-neonBlue active:text-background rounded px-4 py-2 text-base',
  };
  
  return (
    <div className={`inline-block p-[3px] border-2 border-white transition-all duration-150 ${props.disabled ? '' : 'group'}`}>
      <button
        className={`${baseStyles} ${variantClasses[variant] || variantClasses.default1} ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
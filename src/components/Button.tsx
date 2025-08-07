// Button.tsx
// Purpose: Reusable button component for consistent styling across the app
// 🕒 2025-08-06 — Initial creation with support for variants and disabled state

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default1' | 'default2' | 'arcade1' | 'arcade2';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default1',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded font-semibold transition-colors duration-500 ease-out hover:duration-0 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-white';
  const variantClasses: Record<string, string> = {
    default1: 'font-market text-white bg-black rounded px-4 py-2 text-base hover:text-black hover:bg-white group-active:bg-white active:bg-white active:text-black',
    default2: 'font-market-header text-white bg-black rounded px-6 py-3 text-xl hover:text-black hover:bg-white group-active:bg-white active:bg-white active:text-black',
    arcade1: 'font-arcade text-primary rounded px-4 py-2 text-base hover:text-black hover:bg-primary active:bg-primary active:text-black',
    arcade2: 'font-arcade-header text-primary rounded px-6 py-3 text-xl hover:text-black hover:bg-primary active:bg-primary active:text-black',
  };

  return (
    <div className={`inline-block p-[3px] border-2 border-white transition-all duration-150 ${props.disabled ? '' : 'group'} ${variant.startsWith('arcade') ? 'active:bg-primary' : 'active:bg-white'}`}>
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
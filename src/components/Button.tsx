// Button.tsx
// Purpose: Reusable button component for consistent styling across the app
// 🕒 2025-08-06 — Initial creation with support for variants and disabled state

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary:
      'bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500 disabled:bg-pink-400',
    secondary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
    tertiary:
      'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-500 disabled:bg-gray-500',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
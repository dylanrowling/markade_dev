// Button.tsx
// Purpose: Reusable button with variants, sizes, and loading state
// 🕒 2025-08-06 — Initial creation with support for variants and disabled state
// 🕒 2025-08-12 — Add size prop (sm|md|lg), loading state, default type, a11y polish
// 🕒 2025-08-12 — Forward ref, pointer-events when disabled, DRY rounded

import React from 'react';

type CommonButtonProps = {
  variant?: 'default1' | 'default2' | 'arcade1' | 'arcade2' | 'confirm' | 'cancel' | 'back';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  /** shared so destructuring works for both anchor and button branches */
  disabled?: boolean;
  /** shared so destructuring doesn't error when as='button'; still required on link props */
  href?: string;
};

type ButtonNativeProps = CommonButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    as?: 'button';
  };

type ButtonLinkProps = CommonButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'type'> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonNativeProps | ButtonLinkProps;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  {
    variant = 'default1',
    size = 'md',
    isLoading = false,
    children,
    className = '',
    // type, // REMOVED from destructuring
    disabled,
    as = 'button',
    href,
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
    'border border-white',
    'touch-manipulation',
    'outline-none',
    'tap-highlight-transparent',
    'disabled:opacity-60 disabled:cursor-not-allowed',
  ].join(' ');

  // Variant look & feel (using your theme tokens)
  const variantClasses: Record<string, string> = {
    default1:
      'font-market bg-transparent hover:bg-white hover:text-background focus:bg-white focus:text-background active:bg-accentBold active:text-background',
    default2:
      'font-market font-bold bg-transparent hover:bg-white hover:text-background focus:bg-white focus:text-background active:bg-accentBold active:text-background',
    arcade1:
      'font-arcade bg-transparent hover:bg-primary hover:text-black focus:bg-primary focus:text-black active:bg-accentBold active:text-background',
    arcade2:
      'font-arcade font-bold bg-transparent hover:bg-casinoYellow hover:text-background focus:bg-casinoYellow focus:text-background active:bg-accentBold active:text-background',
    confirm:
      'font-market bg-profitGreen !text-black hover:bg-white hover:!text-black focus:bg-white focus:!text-black active:bg-accentBold active:text-background',
    cancel:
      'font-market bg-lossRed text-background hover:bg-white hover:text-black focus:bg-white focus:text-black active:bg-accentBold active:text-background',
    back:
      'font-market bg-transparent text-white hover:bg-white hover:text-black focus:bg-white focus:text-black active:bg-accentBold active:text-background',
  };

  // Size system — ensures comfortable tap targets; does not override variant padding
  const sizeClasses = {
    sm: 'text-sm leading-none px-4 py-2.5 border',
    md: 'text-base leading-none px-5 py-3 border',
    lg: 'text-xl leading-none px-6 py-3.5 border',
  } as const;

  const isDisabled = disabled || isLoading;
  const maybeBtnType = (props as React.ButtonHTMLAttributes<HTMLButtonElement>).type;
  const btnType: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] = maybeBtnType ?? 'button';

  return (
    <div
      className={`inline-block w-max p-[3px] border border-white transition-all duration-150 ${
        isDisabled ? 'pointer-events-none' : 'group'
      }`}
      aria-disabled={isDisabled || undefined}
    >
      {as === 'a' ? (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-disabled={isDisabled || undefined}
          tabIndex={isDisabled ? -1 : 0}
          className={`${baseStyles} ${variantClasses[variant] || variantClasses.default1} ${
            sizeClasses[size]
          } ${className}`}
          {...(props as Omit<ButtonLinkProps, 'as' | 'href' | 'children'>)}
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
        </a>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={btnType}
          aria-busy={isLoading || undefined}
          disabled={isDisabled}
          className={`${baseStyles} ${variantClasses[variant] || variantClasses.default1} ${
            sizeClasses[size]
          } ${className}`}
          {...(props as Omit<ButtonNativeProps, 'as' | 'children'>)}
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
      )}
    </div>
  );
});

export default Button;
export { Button };
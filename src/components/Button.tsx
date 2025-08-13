// Button.tsx
// Purpose: Reusable button with variants, sizes, and loading state using semantic tokens
// 🕒 2025-08-06 — Initial creation with support for variants and disabled state
// 🕒 2025-08-12 — Add size prop (sm|md|lg), loading state, default type, a11y polish
// 🕒 2025-08-12 — Forward ref, pointer-events when disabled, DRY rounded
// 🕒 2025-08-15 — Modernized with semantic tokens, cleaned variants, single wrapper, cx helper

import React from 'react';

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

type CommonButtonProps = {
  variant?: 'default' | 'subtle' | 'arcade1' | 'arcade2' | 'confirm' | 'cancel' | 'back';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
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
    variant = 'default',
    size = 'md',
    isLoading = false,
    children,
    className = '',
    disabled,
    as = 'button',
    href,
    ...props
  },
  ref
) {
  const baseStyles = cx(
    'inline-flex items-center justify-center gap-2 select-none rounded-md font-semibold transition-colors duration-150 ease-in-out',
    'border',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-default',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    'tap-highlight-transparent touch-manipulation',
  );

  const variantClasses: Record<string, string> = {
    default:
      'bg-transparent border-divider text-fg-default hover:bg-state-hover hover:text-fg-default focus-visible:bg-state-focus active:bg-state-active active:text-fg-default font-market',
    subtle:
      'bg-transparent border-transparent text-fg-muted hover:bg-state-hover hover:text-fg-default focus-visible:bg-state-focus active:bg-state-active active:text-fg-default font-market',
    arcade1:
      'relative overflow-hidden bg-transparent border-2 border-accent-yellow text-accent-yellow font-arcade rounded-none hover:text-black focus-visible:text-black before:content-[\'\'] before:absolute before:inset-[3px] before:border-2 before:border-fg-default before:rounded-[3px] before:opacity-0 hover:before:opacity-100 focus-visible:before:opacity-100 before:pointer-events-none after:content-[\'\'] after:absolute after:inset-[5px] after:bg-fg-default after:opacity-0 hover:after:opacity-100 focus-visible:after:opacity-100 after:pointer-events-none transition-[color,opacity] duration-700 hover:duration-0',
    arcade2:
      'relative bg-transparent border-divider text-accent-subtle font-arcade-bold hover:bg-state-hover hover:text-fg-default focus-visible:bg-state-focus active:bg-state-active active:text-fg-default before:content-[\'\'] before:absolute before:inset-[3px] before:border-2 before:border-accent-subtle before:opacity-0 hover:before:opacity-100 focus-visible:before:opacity-100 transition-opacity duration-700 hover:duration-0',
    confirm:
      'bg-accent-default border-accent-default text-fg-onAccent hover:bg-accent-hover hover:border-accent-hover focus-visible:bg-accent-focus focus-visible:border-accent-focus active:bg-accent-active active:border-accent-active font-market',
    cancel:
      'bg-state-danger border-state-danger text-fg-onDanger hover:bg-state-danger-hover hover:border-state-danger-hover focus-visible:bg-state-danger-focus focus-visible:border-state-danger-focus active:bg-state-danger-active active:border-state-danger-active font-market',
    back:
      'bg-transparent border-transparent text-fg-muted hover:bg-state-hover hover:text-fg-default focus-visible:bg-state-focus active:bg-state-active active:text-fg-default font-market',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  const isDisabled = disabled || isLoading;
  const maybeBtnType = (props as React.ButtonHTMLAttributes<HTMLButtonElement>).type;
  const btnType: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] = maybeBtnType ?? 'button';

  const sharedProps = {
    className: cx(baseStyles, variantClasses[variant] || variantClasses.default, sizeClasses[size], className),
    'aria-disabled': isDisabled || undefined,
    ref,
    ...props,
  };

  if (as === 'a') {
    return (
      <a
        {...(sharedProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        tabIndex={isDisabled ? -1 : 0}
        onClick={isDisabled ? (e) => e.preventDefault() : undefined}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4 relative z-10" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="4">
            <circle className="opacity-25" cx="12" cy="12" r="10" />
            <path className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      type={btnType}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 relative z-10" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="4">
          <circle className="opacity-25" cx="12" cy="12" r="10" />
          <path className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
});

export default Button;
export { Button };
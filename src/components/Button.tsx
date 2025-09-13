// Button.tsx
// Purpose: Reusable button with variants, sizes, and loading state using semantic tokens
// 🕒 2025-08-06 — Initial creation with support for variants and disabled state
// 🕒 2025-08-12 — Add size prop (sm|md|lg), loading state, default type, a11y polish
// 🕒 2025-08-12 — Forward ref, pointer-events when disabled, DRY rounded
// 🕒 2025-08-13 — Modernized with semantic tokens, cleaned variants, single wrapper, cx helper
// 🕒 2025-08-21 — Collapse to single 'arcade' variant (md only), simple invert hover; remove arcade2
// 🕒 2025-09-12 — Make 'arcadewhite' the default; neutralize base focus ring; normalize non-arcade variants

import React from 'react';

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

type CommonButtonProps = {
  variant?: 'default' | 'subtle' | 'arcadewhite' | 'arcadeyellow' | 'arcadeblue' | 'arcadepink' | 'confirm' | 'cancel' | 'back';
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
    variant = 'arcadewhite',
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
    'inline-flex items-center justify-center gap-2 select-none rounded font-semibold transition-colors duration-150 ease-in-out border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--focus-ring))] disabled:opacity-60 disabled:cursor-not-allowed tap-highlight-transparent touch-manipulation relative overflow-hidden group',
  );

  const variantClasses: Record<string, string> = {
    default:
      'bg-transparent border-divider text-fg-default hover:bg-panel/30 font-market',
    subtle:
      'bg-transparent border-transparent text-fg-subtle hover:bg-panel/20 hover:text-fg-default font-market',
    arcadewhite:
      "rounded-none bg-app border-2 border-white text-white font-arcade focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-white hover:text-[rgb(var(--bg-app))] before:content-[''] before:absolute before:inset-1 before:border before:border-black before:opacity-0 before:transition-opacity before:duration-700 before:ease-out active:before:opacity-100 transition-[background-color,color,border-color] duration-700 hover:duration-150",
    arcadeyellow:
      "rounded-none bg-app border-2 border-[rgb(var(--accent-yellow))] text-[rgb(var(--accent-yellow))] font-arcade focus-visible:ring-[rgb(var(--accent-yellow))] focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-[rgb(var(--accent-yellow))] hover:text-[rgb(var(--bg-app))] before:content-[''] before:absolute before:inset-1 before:border before:border-black before:opacity-0 before:transition-opacity before:duration-700 before:ease-out active:before:opacity-100 transition-[background-color,color,border-color] duration-700 hover:duration-150",
    arcadeblue:
      "rounded-none bg-app border-2 border-[rgb(var(--accent-blue))] text-[rgb(var(--accent-blue))] font-arcade focus-visible:ring-[rgb(var(--accent-blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-[rgb(var(--accent-blue))] hover:text-[rgb(var(--bg-app))] before:content-[''] before:absolute before:inset-1 before:border before:border-black before:opacity-0 before:transition-opacity before:duration-700 before:ease-out active:before:opacity-100 transition-[background-color,color,border-color] duration-700 hover:duration-150",
    arcadepink:
      "rounded-none bg-app border-2 border-[rgb(var(--accent-pink))] text-[rgb(var(--accent-pink))] font-arcade focus-visible:ring-[rgb(var(--accent-pink))] focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-[rgb(var(--accent-pink))] hover:text-[rgb(var(--bg-app))] before:content-[''] before:absolute before:inset-1 before:border before:border-black before:opacity-0 before:transition-opacity before:duration-700 before:ease-out active:before:opacity-100 transition-[background-color,color,border-color] duration-700 hover:duration-150",
    confirm:
      "border border-transparent bg-[rgb(var(--state-success))] text-[rgb(var(--bg-app))] hover:bg-[rgb(var(--state-success))]/90 font-market",
    cancel:
      "border border-transparent bg-[rgb(var(--state-error))] text-[rgb(var(--bg-app))] hover:bg-[rgb(var(--state-error))]/90 font-market",
    back:
      'bg-transparent border-divider text-fg-default hover:bg-panel/20 font-market',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  const isArcade = (variant as string).startsWith('arcade');
  const appliedSizeClass = isArcade ? sizeClasses.md : sizeClasses[size];

  const isDisabled = disabled || isLoading;
  const maybeBtnType = (props as React.ButtonHTMLAttributes<HTMLButtonElement>).type;
  const btnType: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] = maybeBtnType ?? 'button';

  const sharedProps = {
    className: cx(baseStyles, variantClasses[variant] || variantClasses.default, appliedSizeClass, className),
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
        <span className="relative z-10 transition-transform duration-100 ease-out group-active:translate-x-[1px] group-active:translate-y-[1px]">{children}</span>
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
      <span className="relative z-10 transition-transform duration-100 ease-out group-active:translate-x-[1px] group-active:translate-y-[1px]">{children}</span>
    </button>
  );
});

export default Button;
export { Button };
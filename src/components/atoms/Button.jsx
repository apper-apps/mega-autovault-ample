import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-red text-white hover:shadow-glow btn-glow",
    secondary: "bg-gradient-dark text-white hover:bg-opacity-90",
    outline: "border-2 border-crimson text-crimson hover:bg-crimson hover:text-white",
    gold: "bg-gradient-gold text-charcoal hover:shadow-glow btn-glow",
    ghost: "text-charcoal hover:bg-slate hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        "rounded-lg font-semibold transition-all duration-200 ease-out inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
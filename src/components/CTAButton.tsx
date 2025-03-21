import React from 'react';
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

const CTAButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  icon = false,
  onClick
}: CTAButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-md font-medium transition-all transform hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground focus:ring-ring",
    subtle: "bg-transparent text-primary hover:bg-primary/10 focus:ring-primary border border-primary/30"
  };
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3"
  };
  
  const iconStyles = icon ? "group" : "";

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        iconStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
      {icon && (
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
      )}
    </button>
  );
};

export default CTAButton;
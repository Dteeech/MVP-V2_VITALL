import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:hover:bg-gray-200"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
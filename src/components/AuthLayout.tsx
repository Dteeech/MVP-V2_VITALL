import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1555863962-415fd111c326?auto=format&fit=crop&q=80")',
      }}
    >
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
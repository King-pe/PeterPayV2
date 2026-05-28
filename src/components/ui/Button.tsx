import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500 shadow-sm',
    secondary:
    'bg-brand-950 text-white hover:bg-brand-900 focus:ring-brand-950 shadow-sm',
    outline:
    'border-2 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-200',
    ghost:
    'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-200',
    white:
    'bg-white text-brand-950 hover:bg-slate-50 focus:ring-white shadow-sm'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>);

  }
  return (
    <motion.button
      whileTap={{
        scale: 0.98
      }}
      className={classes}
      {...props}>
      
      {children}
    </motion.button>);

}
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [
  {
    name: 'Products',
    href: '/products'
  },
  {
    name: 'Developers',
    href: '/developers'
  },
  {
    name: 'Pricing',
    href: '/pricing'
  },
  {
    name: 'Company',
    href: '/about'
  }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3' : 'bg-transparent py-5'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-950 rounded-lg flex items-center justify-center group-hover:bg-brand-800 transition-colors">
              <span className="text-white font-bold text-lg leading-none">
                P
              </span>
            </div>
            <span
              className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-brand-950' : 'text-brand-950'}`}>
              
              PeterPay
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              
                {link.name}
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-brand-950 transition-colors">
              
              Sign in
            </Link>
            <Button href="/register" variant="primary" size="sm">
              Create account
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-white border-b border-slate-200 overflow-hidden">
          
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-lg">
              
                  {link.name}
                </Link>
            )}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3 px-3">
                <Link
                to="/login"
                className="flex items-center justify-between py-2 text-base font-medium text-slate-900">
                
                  Sign in <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Button href="/register" variant="primary" fullWidth>
                  Create account
                </Button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}
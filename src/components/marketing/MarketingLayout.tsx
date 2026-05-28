import React, { useEffect } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';
export function MarketingLayout({ children }: {children: React.ReactNode;}) {
  const location = useLocation();
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Nav />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>);

}
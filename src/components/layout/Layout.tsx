
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCheckoutButton } from '@/components/cart/FloatingCheckoutButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <FloatingCheckoutButton />
    </div>
  );
};

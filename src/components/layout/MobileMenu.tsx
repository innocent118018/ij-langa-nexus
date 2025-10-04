import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LogoutButton } from '@/components/auth/LogoutButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600 py-2"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-blue-600 py-2"
            onClick={onClose}
          >
            About
          </Link>
          <Link
            to="/services"
            className="block text-gray-700 hover:text-blue-600 py-2"
            onClick={onClose}
          >
            Services
          </Link>
          <Link
            to="/pricing"
            className="block text-gray-700 hover:text-blue-600 py-2"
            onClick={onClose}
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-600 py-2"
            onClick={onClose}
          >
            Contact
          </Link>
          
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-blue-600 py-2"
                onClick={onClose}
              >
                Dashboard
              </Link>
              <div className="pt-4 border-t">
                <LogoutButton className="w-full" />
              </div>
            </>
          ) : (
            <Link
              to="/auth"
              className="block w-full"
              onClick={onClose}
            >
              <Button className="w-full">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};
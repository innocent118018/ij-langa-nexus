import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-700">
            IJ Langa Consulting
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center hover:text-blue-600">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute bg-white shadow-lg mt-2 rounded-lg w-56 p-2">
                  <h4 className="px-2 py-1 font-semibold">Compliance</h4>
                  <Link
                    to="/services/income-tax/personal"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Personal Income Tax
                  </Link>
                  <Link
                    to="/services/income-tax/company"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Company & Trust Income Tax
                  </Link>
                  <Link
                    to="/services/provisional-tax/personal"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Provisional Tax (Personal)
                  </Link>
                  <Link
                    to="/services/provisional-tax/company"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Provisional Tax (Company)
                  </Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Login
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
          <Link to="/" className="block hover:text-blue-600">Home</Link>
          <Link to="/about" className="block hover:text-blue-600">About</Link>
          
          {/* Mobile Services Dropdown */}
          <details className="cursor-pointer">
            <summary className="font-medium">Services</summary>
            <div className="pl-4 mt-2 space-y-2">
              <span className="font-semibold">Compliance</span>
              <Link to="/services/income-tax/personal" className="block hover:text-blue-600">Personal Income Tax</Link>
              <Link to="/services/income-tax/company" className="block hover:text-blue-600">Company & Trust Income Tax</Link>
              <Link to="/services/provisional-tax/personal" className="block hover:text-blue-600">Provisional Tax (Personal)</Link>
              <Link to="/services/provisional-tax/company" className="block hover:text-blue-600">Provisional Tax (Company)</Link>
            </div>
          </details>

          <Link to="/contact" className="block hover:text-blue-600">Contact</Link>
          <Link to="/dashboard" className="block hover:text-blue-600">Dashboard</Link>
          <Link to="/login" className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Search, Phone, User, BookOpen, FileText, Mail, Plus } from 'lucide-react';
import { useAgencyBranding } from '../hooks/useAgencyBranding';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentAgency } = useAgencyBranding();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', icon: Home, href: '#home' },
    { name: 'PROPERTIES', icon: Search, href: '/properties' },
    { name: 'ABOUT', icon: User, href: '/about' },
    { name: 'CONTACT', icon: Mail, href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span 
              className="text-xl font-bold"
              style={{ color: currentAgency.color }}
            >
              {currentAgency.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.href) ? '' : 'text-gray-700'
                  }`}
                  style={{ 
                    color: isActive(item.href) ? currentAgency.color : undefined 
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color = currentAgency.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color = '';
                    }
                  }}
                >
                  {item.name}
                  <span 
                    className={`absolute -bottom-2 left-0 h-0.5 transition-all duration-200 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    style={{ backgroundColor: currentAgency.color }}
                  ></span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 transition-colors duration-200 relative group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = currentAgency.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                  }}
                >
                  {item.name}
                  <span 
                    className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full"
                    style={{ backgroundColor: currentAgency.color }}
                  ></span>
                </a>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/properties"
              className="text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              style={{ 
                backgroundColor: currentAgency.color,
                boxShadow: `0 4px 14px 0 ${currentAgency.color}40`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentAgency.secondaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentAgency.color;
              }}
            >
              <Plus className="w-4 h-4" />
              <span>View Properties</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 transition-colors duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentAgency.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
              }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 space-y-2">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href) 
                      ? 'bg-opacity-10' 
                      : 'text-gray-700 hover:bg-opacity-10'
                  }`}
                  style={{
                    color: isActive(item.href) ? currentAgency.color : undefined,
                    backgroundColor: isActive(item.href) ? `${currentAgency.color}20` : undefined
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color = currentAgency.color;
                      e.currentTarget.style.backgroundColor = `${currentAgency.color}20`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = currentAgency.color;
                    e.currentTarget.style.backgroundColor = `${currentAgency.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.backgroundColor = '';
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              )
            ))}
            
            <Link
              to="/properties"
              className="w-full mt-4 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              style={{ backgroundColor: currentAgency.color }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentAgency.secondaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentAgency.color;
              }}
            >
              <Plus className="w-4 h-4" />
              <span>View Properties</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
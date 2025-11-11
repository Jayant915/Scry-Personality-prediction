import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', name: 'Home' },
   // { path: '/about', name: 'About' },
    { path: '/upload', name: 'Upload' },
   // { path: '/working', name: 'Working' },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 px-4 sm:px-8 py-3 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-gray-950/90 backdrop-blur-sm'
      }`} // NEW Navbar background colors
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Link
            to="/"
            className="text-2xl font-bold bg-clip-text text-transparent tracking-wider"
            style={{
              backgroundImage: 'linear-gradient(to right, #93c5fd, #a78bfa)' // NEW Logo gradient (light blue to light purple)
            }}
          >
            SCRY
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group text-gray-300 font-medium transition-colors hover:text-blue-300" // NEW Desktop link colors
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNavLink"
                  className="absolute left-0 right-0 h-0.5 bg-blue-400 bottom-[-4px]" // NEW Active link underline color
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              {location.pathname !== item.path && (
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-blue-400 bottom-[-4px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" // NEW Hover link underline color
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // NEW Focus ring color
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="text-blue-300 text-2xl" /> // NEW Icon color
          ) : (
            <FiMenu className="text-blue-300 text-2xl" /> // NEW Icon color
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gray-900/95" // NEW Mobile menu background
      >
        <div className="pt-4 pb-6 px-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-900/50 text-blue-300' // NEW Active mobile link colors
                  : 'text-gray-300 hover:bg-gray-800 hover:text-blue-200' // NEW Inactive mobile link colors
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
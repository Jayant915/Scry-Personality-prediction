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
    { path: '/about', name: 'About' },   
    { path: '/upload', name: 'Upload' },
    { path: '/ocr', name: 'Ocr' },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 px-4 sm:px-8 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 shadow-xl border-b border-purple-400'
          : 'bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-cyan-600/90'
      } backdrop-blur-sm`}
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
            className="text-2xl font-bold text-transparent bg-clip-text tracking-wider"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff, #e9d5ff)',
            }}
          >
            Scry
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group text-white font-medium transition-colors hover:text-purple-200"
            >
              {item.name}

              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNavLink"
                  className="absolute left-0 right-0 h-0.5 bg-white bottom-[-4px]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {location.pathname !== item.path && (
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-white bottom-[-4px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="text-white text-2xl" />
          ) : (
            <FiMenu className="text-white text-2xl" />
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
        className="md:hidden overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600"
      >
        <div className="pt-4 pb-6 px-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-white/20 text-white'
                  : 'text-white hover:bg-white/10 hover:text-purple-100'
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

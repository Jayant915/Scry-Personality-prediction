import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ useLinks = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/upload', name: 'Upload' },
    { path: '/about', name: 'About' },
    { path: '/ocr', name: 'OCR' },
  ];

  const closeMenu = () => setIsOpen(false);

  // Animation variants
  const dropdownVariants = {
    closed: { opacity: 0, y: -10, scale: 0.8, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, staggerChildren: 0.05 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Brand */}
        {useLinks ? (
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">Scry</Link>
        ) : (
          <a href="/" className="text-2xl font-bold text-white tracking-wide">Scry</a>
        )}

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-between h-6 w-6 p-1 relative z-50"
        >
          <span className={`block h-0.5 w-full bg-white transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-full bg-white transition duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-full bg-white transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu below hamburger */}
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={dropdownVariants}
        className="absolute right-4 mt-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[150px] z-40"
      >
        <div className="flex flex-col">
          {navItems.map(item => {
            const linkClasses = `block px-4 py-2 text-gray-800 hover:bg-gray-200 font-medium`;

            return useLinks ? (
              <motion.div key={item.path} variants={itemVariants}>
                <Link to={item.path} className={linkClasses} onClick={closeMenu}>
                  {item.name}
                </Link>
              </motion.div>
            ) : (
              <motion.div key={item.path} variants={itemVariants}>
                <a href={item.path} className={linkClasses} onClick={closeMenu}>
                  {item.name}
                </a>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;

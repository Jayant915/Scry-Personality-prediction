import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ useLinks = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/upload', name: 'Analyze' },
    { path: '/about', name: 'About' },
    { path: '/ocr', name: 'OCR' },
  ];

  const closeMenu = () => setIsOpen(false);

  const dropdownVariants = {
    closed: { opacity: 0, y: -10, scale: 0.92, pointerEvents: 'none', transition: { duration: 0.2 } },
    open:   { opacity: 1, y: 0,   scale: 1,    pointerEvents: 'auto', transition: { duration: 0.25, staggerChildren: 0.05 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 10 },
    open:   { opacity: 1, x: 0  },
  };

  return (
    <>
      <style>{`
        .scry-nav-link {
          display: block;
          padding: 9px 18px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.04em;
          transition: all 0.18s;
          border-left: 2px solid transparent;
          background: transparent;
          text-decoration: none;
        }
        .scry-nav-link:hover {
          color: #c084fc;
          background: rgba(192,132,252,0.08);
          border-left-color: #c084fc;
        }
        .scry-hamburger-line {
          display: block;
          height: 1.5px;
          width: 100%;
          background: rgba(255,255,255,0.7);
          transform-origin: center;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: 58,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(139,92,246,0.18)',
        background: 'rgba(10,6,18,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}>

        {/* ── Brand ── */}
        {useLinks ? (
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BrandLogo />
          </Link>
        ) : (
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BrandLogo />
          </a>
        )}

        {/* ── Hamburger ── */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', height: 22, width: 24,
            position: 'relative', zIndex: 51,
          }}
          aria-label="Toggle menu"
        >
          <span className="scry-hamburger-line" style={{
            transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            background: isOpen ? '#c084fc' : 'rgba(255,255,255,0.7)',
          }} />
          <span className="scry-hamburger-line" style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'none',
          }} />
          <span className="scry-hamburger-line" style={{
            transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            background: isOpen ? '#c084fc' : 'rgba(255,255,255,0.7)',
          }} />
        </button>

        {/* ── Dropdown ── */}
        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={dropdownVariants}
          style={{
            position: 'absolute',
            top: 54,
            right: 16,
            minWidth: 160,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(139,92,246,0.25)',
            background: 'rgba(13,9,26,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(192,132,252,0.1)',
            zIndex: 40,
          }}
        >
          {/* subtle top glow line */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.5), rgba(103,232,249,0.3), transparent)',
          }} />

          <div style={{ padding: '6px 0' }}>
            {navItems.map((item, i) => (
              <motion.div key={item.path} variants={itemVariants}>
                {useLinks ? (
                  <Link to={item.path} className="scry-nav-link" onClick={closeMenu}>
                    {item.name}
                  </Link>
                ) : (
                  <a href={item.path} className="scry-nav-link" onClick={closeMenu}>
                    {item.name}
                  </a>
                )}
                {i < navItems.length - 1 && (
                  <div style={{ height: '0.5px', background: 'rgba(139,92,246,0.1)', margin: '0 12px' }} />
                )}
              </motion.div>
            ))}
          </div>

          {/* bottom badge */}
          <div style={{
            padding: '8px 18px',
            borderTop: '1px solid rgba(139,92,246,0.1)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#6ee7b7',
              boxShadow: '0 0 6px #6ee7b7',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
              BIG FIVE ANALYSIS
            </span>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

// ── Extracted brand so both <Link> and <a> can reuse it ──
const BrandLogo = () => (
  <>
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 800, color: '#fff',
      boxShadow: '0 0 14px rgba(124,58,237,0.55)',
      flexShrink: 0,
    }}>S</div>
    <span style={{
      fontSize: 17, fontWeight: 700,
      letterSpacing: '0.04em', color: '#fff',
    }}>Scry</span>
  </>
);

export default Navbar;
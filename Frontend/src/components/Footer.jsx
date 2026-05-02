import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub,   href: "#", label: "GitHub"  },
    { icon: FaTwitter,  href: "#", label: "Twitter" },
    { icon: FaEnvelope, href: "#", label: "Email"   },
  ];

  return (
    <>
      <style>{`
        .scry-footer-link {
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          text-decoration: none;
          transition: color 0.18s;
          letter-spacing: 0.03em;
        }
        .scry-footer-link:hover { color: #c084fc; }

        .scry-social-btn {
          width: 34px; height: 34px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(192,132,252,0.08);
          border: 1px solid rgba(139,92,246,0.2);
          color: rgba(255,255,255,0.45);
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .scry-social-btn:hover {
          background: rgba(192,132,252,0.18);
          border-color: rgba(192,132,252,0.45);
          color: #c084fc;
          box-shadow: 0 0 12px rgba(192,132,252,0.25);
        }
      `}</style>

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          marginTop: 48,
          borderTop: '1px solid rgba(139,92,246,0.18)',
          background: 'rgba(10,6,18,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* Top glow line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.6) 30%, rgba(6,182,212,0.4) 70%, transparent 100%)',
        }} />

        {/* Ambient glow blobs */}
        <div style={{
          position: 'absolute', bottom: -60, left: '10%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: -40, right: '8%',
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '40px 24px 28px',
          position: 'relative', zIndex: 1,
        }}>

          {/* ── Main row ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px 24px',
            marginBottom: 32,
            alignItems: 'start',
          }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: '#fff',
                  boxShadow: '0 0 14px rgba(124,58,237,0.5)',
                  flexShrink: 0,
                }}>S</div>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                  Scry
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 200, margin: 0 }}>
                AI-powered personality analysis through handwriting recognition.
              </p>
            </div>

            {/* About */}
            <div>
              <div style={sectionLabel}>About</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Based on the Big Five Model', 'Machine Learning Powered', 'Educational Purpose'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: '#7c3aed', flexShrink: 0,
                      boxShadow: '0 0 4px #7c3aed',
                    }} />
                    <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <div style={sectionLabel}>Connect</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="scry-social-btn"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
              <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)', margin: 0, lineHeight: 1.6 }}>
                Questions or feedback?<br />Reach out anytime.
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{
            height: '0.5px',
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
            marginBottom: 20,
          }} />

          {/* ── Bottom bar ── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#6ee7b7', boxShadow: '0 0 6px #6ee7b7',
              }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>
                BIG FIVE PERSONALITY ANALYSIS
              </span>
            </div>

            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.03em' }}>
              © {currentYear} Scry · Built with React & ML
            </span>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

const sectionLabel = {
  fontSize: 10,
  letterSpacing: '0.12em',
  color: 'rgba(255,255,255,0.25)',
  marginBottom: 14,
  textTransform: 'uppercase',
};

export default Footer;
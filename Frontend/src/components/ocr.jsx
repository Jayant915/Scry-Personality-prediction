import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const STARS = Array.from({ length: 70 }, () => ({
  x: Math.random() * 100, y: Math.random() * 100,
  s: Math.random() * 1.4 + 0.3, o: Math.random() * 0.35 + 0.08,
}));

const card = {
  borderRadius: 14,
  border: '1px solid rgba(139,92,246,0.2)',
  background: 'rgba(13,9,26,0.85)',
  backdropFilter: 'blur(16px)',
};

const dot = (color) => ({
  width: 7, height: 7, borderRadius: '50%',
  background: color, boxShadow: `0 0 7px ${color}`,
  flexShrink: 0,
});

export default function OCR() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setRecognizedText('');
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) { setError('Please select an image file first.'); return; }
    const formData = new FormData();
    formData.append('handwriting_image', selectedFile);
    setLoading(true); setError(''); setRecognizedText('');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/ocr-recognize', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setRecognizedText(response.data.recognized_text || '');
    } catch (err) {
      console.error('OCR Error:', err);
      setError(err.response?.data?.error || 'Failed to process image. Check server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      background: 'linear-gradient(135deg,#0a0612 0%,#0d0a1a 45%,#080e1c 100%)',
      minHeight: '100vh', color: '#e2e8f0',
      position: 'relative', overflowX: 'hidden',
    }}>

      {/* Starfield */}
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map((s, i) => <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.s} fill="white" opacity={s.o} />)}
      </svg>

      {/* Ambient glows */}
      <div style={{ position: 'fixed', top: -180, left: '15%', width: 580, height: 580, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(124,58,237,0.13) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: -100, right: '5%', width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 58,
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        background: 'rgba(10,6,18,0.7)', backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, fontSize: 13, fontWeight: 900, color: '#fff',
            background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 14px rgba(124,58,237,0.55)',
          }}>S</div>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '0.04em', color: '#fff' }}>Scry</span>
        </div>
        {/* <div style={{ display: 'flex', gap: 4 }}>
          {['Dashboard', 'Analysis', 'OCR', 'History'].map(item => (
            <button key={item} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500,
              background: item === 'OCR' ? 'rgba(124,58,237,0.25)' : 'transparent',
              border: item === 'OCR' ? '1px solid rgba(139,92,246,0.4)' : '1px solid transparent',
              color: item === 'OCR' ? '#c084fc' : 'rgba(255,255,255,0.45)',
            }}>{item}</button>
          ))}
        </div> */}
      </nav>

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '52px 24px 80px' }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(192,132,252,0.28)',
            padding: '5px 15px', borderRadius: 30, fontSize: 11.5, color: '#c084fc',
            marginBottom: 20, backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c084fc',
              boxShadow: '0 0 7px #c084fc', animation: 'pulse 2s infinite' }} />
            OCR Engine · Handwriting Recognition
          </div>

          <h1 style={{ margin: '0 0 14px', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            <span style={{
              fontSize: 50, fontWeight: 900,
              background: 'linear-gradient(90deg,#c084fc,#67e8f9)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Handwriting</span>
            {' '}
            <span style={{ fontSize: 50, fontWeight: 900, color: '#fff' }}>to Text</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Upload an image and our OCR engine will convert your handwriting into digital text instantly.
          </p>
        </motion.div>

        {/* Upload card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ ...card, padding: 28, marginBottom: 16 }}
        >
          {/* card header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 18,
            marginBottom: 22, borderBottom: '1px solid rgba(139,92,246,0.13)',
          }}>
            <span style={dot('#fcd34d')} />
            <span style={{ fontSize: 10, letterSpacing: '0.13em', color: 'rgba(255,255,255,0.38)' }}>
              HOW IT WORKS
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

            {/* Step 1 – Choose file */}
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', fontSize: 11, fontWeight: 800,
                  background: 'rgba(192,132,252,0.15)', border: '1px solid rgba(192,132,252,0.35)',
                  color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>1</span>
                Choose a File
              </div>

              <label style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 10, padding: '24px 16px', borderRadius: 10, cursor: 'pointer',
                border: '1.5px dashed rgba(192,132,252,0.3)',
                background: 'rgba(192,132,252,0.04)',
                transition: 'all 0.2s',
              }}>
                <input type="file" accept="image/*" onChange={handleFileChange}
                  style={{ display: 'none' }} />
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(192,132,252,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, color: '#c084fc',
                }}>↑</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#c084fc', fontWeight: 700 }}>Click to select image</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>PNG, JPG, JPEG</div>
                </div>
              </label>

              <AnimatePresence>
                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{
                      marginTop: 10, padding: '8px 12px', borderRadius: 8,
                      background: 'rgba(110,231,183,0.1)', border: '1px solid rgba(110,231,183,0.25)',
                      display: 'flex', alignItems: 'center', gap: 7,
                    }}
                  >
                    <span style={{ ...dot('#6ee7b7') }} />
                    <span style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 600, wordBreak: 'break-all' }}>
                      {selectedFile.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 2 – Run OCR */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 0,
                display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', fontSize: 11, fontWeight: 800,
                  background: 'rgba(103,232,249,0.15)', border: '1px solid rgba(103,232,249,0.35)',
                  color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>2</span>
                Start Recognition
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !selectedFile}
                style={{
                  flex: 1, padding: '0 0', minHeight: 110, borderRadius: 10, border: 'none',
                  cursor: loading || !selectedFile ? 'not-allowed' : 'pointer',
                  opacity: !selectedFile ? 0.4 : 1,
                  background: loading || !selectedFile
                    ? 'rgba(255,255,255,0.06)'
                    : 'linear-gradient(135deg,#7c3aed,#0891b2)',
                  color: '#fff', fontSize: 15, fontWeight: 800,
                  boxShadow: selectedFile && !loading ? '0 0 28px rgba(124,58,237,0.45),0 0 56px rgba(6,182,212,0.15)' : 'none',
                  transition: 'all 0.2s', letterSpacing: '0.02em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: 18, height: 18 }}
                      fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 20 }}>⬆</span>
                    Start Recognition
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '11px 16px', borderRadius: 10, marginBottom: 16,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#fca5a5', fontSize: 13,
              }}
            >
              ⚠ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recognized text output */}
        <AnimatePresence>
          {recognizedText && (
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ ...card, padding: 24 }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
                paddingBottom: 14, borderBottom: '1px solid rgba(139,92,246,0.13)',
              }}>
                <span style={dot('#6ee7b7')} />
                <span style={{ fontSize: 10, letterSpacing: '0.13em', color: 'rgba(255,255,255,0.38)' }}>
                  RECOGNISED TEXT
                </span>
                <span style={{
                  marginLeft: 'auto', fontSize: 10, fontWeight: 700,
                  padding: '3px 9px', borderRadius: 20,
                  background: 'rgba(110,231,183,0.12)', color: '#6ee7b7',
                  border: '1px solid rgba(110,231,183,0.25)',
                }}>✓ Complete</span>
              </div>

              <textarea
                readOnly
                value={recognizedText}
                style={{
                  width: '100%', minHeight: 160, padding: '14px 16px',
                  borderRadius: 10, resize: 'vertical',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(139,92,246,0.18)',
                  color: 'rgba(255,255,255,0.82)', fontSize: 14,
                  fontFamily: "'DM Mono','Fira Mono','Courier New',monospace",
                  lineHeight: 1.7, outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button
                  onClick={() => navigator.clipboard.writeText(recognizedText)}
                  style={{
                    padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
                    background: 'rgba(192,132,252,0.12)', border: '1px solid rgba(192,132,252,0.28)',
                    color: '#c084fc', fontSize: 12.5, fontWeight: 700,
                    transition: 'all 0.15s',
                  }}
                >⊕ Copy Text</button>
                <button
                  onClick={() => setRecognizedText('')}
                  style={{
                    padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                    color: 'rgba(255,255,255,0.45)', fontSize: 12.5, fontWeight: 600,
                    transition: 'all 0.15s',
                  }}
                >✕ Clear</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: rgba(192,132,252,0.25); border-radius: 4px; }
      `}</style>
    </div>
  );
}
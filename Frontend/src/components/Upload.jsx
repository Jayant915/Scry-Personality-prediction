import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiCheckCircle, FiAlertCircle, FiTrash2, FiRotateCcw, FiCamera, FiX } from 'react-icons/fi';
import Webcam from 'react-webcam';

// ─── helpers ────────────────────────────────────────────────────────────────

function getConfidenceColor(value) {
  if (value >= 0.8) return '#4ade80';
  if (value >= 0.5) return '#facc15';
  return '#f87171';
}

const TRAIT_META = {
  Openness:         { short: 'O', color: '#a78bfa', glow: '#7c3aed', desc: 'Imaginative, curious, open to new experiences.' },
  Conscientiousness:{ short: 'C', color: '#f472b6', glow: '#db2777', desc: 'Organized, responsible, disciplined.' },
  Extraversion:     { short: 'E', color: '#fb923c', glow: '#ea580c', desc: 'Outgoing, energetic, sociable.' },
  Agreeableness:    { short: 'A', color: '#34d399', glow: '#059669', desc: 'Compassionate, cooperative, kind.' },
  Neuroticism:      { short: 'N', color: '#60a5fa', glow: '#2563eb', desc: 'Emotionally sensitive, anxious at times.' },
};

// ─── Webcam Modal ────────────────────────────────────────────────────────────

function WebcamModal({ onCapture, onClose }) {
  const webcamRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [facingMode, setFacingMode] = useState('user');

  const handleCapture = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) onCapture(screenshot);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#1a1a2e', border: '1px solid #7F77DD44', maxWidth: 480, width: '90%' }}
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #7F77DD22' }}>
          <div className="flex items-center gap-2">
            <FiCamera style={{ color: '#7F77DD' }} />
            <span style={{ color: '#e2e2f0', fontWeight: 600, fontSize: 15 }}>Webcam Capture</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full w-8 h-8 transition-all"
            style={{ background: '#ffffff10', color: '#aaa' }}
          >
            <FiX size={15} />
          </button>
        </div>

        {/* Camera feed */}
        <div className="relative" style={{ background: '#0d0d1a' }}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode }}
            onUserMedia={() => setReady(true)}
            onUserMediaError={() => setReady(false)}
            style={{ width: '100%', display: 'block', maxHeight: 320, objectFit: 'cover' }}
          />

          {/* Viewfinder overlay */}
          {ready && (
            <div className="absolute inset-0 pointer-events-none" style={{ border: '2px solid transparent' }}>
              {/* Corner brackets */}
              {[
                { top: 12, left: 12, borderTop: '2px solid #7F77DD', borderLeft: '2px solid #7F77DD' },
                { top: 12, right: 12, borderTop: '2px solid #7F77DD', borderRight: '2px solid #7F77DD' },
                { bottom: 12, left: 12, borderBottom: '2px solid #7F77DD', borderLeft: '2px solid #7F77DD' },
                { bottom: 12, right: 12, borderBottom: '2px solid #7F77DD', borderRight: '2px solid #7F77DD' },
              ].map((style, i) => (
                <div key={i} className="absolute" style={{ ...style, width: 20, height: 20 }} />
              ))}
            </div>
          )}

          {/* Not ready state */}
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#0d0d1a' }}>
              <div style={{ color: '#7F77DD', fontSize: 13 }}>Initializing camera…</div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-5 py-4 gap-3">
          {/* Flip camera (useful on mobile) */}
          <button
            onClick={() => setFacingMode(f => f === 'user' ? 'environment' : 'user')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
            style={{ background: '#ffffff0d', color: '#aaa', border: '1px solid #ffffff10' }}
          >
            <FiRotateCcw size={14} />
            Flip
          </button>

          <button
            onClick={handleCapture}
            disabled={!ready}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: ready ? 'linear-gradient(135deg, #7F77DD, #a78bfa)' : '#333',
              color: ready ? '#fff' : '#666',
              cursor: ready ? 'pointer' : 'not-allowed',
              boxShadow: ready ? '0 0 16px #7F77DD55' : 'none',
            }}
          >
            <FiCamera size={16} />
            Capture Photo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Upload Component ───────────────────────────────────────────────────

const Upload = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [hasContent, setHasContent] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false); // ✅ FIX: track mouse button state

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#7F77DD';
    ctxRef.current = ctx;
  };

  // ─── Drawing (fixed: only draw while mouse is down) ──────────────────────

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    // Support both mouse and touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return; // ✅ FIX: guard
    const { x, y } = getPos(e);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    setHasContent(true);
  };

  const stopDrawing = () => setIsDrawing(false);

  // ─── Clear ───────────────────────────────────────────────────────────────

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    setAnalysisResult(null);
    setError(null);
  };

  // ─── File upload → draw onto canvas ─────────────────────────────────────

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      ctxRef.current.drawImage(img, 0, 0, canvas.width, canvas.height);
      setHasContent(true);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  // ─── Webcam capture → draw onto canvas ──────────────────────────────────

  const handleWebcamCapture = (dataUrl) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      ctxRef.current.drawImage(img, 0, 0, canvas.width, canvas.height);
      setHasContent(true);
      setShowWebcam(false); // ✅ close modal after capture
    };
    img.src = dataUrl;
  };

  // ─── Analyze ─────────────────────────────────────────────────────────────

  const analyzeCanvas = async () => {
    if (!hasContent) return;
    setIsProcessing(true);
    setError(null);

    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append('image', blob, 'canvas.png');

      const res = await fetch('http://127.0.0.1:5000/upload_and_analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const result = await res.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'Analysis failed. Is the server running?');
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="p-6 space-y-5" style={{ maxWidth: 520 }}>

      {/* Canvas */}
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1.5px solid #7F77DD44', boxShadow: '0 0 20px #7F77DD22' }}>
        <canvas
          ref={canvasRef}
          width={480}
          height={220}
          style={{ display: 'block', background: '#fff', cursor: 'crosshair', width: '100%' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}       // ✅ FIX: stop drawing when leaving canvas
          onTouchStart={startDrawing}       // ✅ touch support
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={clearCanvas}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all"
          style={{ background: '#ffffff0d', color: '#ccc', border: '1px solid #ffffff15' }}
        >
          <FiTrash2 size={14} /> Clear
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all"
          style={{ background: '#ffffff0d', color: '#ccc', border: '1px solid #ffffff15' }}
        >
          <FiUpload size={14} /> Upload Image
        </button>

        {/* ✅ Webcam button */}
        <button
          onClick={() => setShowWebcam(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all"
          style={{ background: '#7F77DD22', color: '#a78bfa', border: '1px solid #7F77DD44' }}
        >
          <FiCamera size={14} /> Webcam
        </button>

        <button
          onClick={analyzeCanvas}
          disabled={!hasContent || isProcessing}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ml-auto"
          style={{
            background: hasContent && !isProcessing ? 'linear-gradient(135deg, #7F77DD, #a78bfa)' : '#333',
            color: hasContent && !isProcessing ? '#fff' : '#666',
            cursor: hasContent && !isProcessing ? 'pointer' : 'not-allowed',
          }}
        >
          <FiCheckCircle size={14} />
          {isProcessing ? 'Analyzing…' : 'Analyze'}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ background: '#f8717122', border: '1px solid #f8717144', color: '#fca5a5' }}
          >
            <FiAlertCircle /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 rounded-xl space-y-3"
            style={{ background: '#ffffff08', border: '1px solid #7F77DD33' }}
          >
            <p style={{ color: '#e2e2f0', fontWeight: 600 }}>{analysisResult.class}</p>

            {/* Optional: trait bars if your API returns them */}
            {analysisResult.traits && Object.entries(analysisResult.traits).map(([trait, value]) => {
              const meta = TRAIT_META[trait];
              if (!meta) return null;
              return (
                <div key={trait} className="space-y-1">
                  <div className="flex justify-between text-xs" style={{ color: '#aaa' }}>
                    <span>{trait}</span>
                    <span style={{ color: getConfidenceColor(value) }}>{Math.round(value * 100)}%</span>
                  </div>
                  <div style={{ background: '#ffffff10', borderRadius: 99, height: 6 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{ height: '100%', borderRadius: 99, background: meta.color }}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Webcam Modal */}
      <AnimatePresence>
        {showWebcam && (
          <WebcamModal
            onCapture={handleWebcamCapture}
            onClose={() => setShowWebcam(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Upload;
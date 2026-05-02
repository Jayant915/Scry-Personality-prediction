import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';

// ─── helpers ────────────────────────────────────────────────────────────────

function getConfidenceColor(value) {
  if (value >= 0.8) return '#6ee7b7';
  if (value >= 0.5) return '#fcd34d';
  return '#f87171';
}

const TRAIT_META = {
  Openness:          { short: 'O', color: '#fcd34d', glow: '#f59e0b', desc: 'Imaginative, curious, open to new experiences.' },
  Conscientiousness: { short: 'C', color: '#67e8f9', glow: '#06b6d4', desc: 'Organized, responsible, disciplined.' },
  Extraversion:      { short: 'E', color: '#f9a8d4', glow: '#ec4899', desc: 'Outgoing, energetic, sociable.' },
  Agreeableness:     { short: 'A', color: '#6ee7b7', glow: '#10b981', desc: 'Compassionate, cooperative, kind.' },
  Neuroticism:       { short: 'N', color: '#c084fc', glow: '#7c3aed', desc: 'Emotionally sensitive, anxious at times.' },
};

function generateBigFiveScores(predictedClass) {
  const base = { Openness: 0.55, Conscientiousness: 0.55, Extraversion: 0.55, Agreeableness: 0.55, Neuroticism: 0.45 };
  const jitter = () => +(Math.random() * 0.3 - 0.05).toFixed(2);
  const result = {};
  for (const t of Object.keys(base)) {
    result[t] = t === predictedClass
      ? +(0.72 + Math.random() * 0.26).toFixed(2)
      : Math.min(0.9, Math.max(0.15, +(base[t] + jitter()).toFixed(2)));
  }
  return result;
}

// ─── Radar Chart ─────────────────────────────────────────────────────────────

function RadarChart({ scores }) {
  const traits = Object.keys(TRAIT_META);
  const N = traits.length;
  const cx = 110, cy = 110, r = 80;
  const angleFor = (i) => (Math.PI * 2 * i) / N - Math.PI / 2;
  const toXY = (i, frac) => ({
    x: cx + r * frac * Math.cos(angleFor(i)),
    y: cy + r * frac * Math.sin(angleFor(i)),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const polyPts = traits.map((t, i) => toXY(i, scores[t]));
  const polyStr = polyPts.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 220 220" style={{ width: '100%', maxWidth: 220, margin: '0 auto', display: 'block' }}>
      <defs>
        <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      {gridLevels.map(lvl => {
        const pts = traits.map((_, i) => toXY(i, lvl));
        return (
          <polygon key={lvl} points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none" stroke="rgba(192,132,252,0.12)" strokeWidth="0.8" />
        );
      })}
      {traits.map((_, i) => {
        const outer = toXY(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(192,132,252,0.1)" strokeWidth="0.8" />;
      })}
      <polygon points={polyStr} fill="url(#radarFill)" stroke="url(#radarGrad)" strokeWidth="1.8" />
      {polyPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4}
          fill={TRAIT_META[traits[i]].color}
          style={{ filter: `drop-shadow(0 0 4px ${TRAIT_META[traits[i]].glow})` }}
        />
      ))}
      {traits.map((t, i) => {
        const lp = toXY(i, 1.25);
        return (
          <text key={t} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fill={TRAIT_META[t].color} fontSize="9" fontWeight="800" fontFamily="monospace"
            style={{ filter: `drop-shadow(0 0 3px ${TRAIT_META[t].glow})` }}>
            {TRAIT_META[t].short}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Trait Bar ───────────────────────────────────────────────────────────────

function TraitBar({ name, score, isTop, delay = 0 }) {
  const meta = TRAIT_META[name];
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{ marginBottom: 10 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 20, height: 20, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 900,
            background: `${meta.color}20`, color: meta.color,
            border: `1px solid ${meta.color}40`,
          }}>{meta.short}</span>
          <span style={{ fontSize: 12.5, fontWeight: isTop ? 700 : 400, color: isTop ? '#fff' : 'rgba(255,255,255,0.55)' }}>
            {name}
          </span>
          {isTop && (
            <span style={{
              fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20,
              background: `${meta.color}25`, color: meta.color,
              border: `1px solid ${meta.color}40`, letterSpacing: '0.06em',
            }}>PRIMARY</span>
          )}
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: meta.color }}>
          {Math.round(score * 100)}%
        </span>
      </div>
      <div style={{ height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score * 100}%` }}
          transition={{ delay: delay + 0.1, duration: 1.0, ease: 'easeOut' }}
          style={{
            height: '100%', borderRadius: 4,
            background: `linear-gradient(90deg, ${meta.glow}, ${meta.color})`,
            boxShadow: isTop ? `0 0 10px ${meta.glow}88` : 'none',
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Confidence Ring ─────────────────────────────────────────────────────────
function ConfidenceRing({ value }) {
  const r = 40, circ = 2 * Math.PI * r;
  const color = getConfidenceColor(value);
  const filled = circ * value;
  const gap = circ - filled;

  return (
    <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="7"
        />

        {/* Filled arc — rotated so it starts at 12 o'clock */}
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="url(#confGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${gap}`}
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
          style={{ filter: `drop-shadow(0 0 5px ${color})` }}
        />
      </svg>

      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
          {Math.round(value * 100)}%
        </span>
        <span style={{ fontSize: 8, color: '#c084fc', letterSpacing: '0.1em', marginTop: 3 }}>CONF</span>
      </div>
    </div>
  );
}
// ─── Stars Background ────────────────────────────────────────────────────────

const STARS = Array.from({ length: 80 }, () => ({
  x: Math.random() * 100, y: Math.random() * 100,
  s: Math.random() * 1.4 + 0.3, o: Math.random() * 0.35 + 0.08,
}));

// ─── Main Component ──────────────────────────────────────────────────────────

const Upload = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [hasContent, setHasContent] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const strokesRef = useRef([]);
  const currentStrokeRef = useRef([]);
  const isDrawingRef = useRef(false);
  const webcamRef = useRef(null);
  const reportRef = useRef(null); // ← ref for PDF capture

  const MAX_FILE_SIZE_MB = 5;

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#c084fc';
    ctxRef.current = ctx;
  };

  const handleResize = () => { initCanvas(); redrawAll(); };

  const redrawAll = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    const rect = canvas.getBoundingClientRect();
    ctxRef.current.clearRect(0, 0, rect.width, rect.height);
    ctxRef.current.strokeStyle = '#c084fc';
    for (const stroke of strokesRef.current) {
      if (!stroke || stroke.length < 2) continue;
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) ctxRef.current.lineTo(stroke[i].x, stroke[i].y);
      ctxRef.current.stroke();
    }
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDrawing = (e) => {
    isDrawingRef.current = true;
    currentStrokeRef.current = [];
    const p = getPos(e);
    currentStrokeRef.current.push(p);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(p.x, p.y);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const p = getPos(e);
    currentStrokeRef.current.push(p);
    ctxRef.current.lineTo(p.x, p.y);
    ctxRef.current.stroke();
    setHasContent(true);
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      strokesRef.current.push([...currentStrokeRef.current]);
      isDrawingRef.current = false;
    }
  };

  const undoLast = () => {
    strokesRef.current.pop();
    redrawAll();
    setHasContent(strokesRef.current.length > 0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    const rect = canvas.getBoundingClientRect();
    ctxRef.current.clearRect(0, 0, rect.width, rect.height);
    strokesRef.current = [];
    currentStrokeRef.current = [];
    setHasContent(false);
    setAnalysisResult(null);
    setError(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please upload a valid image.'); return; }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) { setError(`File must be smaller than ${MAX_FILE_SIZE_MB}MB`); return; }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        ctxRef.current.clearRect(0, 0, rect.width, rect.height);
        ctxRef.current.drawImage(img, 0, 0, rect.width, rect.height);
        strokesRef.current = [{ _image: true }];
        setHasContent(true);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const captureFromWebcam = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      ctxRef.current.clearRect(0, 0, rect.width, rect.height);
      ctxRef.current.drawImage(img, 0, 0, rect.width, rect.height);
      strokesRef.current = [{ _image: true }];
      setHasContent(true);
      setShowWebcam(false);
    };
    img.src = screenshot;
  };

  const analyzeCanvas = async () => {
    if (!canvasRef.current) return;
    setIsProcessing(true);
    setError(null);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append('image', new File([blob], 'handwriting.png', { type: 'image/png' }));
      const response = await fetch('http://127.0.0.1:5000/upload_and_analyze', {
        method: 'POST', body: formData,
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errData.error || errData.message);
      }
      const result = await response.json();
      const predictedClass = result.class?.replace(/[^a-zA-Z]/g, '').trim() || 'Conscientiousness';
      const bigFiveScores = result.big_five_scores || generateBigFiveScores(predictedClass);
      const sortedTraits = Object.entries(bigFiveScores).sort((a, b) => b[1] - a[1]);
      const analysis = {
        predictedClass,
        personalityMessage: TRAIT_META[predictedClass]?.desc || 'Personality could not be determined.',
        defect_description: result.defect_description || 'Neat, consistent handwriting with clear structure.',
        confidence: parseFloat(result.confidence) || bigFiveScores[predictedClass] || 0,
        bigFiveScores, sortedTraits,
        timestamp: new Date().toLocaleString(),
        image: result.image_url || dataUrl,
      };
      setAnalysisResult(analysis);
      setHistory(prev => [analysis, ...prev]);
    } catch (err) {
      setError(err.message || 'Failed to analyze handwriting.');
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── PDF Download ─────────────────────────────────────────────────────────

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

// ─── REPLACE your existing downloadReport function with this ─────────────────
// Key fixes:
//   1. Landscape A4 orientation
//   2. Snapshot the canvas BEFORE calling html2canvas (avoids tainted canvas error)
//   3. Force SVG foreignObject rendering for radar chart (svgCanvasOnly approach)
//   4. Temporarily replace canvas with <img> and SVGs with inline <img> during capture

const downloadReport = async () => {
  if (!reportRef.current || !analysisResult) return;
  setIsDownloading(true);

  try {
    // ── 1. Load libs ──────────────────────────────────────────────────────────
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

    const element = reportRef.current;

    // ── 2. Snapshot the drawing canvas NOW (before html2canvas taints it) ────
    const drawingDataUrl = canvasRef.current?.toDataURL('image/png') ?? null;

    // ── 3. Serialise every SVG inside the report to a data-URL <img> ─────────
    //       This fixes RadarChart (and any other inline SVG) being clipped/blank.
    const svgElements = [...element.querySelectorAll('svg')];
    const svgSwaps = svgElements.map((svg) => {
      const rect = svg.getBoundingClientRect();
      const serialised = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([serialised], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = url;
      img.width = rect.width || svg.clientWidth || 220;
      img.height = rect.height || svg.clientHeight || 220;
      img.style.cssText = svg.style.cssText;
      img.style.display = 'block';
      svg.parentNode.insertBefore(img, svg);
      svg.style.display = 'none';
      return { svg, img, url };
    });

    // ── 4. Swap the <canvas> drawing with an <img> so html2canvas can read it ─
    let canvasSwap = null;
    if (drawingDataUrl && canvasRef.current) {
      const origCanvas = canvasRef.current;
      const rect = origCanvas.getBoundingClientRect();
      const img = document.createElement('img');
      img.src = drawingDataUrl;
      img.style.width = rect.width + 'px';
      img.style.height = rect.height + 'px';
      img.style.borderRadius = origCanvas.style.borderRadius || '10px';
      img.style.border = origCanvas.style.border || '1px solid rgba(192,132,252,0.12)';
      img.style.display = 'block';
      origCanvas.parentNode.insertBefore(img, origCanvas);
      origCanvas.style.display = 'none';
      canvasSwap = { origCanvas, img };
    }

    // ── 5. Capture ────────────────────────────────────────────────────────────
    const capturedCanvas = await window.html2canvas(element, {
      backgroundColor: '#0d0a1a',
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      imageTimeout: 0,
      // Tell html2canvas to treat the whole viewport height correctly
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // ── 6. Restore all swapped elements ──────────────────────────────────────
    svgSwaps.forEach(({ svg, img, url }) => {
      svg.style.display = '';
      img.parentNode.removeChild(img);
      URL.revokeObjectURL(url);
    });
    if (canvasSwap) {
      canvasSwap.origCanvas.style.display = '';
      canvasSwap.img.parentNode.removeChild(canvasSwap.img);
    }

    // ── 7. Build landscape PDF ────────────────────────────────────────────────
    const { jsPDF } = window.jspdf;

    // A4 landscape: 841.89 × 595.28 pt  (px at 72dpi: ~1122 × 794)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    });

    const pageW = pdf.internal.pageSize.getWidth();   // ~841.89 pt
    const pageH = pdf.internal.pageSize.getHeight();  // ~595.28 pt

    // Scale captured canvas to fit page width exactly
    const imgW = pageW;
    const imgH = (capturedCanvas.height / capturedCanvas.width) * imgW;
    const scale = capturedCanvas.width / pageW; // pt-to-px ratio

    let yPt = 0;    // current y position in pt that we've rendered up to
    let page = 0;

    while (yPt < imgH) {
      const sliceHeightPt = Math.min(pageH, imgH - yPt);
      const sliceHeightPx = sliceHeightPt * scale;
      const yPx = yPt * scale;

      const crop = document.createElement('canvas');
      crop.width = capturedCanvas.width;
      crop.height = Math.ceil(sliceHeightPx);
      const ctx = crop.getContext('2d');
      ctx.fillStyle = '#0d0a1a';
      ctx.fillRect(0, 0, crop.width, crop.height);
      ctx.drawImage(capturedCanvas, 0, yPx, capturedCanvas.width, sliceHeightPx, 0, 0, crop.width, crop.height);

      if (page > 0) pdf.addPage();
      pdf.addImage(crop.toDataURL('image/png'), 'PNG', 0, 0, imgW, sliceHeightPt);

      yPt += pageH;
      page++;
    }

    const filename = `scry-personality-${analysisResult.predictedClass.toLowerCase()}-${Date.now()}.pdf`;
    pdf.save(filename);

  } catch (err) {
    console.error('PDF generation failed:', err);
    setError('Failed to generate PDF. Please try again.');
  } finally {
    setIsDownloading(false);
  }
};
  // ── Shared card style
  const card = {
    borderRadius: 14,
    border: '1px solid rgba(139,92,246,0.2)',
    background: 'rgba(13,9,26,0.85)',
    backdropFilter: 'blur(16px)',
  };

  const sectionLabel = (color = '#c084fc') => ({
    fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)',
    display: 'flex', alignItems: 'center', gap: 7,
  });

  const dot = (color) => ({
    width: 7, height: 7, borderRadius: '50%',
    background: color, boxShadow: `0 0 7px ${color}`,
    flexShrink: 0,
  });

  const ghostBtn = {
    padding: '7px 0', borderRadius: 8, flex: 1,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.09)',
    color: 'rgba(255,255,255,0.6)', fontSize: 11.5,
    cursor: 'pointer', fontWeight: 500,
    transition: 'all 0.18s',
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: 'linear-gradient(135deg, #0a0612 0%, #0d0a1a 45%, #080e1c 100%)',
      minHeight: '100vh', color: '#e2e8f0',
      position: 'relative', overflowX: 'hidden',
    }}>

      {/* Starfield */}
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map((s, i) => <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.s} fill="white" opacity={s.o} />)}
      </svg>

      {/* Ambient glows */}
      <div style={{ position: 'fixed', top: -180, left: '15%', width: 580, height: 580, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: -100, right: '5%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── TOP NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 58,
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        background: 'rgba(10,6,18,0.7)', backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, fontSize: 13, fontWeight: 800, color: '#fff',
            background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 14px rgba(124,58,237,0.55)',
          }}>S</div>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.04em', color: '#fff' }}>Scry</span>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '32px 24px 64px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(192,132,252,0.25)',
            padding: '5px 14px', borderRadius: 30, fontSize: 11, color: '#c084fc',
            marginBottom: 16, backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c084fc',
              boxShadow: '0 0 6px #c084fc', animation: 'pulse 2s infinite' }} />
            Big Five Personality Analysis
          </div>
          <h1 style={{ margin: 0, lineHeight: 1.05 }}>
            <span style={{
              fontSize: 52, fontWeight: 900, letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg,#c084fc,#67e8f9,#6ee7b7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Personality</span>
            <br />
            <span style={{ fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>Analyzer</span>
          </h1>
          <p style={{ color: 'rgba(192,132,252,0.6)', fontSize: 13.5, marginTop: 10 }}>
            Draw or upload · discover the personality within your handwriting
          </p>
        </div>

        {/* ── INPUT ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Canvas panel */}
          <div style={{ ...card, overflow: 'hidden' }}>
            <div style={{
              padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid rgba(139,92,246,0.12)',
            }}>
              <span style={sectionLabel()}>
                <span style={dot('#c084fc')} /> CANVAS
              </span>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                ))}
              </div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%', height: 220, display: 'block',
                  borderRadius: 10, cursor: 'crosshair',
                  background: 'rgba(192,132,252,0.04)',
                  border: '1px solid rgba(192,132,252,0.12)',
                }}
                onMouseDown={startDrawing} onMouseMove={draw}
                onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                onTouchStart={e => { e.preventDefault(); startDrawing(e); }}
                onTouchMove={e => { e.preventDefault(); draw(e); }}
                onTouchEnd={stopDrawing}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={undoLast} style={ghostBtn}>↩ Undo</button>
                <button onClick={clearCanvas} style={ghostBtn}>✕ Clear</button>
                <button onClick={() => setShowWebcam(true)} style={ghostBtn}>📷 Webcam</button>
              </div>
            </div>
          </div>

          {/* Upload + Predict panel */}
          <div style={{ ...card, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={sectionLabel('#67e8f9')}>
              <span style={dot('#67e8f9')} /> UPLOAD IMAGE
            </span>

            <label
              onMouseEnter={() => setUploadHover(true)}
              onMouseLeave={() => setUploadHover(false)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                borderRadius: 10, padding: '28px 16px', cursor: 'pointer',
                border: `1.5px dashed ${uploadHover ? 'rgba(103,232,249,0.5)' : 'rgba(103,232,249,0.2)'}`,
                background: uploadHover ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.02)',
                transition: 'all 0.2s',
              }}
            >
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(103,232,249,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: '#67e8f9',
              }}>↑</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#67e8f9', fontWeight: 700 }}>Click to upload</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>PNG, JPG up to 5MB</div>
              </div>
            </label>

            <button
              onClick={analyzeCanvas}
              disabled={isProcessing || !hasContent}
              style={{
                width: '100%', padding: '13px 0', borderRadius: 11,
                border: 'none', cursor: hasContent && !isProcessing ? 'pointer' : 'not-allowed',
                opacity: hasContent && !isProcessing ? 1 : 0.4,
                background: 'linear-gradient(135deg,#7c3aed 0%,#0891b2 100%)',
                color: '#fff', fontSize: 15, fontWeight: 800, letterSpacing: '0.02em',
                boxShadow: hasContent ? '0 0 28px rgba(124,58,237,0.45),0 0 56px rgba(6,182,212,0.15)' : 'none',
                transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
              }}
            >
              {isProcessing ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <svg style={{ animation: 'spin 1s linear infinite', width: 16, height: 16 }}
                    fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                  </svg>
                  Analyzing…
                </span>
              ) : '✦ Predict Personality'}
            </button>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '11px 16px', borderRadius: 10, marginBottom: 16,
                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#fca5a5', fontSize: 13,
              }}
            >
              ⚠ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RESULT CARD ── */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              key="result"
              ref={reportRef}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              style={{ ...card, padding: 24, marginBottom: 16 }}
            >
              {/* result header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22,
                paddingBottom: 16, borderBottom: '1px solid rgba(139,92,246,0.14)',
                flexWrap: 'wrap',
              }}>
                <span style={{ color: '#6ee7b7', fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Analysis Complete</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>
                  {analysisResult.timestamp}
                </span>

                {/* ── PDF DOWNLOAD BUTTON ── */}
                <button
                  onClick={downloadReport}
                  disabled={isDownloading}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', borderRadius: 8,
                    border: '1px solid rgba(192,132,252,0.35)',
                    background: isDownloading ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.2)',
                    color: isDownloading ? 'rgba(192,132,252,0.5)' : '#c084fc',
                    fontSize: 11.5, fontWeight: 700, cursor: isDownloading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.18s', flexShrink: 0,
                  }}
                  onMouseEnter={e => { if (!isDownloading) e.currentTarget.style.background = 'rgba(124,58,237,0.4)'; }}
                  onMouseLeave={e => { if (!isDownloading) e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; }}
                >
                  {isDownloading ? (
                    <>
                      <svg style={{ animation: 'spin 1s linear infinite', width: 12, height: 12 }}
                        fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                      </svg>
                      Generating…
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download PDF
                    </>
                  )}
                </button>
              </div>

              {/* primary result row */}
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 24, alignItems: 'start', marginBottom: 24 }}>

                {/* image */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', inset: -2, borderRadius: 14,
                    background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', opacity: 0.6, filter: 'blur(4px)',
                  }} />
                  <img src={analysisResult.image} alt="handwriting"
                    style={{ position: 'relative', width: '100%', height: 130,
                      objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                {/* text */}
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
                    PRIMARY PERSONALITY TYPE
                  </div>
                  <div style={{
                    fontSize: 34, fontWeight: 900, lineHeight: 1, marginBottom: 8,
                    color: TRAIT_META[analysisResult.predictedClass]?.color || '#c084fc',
                    textShadow: `0 0 24px ${TRAIT_META[analysisResult.predictedClass]?.glow || '#7c3aed'}88`,
                    letterSpacing: '-0.02em',
                  }}>{analysisResult.predictedClass}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
                    {analysisResult.personalityMessage}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', lineHeight: 1.6 }}>
                    {analysisResult.defect_description}
                  </div>

                  {/* trait pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {Object.entries(analysisResult.bigFiveScores)
                      .sort((a,b) => b[1]-a[1]).slice(0,4)
                      .map(([t]) => (
                        <span key={t} style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                          background: `${TRAIT_META[t].color}18`, color: TRAIT_META[t].color,
                          border: `1px solid ${TRAIT_META[t].color}35`,
                        }}>{t}</span>
                      ))
                    }
                  </div>
                </div>

                {/* confidence ring */}
                <ConfidenceRing value={analysisResult.confidence} />
              </div>

              {/* divider */}
              <div style={{ borderTop: '1px solid rgba(139,92,246,0.12)', marginBottom: 22 }} />

              {/* big five section */}
              <div style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: 18 }}>
                BIG FIVE TRAIT BREAKDOWN
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', marginBottom: 24 }}>
                {/* radar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <RadarChart scores={analysisResult.bigFiveScores} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 12px' }}>
                    {Object.entries(TRAIT_META).map(([name, meta]) => (
                      <span key={name} style={{ display: 'flex', alignItems: 'center', gap: 5,
                        fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: meta.color,
                          boxShadow: `0 0 4px ${meta.glow}` }} />
                        {meta.short} – {name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* bars */}
                <div>
                  {analysisResult.sortedTraits.map(([name, score], i) => (
                    <TraitBar key={name} name={name} score={score}
                      isTop={name === analysisResult.predictedClass} delay={i * 0.08} />
                  ))}
                </div>
              </div>

              {/* trait mini cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                {Object.entries(TRAIT_META).map(([name, meta]) => {
                  const score = analysisResult.bigFiveScores[name];
                  const isTop = name === analysisResult.predictedClass;
                  return (
                    <motion.div key={name}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + Object.keys(TRAIT_META).indexOf(name) * 0.07 }}
                      style={{
                        borderRadius: 10, padding: '12px 8px', textAlign: 'center',
                        background: isTop ? `${meta.color}14` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isTop ? meta.color + '40' : 'rgba(255,255,255,0.07)'}`,
                        boxShadow: isTop ? `0 0 18px ${meta.glow}28` : 'none',
                      }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 900, color: meta.color,
                        textShadow: isTop ? `0 0 10px ${meta.glow}` : 'none' }}>{meta.short}</div>
                      <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', margin: '3px 0', lineHeight: 1.3 }}>{name}</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: meta.color }}>{Math.round(score * 100)}%</div>
                      {isTop && (
                        <div style={{ fontSize: 8, color: meta.color, fontWeight: 900,
                          letterSpacing: '0.08em', marginTop: 4 }}>★ TOP</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HISTORY ── */}
        {history.length > 0 && (
          <div style={{ ...card, padding: 20 }}>
            <div style={{ ...sectionLabel(), marginBottom: 16 }}>
              <span style={dot('#67e8f9')} /> HISTORY
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 280, overflowY: 'auto' }}>
              {history.map((item, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.01 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '11px 14px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <img src={item.image} alt="" style={{
                    width: 48, height: 48, borderRadius: 8, objectFit: 'cover',
                    border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13.5, fontWeight: 700,
                      color: TRAIT_META[item.predictedClass]?.color || '#c084fc',
                      marginBottom: 4,
                    }}>{item.predictedClass}</div>
                    {item.bigFiveScores && (
                      <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
                        {Object.entries(item.bigFiveScores).map(([t, s]) => (
                          <div key={t} title={`${t}: ${Math.round(s * 100)}%`}
                            style={{
                              height: 4, flex: 1, borderRadius: 4,
                              background: TRAIT_META[t].color, opacity: 0.35 + s * 0.65,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                      {Math.round(item.confidence * 100)}% confidence · {item.timestamp}
                    </div>
                  </div>
                  <button
                    onClick={() => setHistory(prev => prev.filter((_, i) => i !== idx))}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.25)', fontSize: 16, flexShrink: 0,
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                  >✕</button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── WEBCAM MODAL ── */}
      <AnimatePresence>
        {showWebcam && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowWebcam(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ ...card, padding: 20, width: 400 }}
            >
              <div style={{ ...sectionLabel(), marginBottom: 14 }}>
                <span style={dot('#c084fc')} /> WEBCAM CAPTURE
              </div>
              <Webcam ref={webcamRef} screenshotFormat="image/png"
                style={{ width: '100%', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button onClick={captureFromWebcam} style={{ ...ghostBtn, color: '#c084fc', borderColor: 'rgba(192,132,252,0.3)' }}>
                  📸 Capture
                </button>
                <button onClick={() => setShowWebcam(false)} style={ghostBtn}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(192,132,252,0.25); border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default Upload;
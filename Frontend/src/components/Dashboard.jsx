import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRAITS = {
  Neuroticism:       { score: 0.92, color: "#c084fc", glow: "#a855f7", label: "Emotionally Sensitive" },
  Conscientiousness: { score: 0.74, color: "#67e8f9", glow: "#06b6d4", label: "Detail-Oriented" },
  Agreeableness:     { score: 0.61, color: "#6ee7b7", glow: "#10b981", label: "Cooperative" },
  Openness:          { score: 0.48, color: "#fcd34d", glow: "#f59e0b", label: "Creative" },
  Extraversion:      { score: 0.27, color: "#f9a8d4", glow: "#ec4899", label: "Reserved" },
};

const NAV = ["Overview", "Analysis", "Personality", "Patterns", "Comparisons", "Reports"];

const PATTERNS = [
  { icon: "Aa", label: "Consistent Size",   sub: "Uniform letter sizing" },
  { icon: "⌇",  label: "Moderate Pressure", sub: "Balanced intensity" },
  { icon: "⟋",  label: "Slight Right Slant",sub: "Forward inclination" },
  { icon: "⌻",  label: "Clear Spacing",     sub: "Good organisation" },
  { icon: "≡",  label: "Baseline Alignment",sub: "Well-structured" },
];

const INDICATORS = [
  { label: "Emotional Sensitivity", level: "High",   color: "#c084fc" },
  { label: "Anxiety Tendency",      level: "High",   color: "#c084fc" },
  { label: "Organisation",          level: "Strong", color: "#6ee7b7" },
  { label: "Self-Discipline",       level: "Strong", color: "#6ee7b7" },
  { label: "Focus & Stability",     level: "Strong", color: "#6ee7b7" },
];

function RadarChart({ traits }) {
  const cx = 110, cy = 110, r = 75;
  const keys = Object.keys(traits);
  const n = keys.length;
  const pts = keys.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const val = traits[keys[i]].score;
    return {
      x: cx + r * val * Math.cos(angle),
      y: cy + r * val * Math.sin(angle),
      gx: cx + r * Math.cos(angle),
      gy: cy + r * Math.sin(angle),
      color: traits[keys[i]].color,
      label: keys[i],
    };
  });

  const poly = pts.map(p => `${p.x},${p.y}`).join(" ");
  const grid = [0.25, 0.5, 0.75, 1].map(f =>
    keys.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + r * f * Math.cos(angle)},${cy + r * f * Math.sin(angle)}`;
    }).join(" ")
  );

  return (
    <svg viewBox="0 0 220 220" width="220" height="220">
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </radialGradient>
      </defs>
      {grid.map((g, i) => (
        <polygon key={i} points={g} fill="none" stroke="rgba(192,132,252,0.15)" strokeWidth="0.5" />
      ))}
      {pts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.gx} y2={p.gy} stroke="rgba(192,132,252,0.1)" strokeWidth="0.5" />
      ))}
      <polygon points={poly} fill="url(#rg)" stroke="#c084fc" strokeWidth="1.5" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill={p.color} />
          <text
            x={p.gx + (p.gx - cx) * 0.18}
            y={p.gy + (p.gy - cy) * 0.18}
            fontSize="9"
            fill="rgba(255,255,255,0.55)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ConfidenceRing({ value = 1 }) {
  const r = 52, circ = 2 * Math.PI * r;
  const dash = circ * value;
  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <defs>
          <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="url(#cg)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.25}
          style={{ filter: "drop-shadow(0 0 6px #c084fc)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
          {Math.round(value * 100)}%
        </span>
        <span style={{ fontSize: 10, color: "#c084fc", letterSpacing: "0.12em", marginTop: 4 }}>
          CONFIDENCE
        </span>
      </div>
    </div>
  );
}

export default function ScryDashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [hoverTrait, setHoverTrait] = useState(null);
  const [uploadHover, setUploadHover] = useState(false);

  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 1.5 + 0.3,
    o: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #0a0612 0%, #0d0a1a 40%, #0a1020 100%)",
      minHeight: "100vh",
      color: "#e2e8f0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* starfield */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.s} fill="white" opacity={s.o} />
        ))}
      </svg>

      {/* ambient glow blobs */}
      <div style={{
        position: "absolute", top: -200, left: "20%",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: "10%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── TOP NAV ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 60,
        borderBottom: "1px solid rgba(139,92,246,0.15)",
        backdropFilter: "blur(20px)",
        background: "rgba(10,6,18,0.6)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff",
            boxShadow: "0 0 12px rgba(124,58,237,0.5)",
          }}>S</div>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.04em", color: "#fff" }}>Scry</span>
        </div>

        {/* <div style={{ display: "flex", gap: 4 }}>
          {["Dashboard", "History", "Insights"].map(item => (
            <button
              key={item}
              style={{
                padding: "6px 14px", borderRadius: 8,
                background: item === "Dashboard" ? "rgba(124,58,237,0.25)" : "transparent",
                border: item === "Dashboard" ? "1px solid rgba(139,92,246,0.4)" : "1px solid transparent",
                color: item === "Dashboard" ? "#c084fc" : "rgba(255,255,255,0.5)",
                fontSize: 13, cursor: "pointer", fontWeight: 500,
              }}
            >{item}</button>
          ))}
        </div> */}
      </nav>

      {/* ── LAYOUT ── */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>

        {/* sidebar */}
        <aside style={{
          width: 200, flexShrink: 0,
          borderRight: "1px solid rgba(139,92,246,0.1)",
          padding: "24px 0",
          display: "flex", flexDirection: "column", gap: 4,
          background: "rgba(10,6,18,0.4)",
        }}>
          {NAV.map(item => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 20px", margin: "0 8px",
                borderRadius: 8, border: "none", cursor: "pointer",
                background: activeNav === item ? "rgba(124,58,237,0.2)" : "transparent",
                color: activeNav === item ? "#c084fc" : "rgba(255,255,255,0.45)",
                fontSize: 13.5, fontWeight: activeNav === item ? 600 : 400,
                textAlign: "left",
                borderLeft: activeNav === item ? "2px solid #7c3aed" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {item}
            </button>
          ))}

          {/* usage */}
          <div style={{ margin: "auto 12px 0", padding: "16px", borderRadius: 10,
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Daily Limit</div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, marginBottom: 6 }}>
              <div style={{ width: "80%", height: "100%", borderRadius: 4,
                background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }} />
            </div>
            <div style={{ fontSize: 11, color: "#c084fc" }}>4 / 5 used</div>
            <button style={{
              marginTop: 10, width: "100%", padding: "7px 0", borderRadius: 7,
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              border: "none", color: "#fff", fontSize: 12, fontWeight: 600,
              cursor: "pointer", boxShadow: "0 0 16px rgba(124,58,237,0.35)",
            }}>↑ Upgrade to Pro</button>
          </div>

          <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 8,
            borderTop: "1px solid rgba(139,92,246,0.1)", marginTop: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#fff" }}>U</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>User</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Free Plan</div>
            </div>
          </div>
        </aside>

        {/* main */}
        <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>

          {/* row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 320px", gap: 16, marginBottom: 16 }}>

            {/* canvas */}
            <div style={{
              borderRadius: 14, overflow: "hidden",
              border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)",
            }}>
              <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between",
                alignItems: "center", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>CANVAS</span>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                </div>
              </div>
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                <img
                  src="/api/placeholder/400/200"
                  alt="handwriting sample"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 60%, rgba(10,6,18,0.9))",
                  display: "flex", alignItems: "flex-end", padding: 12,
                }}>
                  <div style={{ fontSize: 10, color: "rgba(192,132,252,0.7)", fontStyle: "italic" }}>
                    Handwriting sample loaded
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, padding: "10px 12px" }}>
                {["↩ Undo", "✕ Clear", "⊖ Zoom ⊕"].map(btn => (
                  <button key={btn} style={{
                    flex: 1, padding: "6px 0", borderRadius: 7,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer",
                  }}>{btn}</button>
                ))}
              </div>
            </div>

            {/* upload */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)",
              display: "flex", flexDirection: "column", padding: 16, gap: 12,
            }}>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>UPLOAD IMAGE</span>
              <div
                onMouseEnter={() => setUploadHover(true)}
                onMouseLeave={() => setUploadHover(false)}
                style={{
                  flex: 1, borderRadius: 10, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 10,
                  border: `1.5px dashed ${uploadHover ? "rgba(192,132,252,0.5)" : "rgba(139,92,246,0.25)"}`,
                  background: uploadHover ? "rgba(124,58,237,0.08)" : "transparent",
                  transition: "all 0.2s", cursor: "pointer",
                }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(124,58,237,0.2)", border: "1px solid rgba(139,92,246,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>↑</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#c084fc", fontWeight: 600 }}>Click to upload</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>PNG, JPG up to 5MB</div>
                </div>
              </div>
              <button style={{
                width: "100%", padding: "12px 0", borderRadius: 10,
                background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
                border: "none", color: "#fff", fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.02em",
                boxShadow: "0 0 24px rgba(124,58,237,0.4), 0 0 48px rgba(6,182,212,0.15)",
              }}>✦ Predict Personality</button>
            </div>

            {/* quick summary */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)", padding: 16,
            }}>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>QUICK SUMMARY</span>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: "◎", label: "Analysis ID", val: "SCRY-A7C91E" },
                  { icon: "⊡", label: "Date", val: "4/30/2026, 5:07 PM" },
                  { icon: "◈", label: "Words Analysed", val: "184" },
                  { icon: "◷", label: "Writing Time", val: "~15 min" },
                  { icon: "★", label: "Confidence", val: "100%" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#c084fc", fontSize: 14, width: 18 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

            {/* personality overview */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)", padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c084fc",
                  boxShadow: "0 0 8px #c084fc" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                  PERSONALITY OVERVIEW
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 32, fontWeight: 800, color: "#c084fc",
                    textShadow: "0 0 20px rgba(192,132,252,0.5)",
                    letterSpacing: "-0.02em", lineHeight: 1,
                  }}>Neuroticism</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
                    Emotionally sensitive, anxious
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 8, fontStyle: "italic", lineHeight: 1.5 }}>
                    The handwriting suggests a personality that is organised, practical, and strives for clarity and stability.
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                    {["Sensitive","Analytical","Detail-Oriented","Organised","Stable"].map(tag => (
                      <span key={tag} style={{
                        padding: "4px 10px", borderRadius: 20,
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(192,132,252,0.25)",
                        fontSize: 11, color: "#c084fc",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <ConfidenceRing value={0.85} />
              </div>
            </div>

            {/* trait breakdown */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)", padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#67e8f9",
                  boxShadow: "0 0 8px #67e8f9" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                  TRAIT BREAKDOWN
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.entries(TRAITS).map(([trait, data]) => (
                  <motion.div
                    key={trait}
                    onMouseEnter={() => setHoverTrait(trait)}
                    onMouseLeave={() => setHoverTrait(null)}
                    style={{ cursor: "default" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12.5, color: hoverTrait === trait ? "#fff" : "rgba(255,255,255,0.65)", transition: "color 0.2s" }}>
                        {trait}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: data.color }}>
                        {Math.round(data.score * 100)}%
                      </span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data.score * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                        style={{
                          height: "100%", borderRadius: 4,
                          background: `linear-gradient(90deg, ${data.glow}88, ${data.color})`,
                          boxShadow: hoverTrait === trait ? `0 0 8px ${data.glow}` : "none",
                          transition: "box-shadow 0.2s",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* row 3 */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16 }}>

            {/* writing patterns */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)", padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fcd34d",
                  boxShadow: "0 0 8px #fcd34d" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                  WRITING PATTERNS
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                {PATTERNS.map(p => (
                  <motion.div
                    key={p.label}
                    whileHover={{ scale: 1.04 }}
                    style={{
                      textAlign: "center", padding: "12px 6px", borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
                    <div style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,0.75)", lineHeight: 1.3 }}>
                      {p.label}
                    </div>
                    <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
                      {p.sub}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div style={{
                marginTop: 14, padding: "10px 12px", borderRadius: 8,
                background: "rgba(252,211,77,0.07)",
                border: "1px solid rgba(252,211,77,0.15)",
                fontSize: 11.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6,
              }}>
                <span style={{ color: "#fcd34d", fontWeight: 600 }}>◉ Insight: </span>
                Your writing shows balance between structure and sensitivity. You value clarity, order, and tend to think things through before acting.
              </div>
            </div>

            {/* key indicators */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)", padding: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6ee7b7",
                  boxShadow: "0 0 8px #6ee7b7" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                  KEY INDICATORS
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {INDICATORS.map(ind => (
                  <div key={ind.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>{ind.label}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 12,
                      background: `${ind.color}18`, color: ind.color,
                      border: `1px solid ${ind.color}40`,
                    }}>{ind.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* comparison insights */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)", padding: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f9a8d4",
                  boxShadow: "0 0 8px #f9a8d4" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                  COMPARISON
                </span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 12 }}>
                89% similarity with individuals who score high in{" "}
                <span style={{ color: "#c084fc" }}>neuroticism traits</span> in analytical studies.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RadarChart traits={TRAITS} />
              </div>
              <button style={{
                width: "100%", padding: "8px 0", borderRadius: 8, marginTop: 4,
                background: "rgba(249,168,212,0.1)", border: "1px solid rgba(249,168,212,0.25)",
                color: "#f9a8d4", fontSize: 11.5, cursor: "pointer", fontWeight: 600,
              }}>View Details →</button>
            </div>

            {/* download report */}
            <div style={{
              borderRadius: 14, border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(15,10,30,0.8)", padding: 18,
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#67e8f9",
                    boxShadow: "0 0 8px #67e8f9" }} />
                  <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                    DOWNLOAD REPORT
                  </span>
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Comprehensive analysis report</p>
              </div>
              {[
                { icon: "◧", label: "PDF Report", color: "#c084fc" },
                { icon: "◨", label: "Detailed Insights", color: "#67e8f9" },
                { icon: "◪", label: "Share Results", color: "#6ee7b7" },
              ].map(item => (
                <button key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 12px", borderRadius: 8, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: item.color, fontSize: 12.5, fontWeight: 600,
                  textAlign: "left",
                }}>
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}

              <div style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                  SAVE TO HISTORY
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>
                  Save this analysis to your history
                </p>
                <button style={{
                  width: "100%", padding: "9px 0", borderRadius: 8,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))",
                  border: "1px solid rgba(139,92,246,0.4)",
                  color: "#c084fc", fontSize: 12.5, cursor: "pointer", fontWeight: 600,
                  boxShadow: "0 0 12px rgba(124,58,237,0.2)",
                }}>◎ Save Analysis</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
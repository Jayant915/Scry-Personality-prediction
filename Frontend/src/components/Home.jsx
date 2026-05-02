import { motion } from "framer-motion";
import HeroImage from "../assets/feature.jpg";
import Feature1 from "../assets/feature1.png";
import Feature2 from "../assets/feature2.png";
import Feature3 from "../assets/feature3.png";

const STARS = Array.from({ length: 90 }, () => ({
  x: Math.random() * 100, y: Math.random() * 100,
  s: Math.random() * 1.5 + 0.3, o: Math.random() * 0.35 + 0.08,
}));

const TRAIT_COLORS = ["#c084fc", "#67e8f9", "#6ee7b7", "#fcd34d", "#f9a8d4"];

const card = {
  borderRadius: 16,
  border: "1px solid rgba(139,92,246,0.2)",
  background: "rgba(13,9,26,0.82)",
  backdropFilter: "blur(16px)",
};

const dot = (color) => ({
  width: 8, height: 8, borderRadius: "50%",
  background: color, boxShadow: `0 0 8px ${color}`,
  display: "inline-block", flexShrink: 0,
});

const ghostBtn = (color = "#c084fc") => ({
  padding: "7px 18px", borderRadius: 8,
  background: `${color}14`, border: `1px solid ${color}35`,
  color, fontSize: 12, cursor: "pointer", fontWeight: 600,
  letterSpacing: "0.04em", transition: "all 0.18s",
});

export default function Home() {
  return (
    <div style={{
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      background: "linear-gradient(135deg,#0a0612 0%,#0d0a1a 45%,#080e1c 100%)",
      minHeight: "100vh", color: "#e2e8f0",
      position: "relative", overflowX: "hidden",
    }}>

      {/* ── Starfield ── */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {STARS.map((s, i) => <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.s} fill="white" opacity={s.o} />)}
      </svg>

      {/* ── Ambient glows ── */}
      <div style={{ position: "fixed", top: -220, left: "10%", width: 640, height: 640, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -120, right: "5%", width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(6,182,212,0.09) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "40%", left: "-5%", width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(236,72,153,0.06) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 60,
        borderBottom: "1px solid rgba(139,92,246,0.15)",
        background: "rgba(10,6,18,0.7)", backdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9, fontSize: 14, fontWeight: 900, color: "#fff",
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(124,58,237,0.6)",
          }}>S</div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.04em", color: "#fff" }}>Scry</span>
        </div>
        {/* <div style={{ display: "flex", gap: 6 }}>
          {["Home", "Analysis", "Dashboard", "History"].map(item => (
            <button key={item} style={{
              padding: "6px 15px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 500,
              background: item === "Home" ? "rgba(124,58,237,0.25)" : "transparent",
              border: item === "Home" ? "1px solid rgba(139,92,246,0.4)" : "1px solid transparent",
              color: item === "Home" ? "#c084fc" : "rgba(255,255,255,0.45)",
            }}>{item}</button>
          ))}
        </div> */}
        <a href="/upload" style={{
          padding: "8px 20px", borderRadius: 9,
          background: "linear-gradient(135deg,#7c3aed,#0891b2)",
          border: "none", color: "#fff", fontSize: 13, fontWeight: 700,
          cursor: "pointer", textDecoration: "none",
          boxShadow: "0 0 20px rgba(124,58,237,0.4)",
        }}>Get Started →</a>
      </nav>

      {/* ── PAGE BODY ── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ HERO ══ */}
        <section style={{
          maxWidth: 1120, margin: "0 auto",
          padding: "80px 32px 64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 48,
        }}>
          {/* left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ flex: 1 }}
          >
            {/* badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(192,132,252,0.28)",
              padding: "5px 15px", borderRadius: 30, fontSize: 11.5, color: "#c084fc",
              marginBottom: 24, backdropFilter: "blur(8px)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c084fc",
                boxShadow: "0 0 7px #c084fc", animation: "pulse 2s infinite" }} />
              AI-Powered Graphology Analysis
            </div>

            <h1 style={{ margin: "0 0 20px", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
              <span style={{
                fontSize: 58, fontWeight: 900, display: "block",
                background: "linear-gradient(90deg,#c084fc 0%,#67e8f9 50%,#6ee7b7 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Discover Your</span>
              <span style={{ fontSize: 58, fontWeight: 900, color: "#fff", display: "block" }}>Personality</span>
              <span style={{
                fontSize: 58, fontWeight: 900, display: "block",
                background: "linear-gradient(90deg,#fcd34d,#f9a8d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Through Handwriting</span>
            </h1>

            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Scry uses advanced machine learning and graphology principles to analyze your handwriting
              and predict Big Five personality traits with precision.
            </p>

            {/* trait pills strip */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
              {["Openness","Conscientiousness","Extraversion","Agreeableness","Neuroticism"].map((t, i) => (
                <span key={t} style={{
                  padding: "4px 12px", borderRadius: 20, fontSize: 11.5, fontWeight: 600,
                  background: `${TRAIT_COLORS[i]}14`, color: TRAIT_COLORS[i],
                  border: `1px solid ${TRAIT_COLORS[i]}35`,
                }}>{t}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <motion.a
                href="/upload"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 30px", borderRadius: 11,
                  background: "linear-gradient(135deg,#7c3aed,#0891b2)",
                  border: "none", color: "#fff", fontSize: 15, fontWeight: 800,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 0 32px rgba(124,58,237,0.5),0 0 64px rgba(6,182,212,0.15)",
                  letterSpacing: "0.01em",
                }}
              >
                ✦ Start Analyzing
                <span style={{ fontSize: 16 }}>→</span>
              </motion.a>
              <a href="#how" style={{
                padding: "13px 22px", borderRadius: 11, fontSize: 14, fontWeight: 600,
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                transition: "all 0.2s",
              }}>How it works</a>
            </div>
          </motion.div>

          {/* right – hero image with glow frame */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative" }}
          >
            {/* decorative ring */}
            <div style={{
              position: "absolute", inset: -24, borderRadius: 24,
              background: "linear-gradient(135deg,rgba(124,58,237,0.18),rgba(6,182,212,0.12))",
              filter: "blur(20px)",
            }} />
            <div style={{
              position: "relative",
              borderRadius: 20, overflow: "hidden",
              border: "1px solid rgba(192,132,252,0.25)",
              boxShadow: "0 0 48px rgba(124,58,237,0.28), 0 0 100px rgba(6,182,212,0.12)",
              maxWidth: 480, width: "100%",
            }}>
              <img src={HeroImage} alt="Handwriting illustration"
                style={{ width: "100%", display: "block", filter: "brightness(0.88) saturate(1.1)" }} />
              {/* overlay scanline */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom,transparent 60%,rgba(10,6,18,0.7))",
              }} />
              {/* floating badge on image */}
              <div style={{
                position: "absolute", bottom: 20, left: 20,
                padding: "8px 14px", borderRadius: 10,
                background: "rgba(13,9,26,0.85)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(192,132,252,0.25)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ ...dot("#6ee7b7") }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                  
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══ STATS BAR ══ */}
        <div style={{ borderTop: "1px solid rgba(139,92,246,0.12)", borderBottom: "1px solid rgba(139,92,246,0.12)" }}>
          <div style={{
            maxWidth: 1120, margin: "0 auto", padding: "22px 32px",
            display: "flex", justifyContent: "center", gap: 64,
          }}>
            {[
              { val: "Big Five", label: "Personality Model" },
              { val: "95%+", label: "Accuracy Rate" },
              { val: "5 Traits", label: "Deeply Analysed" },
              { val: "Local", label: "Private & Secure" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#c084fc",
                  textShadow: "0 0 16px rgba(192,132,252,0.5)" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FEATURES ══ */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 52 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)",
              marginBottom: 14,
            }}>
              <span style={dot("#67e8f9")} /> WHAT SCRY OFFERS
            </div>
            <h2 style={{ fontSize: 38, fontWeight: 900, margin: 0, letterSpacing: "-0.02em",
              background: "linear-gradient(90deg,#fff,rgba(255,255,255,0.65))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Everything you need to<br />understand yourself
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {[
              { img: Feature1, title: "Personalised Insights", desc: "Detailed Big Five personality analysis based on unique handwriting patterns, slant, spacing and pressure.", color: "#c084fc", glow: "#7c3aed" },
              { img: Feature2, title: "Interactive Canvas", desc: "Draw directly or upload a handwriting sample. See instant AI-powered personality predictions in real time.", color: "#67e8f9", glow: "#06b6d4" },
              { img: Feature3, title: "Secure & Private",  desc: "All analysis happens locally on your machine. Your handwriting data never leaves your device.", color: "#6ee7b7", glow: "#10b981" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ scale: 1.025, y: -4 }}
                style={{
                  ...card, padding: 28,
                  display: "flex", flexDirection: "column", gap: 16,
                  position: "relative", overflow: "hidden",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 32px ${f.glow}28`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                {/* top color accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg,${f.glow},${f.color})` }} />

                <div style={{
                  width: 64, height: 64, borderRadius: 14,
                  background: `${f.color}12`, border: `1px solid ${f.color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                }}>
                  <img src={f.img} alt={f.title} style={{ width: 40, height: 40, objectFit: "contain" }} />
                </div>

                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 8px",
                    letterSpacing: "-0.01em" }}>{f.title}</h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>

                <div style={{ marginTop: "auto" }}>
                  <span style={{ fontSize: 12, color: f.color, fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 4 }}>
                    Learn more <span>→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section id="how" style={{
          borderTop: "1px solid rgba(139,92,246,0.1)",
          padding: "80px 32px",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ textAlign: "center", marginBottom: 56 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)",
                marginBottom: 14,
              }}>
                <span style={dot("#fcd34d")} /> HOW IT WORKS
              </div>
              <h2 style={{ fontSize: 38, fontWeight: 900, margin: 0, letterSpacing: "-0.02em",
                color: "#fff" }}>
                Three steps to self-discovery
              </h2>
            </motion.div>

            <div style={{ position: "relative" }}>
              {/* connector line */}
              <div style={{
                position: "absolute", top: 32, left: "16.5%", right: "16.5%", height: 1,
                background: "linear-gradient(90deg,rgba(192,132,252,0.3),rgba(103,232,249,0.3),rgba(110,231,183,0.3))",
              }} />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                {[
                  { n: "01", title: "Draw or Upload", desc: "Provide a handwriting sample via the canvas or upload a PNG / JPG image.", color: "#c084fc", glow: "#7c3aed" },
                  { n: "02", title: "AI Analysis",    desc: "The ML model analyses slant, spacing, pressure and letter size deeply.", color: "#67e8f9", glow: "#06b6d4" },
                  { n: "03", title: "View Results",   desc: "See predicted Big Five traits with confidence scores and a radar chart.", color: "#6ee7b7", glow: "#10b981" },
                ].map((step, i) => (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                    style={{ ...card, padding: "28px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}
                  >
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: `${step.color}18`, border: `1.5px solid ${step.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 17, fontWeight: 900, color: step.color,
                      boxShadow: `0 0 18px ${step.glow}30`,
                      position: "relative", zIndex: 1,
                    }}>{step.n}</div>
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>{step.title}</h4>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ TRAIT BREAKDOWN PREVIEW ══ */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ ...card, padding: "36px 40px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 24 }}>
              <div style={{ maxWidth: 420 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14,
                  fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)",
                }}>
                  <span style={dot("#c084fc")} /> SAMPLE OUTPUT
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 0 12px",
                  letterSpacing: "-0.02em" }}>
                  Rich trait breakdown,<br />instantly.
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0 0 24px" }}>
                  Every analysis returns a full Big Five profile with confidence bars, a radar chart, and writing pattern indicators.
                </p>
                <a href="/upload" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 24px", borderRadius: 10,
                  background: "linear-gradient(135deg,#7c3aed,#0891b2)",
                  color: "#fff", fontSize: 14, fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                }}>Try it now →</a>
              </div>

              {/* mini trait bars demo */}
              <div style={{ flex: 1, minWidth: 280, maxWidth: 380 }}>
                {[
                  { name: "Neuroticism",       score: 0.92, color: "#c084fc", glow: "#7c3aed" },
                  { name: "Conscientiousness", score: 0.74, color: "#67e8f9", glow: "#06b6d4" },
                  { name: "Agreeableness",     score: 0.61, color: "#6ee7b7", glow: "#10b981" },
                  { name: "Openness",          score: 0.48, color: "#fcd34d", glow: "#f59e0b" },
                  { name: "Extraversion",      score: 0.27, color: "#f9a8d4", glow: "#ec4899" },
                ].map((t, i) => (
                  <motion.div key={t.name}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                    style={{ marginBottom: 14 }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>{t.name}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: t.color }}>{Math.round(t.score * 100)}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.score * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + 0.2, duration: 1, ease: "easeOut" }}
                        style={{
                          height: "100%", borderRadius: 4,
                          background: `linear-gradient(90deg,${t.glow},${t.color})`,
                          boxShadow: `0 0 8px ${t.glow}66`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ padding: "0 32px 100px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{
              maxWidth: 760, margin: "0 auto", textAlign: "center",
              padding: "64px 40px", borderRadius: 24,
              background: "radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.22) 0%,rgba(13,9,26,0.9) 70%)",
              border: "1px solid rgba(139,92,246,0.25)",
              boxShadow: "0 0 80px rgba(124,58,237,0.15)",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* decorative orb */}
            <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
              width: 300, height: 300, borderRadius: "50%",
              background: "radial-gradient(circle,rgba(124,58,237,0.25) 0%,transparent 70%)",
              pointerEvents: "none" }} />

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 20,
              fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)",
            }}>
              <span style={dot("#c084fc")} /> READY TO EXPLORE?
            </div>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: "#fff", margin: "0 0 16px",
              letterSpacing: "-0.03em", lineHeight: 1.08 }}>
              What does your<br />
              <span style={{
                background: "linear-gradient(90deg,#c084fc,#67e8f9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>handwriting reveal?</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 36, lineHeight: 1.7 }}>
              Join thousands discovering their personality through the science of graphology.
              It takes less than a minute.
            </p>
            <motion.a
              href="/upload"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 40px", borderRadius: 13,
                background: "linear-gradient(135deg,#7c3aed,#0891b2)",
                color: "#fff", fontSize: 16, fontWeight: 900,
                textDecoration: "none", letterSpacing: "0.01em",
                boxShadow: "0 0 40px rgba(124,58,237,0.55),0 0 80px rgba(6,182,212,0.2)",
              }}
            >
              ✦ Start Now <span style={{ fontSize: 18 }}>→</span>
            </motion.a>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: "1px solid rgba(139,92,246,0.12)",
          padding: "28px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          color: "rgba(255,255,255,0.25)", fontSize: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 7, fontSize: 11, fontWeight: 900, color: "#fff",
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>S</div>
            <span>Scry · Big Five Personality Analysis</span>
          </div>
          <span>Powered by ML + Graphology</span>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
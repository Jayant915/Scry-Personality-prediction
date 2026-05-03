import { useState } from "react";
import { Brain, Eye, Zap, Shield, BookOpen, Lightbulb, ChevronDown } from "lucide-react";

// Dark blue-purple palette matching the dashboard
const C = {
  bg:        "#0D0B1E",   // deepest navy
  bgCard:    "#151229",   // card surface
  bgCardAlt: "#1A1735",   // slightly lighter card
  border:    "#2A2550",   // subtle border
  borderBright: "#3D3870",
  accent:    "#7C6FCD",   // primary purple-blue accent
  accentBright: "#9B8EE8",
  accentDim: "#4A4490",
  text:      "#E8E4FF",   // primary text
  textMuted: "#8A84B8",   // muted text
  textDim:   "#5A5490",   // very muted
  highlight: "#B8AEFF",   // bright highlight purple
  green:     "#4ADE80",
  teal:      "#22D3EE",
  pink:      "#F472B6",
  orange:    "#FB923C",
  ctaBg:     "#6C5CE7",   // CTA button purple
};

const traits = [
  { name: "Openness",          color: C.teal,    desc: "Reflects curiosity, imagination, and willingness to experience new things. High scorers tend to be creative and open-minded; low scorers prefer routine and practical thinking." },
  { name: "Conscientiousness", color: C.green,   desc: "Measures discipline, organization, and reliability. High scorers are goal-oriented and responsible; low scorers may be more spontaneous and flexible." },
  { name: "Extraversion",      color: C.accentBright, desc: "Indicates how energized you feel by social interaction. High scorers are sociable and assertive; introverts prefer calm, deeper interactions and introspection." },
  { name: "Agreeableness",     color: C.pink,    desc: "Represents empathy, kindness, and cooperation. Highly agreeable people are compassionate and helpful; lower scorers may be more assertive or critical." },
  { name: "Neuroticism",       color: C.orange,  desc: "Measures emotional stability and sensitivity to stress. High scorers react strongly to stress; low scorers tend toward calmness and resilience." },
];

function AccordionItem({ trait, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0.9rem 0",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: trait.color, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: C.text }}>{trait.name}</span>
        </div>
        <ChevronDown size={15} style={{ color: C.textMuted, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }} />
      </button>
      <div style={{ maxHeight: isOpen ? "200px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
        <p style={{ fontSize: "0.87rem", color: C.textMuted, lineHeight: 1.7, paddingBottom: "1rem", margin: 0, paddingLeft: "20px" }}>
          {trait.desc}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const [openTrait, setOpenTrait] = useState(null);
  const toggle = (i) => setOpenTrait(openTrait === i ? null : i);

  const cardStyle = {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: "10px",
    padding: "1.5rem",
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* Top accent line */}
      <div style={{ height: "3px", background: C.ctaBg }} />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{
            display: "inline-block", background: C.accentDim, color: C.highlight,
            fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", padding: "5px 16px", borderRadius: "20px",
            marginBottom: "1.25rem", border: `1px solid ${C.borderBright}`,
          }}>
            Graphology & AI
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: C.text,
            margin: "0 0 1rem", lineHeight: 1.15, letterSpacing: "-0.02em",
          }}>
            About{" "}
            <span style={{ color: C.accentBright }}>Scry</span>
          </h1>
          <p style={{ fontSize: "1rem", color: C.textMuted, maxWidth: "540px", margin: "0 auto", lineHeight: 1.75 }}>
            Our AI-powered system reads the marks you leave on paper — analyzing
            handwriting to reveal the personality within, guided by decades of graphology research.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginTop: "1.75rem" }}>
            <div style={{ width: "60px", height: "1px", background: C.borderBright }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.accent }} />
            <div style={{ width: "60px", height: "1px", background: C.borderBright }} />
          </div>
        </header>

        {/* Banner */}
        <div style={{
          background: C.bgCardAlt, border: `1px solid ${C.borderBright}`,
          borderRadius: "10px", padding: "2rem 1.75rem", marginBottom: "2.5rem",
          display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap",
          borderLeft: `4px solid ${C.ctaBg}`,
        }}>
          <div style={{
            width: 56, height: 56, background: C.accentDim, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            border: `1px solid ${C.accent}`,
          }}>
            <Brain size={26} color={C.accentBright} />
          </div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h2 style={{ color: C.text, fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.4rem" }}>
              Advanced AI Technology
            </h2>
            <p style={{ color: C.textMuted, fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              Scry combines machine learning algorithms with graphology research to provide deep
              insights into personality traits — analyzing slant, pressure, spacing, and more.
            </p>
          </div>
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>

          {/* How It Works */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
              <Zap size={17} color={C.accent} />
              <h3 style={{ color: C.text, fontSize: "1rem", fontWeight: 700, margin: 0 }}>How It Works</h3>
            </div>
            {[
              { n: "1", title: "Input Handwriting", sub: "Draw or upload a sample of your handwriting" },
              { n: "2", title: "AI Analysis", sub: "ML algorithms analyze slant, pressure, spacing, and size" },
              { n: "3", title: "Personality Prediction", sub: "Get insights based on the Big Five personality model" },
            ].map((step) => (
              <div key={step.n} style={{ display: "flex", gap: "12px", marginBottom: "1.1rem" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: `1.5px solid ${C.accent}`, color: C.accentBright,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
                }}>
                  {step.n}
                </div>
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 600, color: C.text, fontSize: "0.9rem" }}>{step.title}</p>
                  <p style={{ margin: 0, color: C.textMuted, fontSize: "0.8rem" }}>{step.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
              <Eye size={17} color={C.accent} />
              <h3 style={{ color: C.text, fontSize: "1rem", fontWeight: 700, margin: 0 }}>Features We Analyze</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1.25rem" }}>
              {[
                { label: "Slant Angle", sub: "Writing direction", col: C.teal },
                { label: "Pressure",    sub: "Pen force",         col: C.pink },
                { label: "Letter Size", sub: "Overall scale",     col: C.accentBright },
                { label: "Spacing",     sub: "Word gaps",         col: C.green },
              ].map((f) => (
                <div key={f.label} style={{
                  background: C.bgCardAlt, border: `1px solid ${C.border}`,
                  borderRadius: "6px", padding: "12px",
                  borderTop: `2px solid ${f.col}`,
                }}>
                  <p style={{ margin: "0 0 2px", fontWeight: 600, color: C.text, fontSize: "0.85rem" }}>{f.label}</p>
                  <p style={{ margin: 0, color: C.textMuted, fontSize: "0.75rem" }}>{f.sub}</p>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: "1rem", borderTop: `1px solid ${C.border}`, display: "flex", gap: "4px", alignItems: "flex-end", height: "44px" }}>
              {[40, 70, 55, 85, 45, 65, 50, 75].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`,
                  background: [C.accent, C.teal, C.pink, C.green][i % 4],
                  borderRadius: "2px", opacity: 0.6,
                }} />
              ))}
              <p style={{ margin: "0 0 0 6px", fontSize: "0.68rem", color: C.textDim, whiteSpace: "nowrap", alignSelf: "flex-end" }}>Signal pattern</p>
            </div>
          </div>
        </div>

        {/* Big Five */}
        <div style={{ ...cardStyle, padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <div style={{ background: C.bgCardAlt, border: `1px solid ${C.border}`, padding: "9px", borderRadius: "8px" }}>
              <BookOpen size={18} color={C.accent} />
            </div>
            <div>
              <h2 style={{ color: C.text, fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>Big Five Personality Traits</h2>
              <p style={{ margin: 0, color: C.textMuted, fontSize: "0.78rem" }}>The psychological framework behind every analysis</p>
            </div>
          </div>
          {traits.map((trait, i) => (
            <AccordionItem key={trait.name} trait={trait} isOpen={openTrait === i} onToggle={() => toggle(i)} />
          ))}
        </div>

        {/* Privacy + Accuracy */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {[
            {
              icon: <Shield size={17} color={C.accent} />,
              title: "Privacy & Security",
              items: [
                "All analysis is performed locally on your device. Handwriting data stays in your browser.",
                "No information is sent to external servers. Your privacy is fully protected.",
              ],
            },
            {
              icon: <Lightbulb size={17} color={C.accent} />,
              title: "Accuracy & Usage",
              items: [
                "Results are based on ML and graphology research, combining two rich fields of study.",
                "For best accuracy, provide natural handwriting with 2–3 complete sentences.",
              ],
            },
          ].map((card) => (
            <div key={card.title} style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                {card.icon}
                <h3 style={{ color: C.text, fontSize: "1rem", fontWeight: 700, margin: 0 }}>{card.title}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {card.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, marginTop: "6px", flexShrink: 0 }} />
                    <p style={{ margin: 0, color: C.textMuted, fontSize: "0.87rem", lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "3.5rem", paddingTop: "1.5rem", borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontStyle: "italic", color: C.textDim, fontSize: "0.88rem", margin: 0 }}>
            "Every stroke of the pen is a window to the self."
          </p>
        </div>
      </div>
    </div>
  );
}
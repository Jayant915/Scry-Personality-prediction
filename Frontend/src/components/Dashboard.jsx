import { motion } from "framer-motion";

// reuse your TRAIT_META
const TRAIT_META = {
  Openness: { short: 'O', color: '#a78bfa' },
  Conscientiousness: { short: 'C', color: '#f472b6' },
  Extraversion: { short: 'E', color: '#fb923c' },
  Agreeableness: { short: 'A', color: '#34d399' },
  Neuroticism: { short: 'N', color: '#60a5fa' },
};

const Dashboard = ({ history }) => {

  // ─── stats ─────────────────────────────
  const total = history.length;

  const avgConfidence =
    total > 0
      ? history.reduce((a, b) => a + b.confidence, 0) / total
      : 0;

  const traitCount = {};
  history.forEach(h => {
    traitCount[h.predictedClass] =
      (traitCount[h.predictedClass] || 0) + 1;
  });

  const topTrait =
    Object.entries(traitCount).sort((a, b) => b[1] - a[1])[0]?.[0];

  // ─── avg big five ──────────────────────
  const avgTraits = {};
  Object.keys(TRAIT_META).forEach(t => {
    avgTraits[t] =
      total > 0
        ? history.reduce((sum, h) => sum + (h.bigFiveScores?.[t] || 0), 0) / total
        : 0;
  });

  // ─── insight ───────────────────────────
  const insight =
    topTrait
      ? `You consistently show strong ${topTrait} traits.`
      : "No insights yet.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-blue-950 text-white p-6 space-y-8">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-purple-300 text-sm mt-2">
          Your handwriting personality insights
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[{
          label: "Total Analyses",
          value: total
        },
        {
          label: "Top Trait",
          value: topTrait || "-"
        },
        {
          label: "Avg Confidence",
          value: `${(avgConfidence * 100).toFixed(1)}%`
        }].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-50" />
            <div className="relative bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
              <p className="text-xs text-white/50">{item.label}</p>
              <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* INSIGHT */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
        <p className="text-sm text-purple-300">Insight</p>
        <p className="text-lg font-semibold mt-1">{insight}</p>
      </div>

      {/* TRAIT DISTRIBUTION */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-sm text-purple-300 mb-4">Trait Distribution</p>

        <div className="space-y-3">
          {Object.entries(traitCount).map(([trait, count]) => {
            const percent = (count / total) * 100;
            return (
              <div key={trait}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{trait}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percent}%`,
                      background: TRAIT_META[trait]?.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AVG BIG FIVE */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-sm text-purple-300 mb-4">Average Big Five</p>

        <div className="space-y-3">
          {Object.entries(avgTraits).map(([trait, val]) => (
            <div key={trait}>
              <div className="flex justify-between text-xs mb-1">
                <span>{trait}</span>
                <span>{(val * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${val * 100}%`,
                    background: TRAIT_META[trait].color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-sm text-purple-300 mb-4">History</p>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {history.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10"
            >
              <div>
                <p className="font-bold">{item.predictedClass}</p>
                <p className="text-xs text-white/50">
                  {(item.confidence * 100).toFixed(1)}%
                </p>
              </div>
              <span className="text-xs text-white/40">
                {item.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
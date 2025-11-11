// ✅ FULLY MERGED & UPDATED HOME COMPONENT FOR 'Scry'
// All content adapted from NeuroSpec → Handwriting & Personality AI

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import zipImage from '../assets/cursive.jpg'; // Replace with handwriting image later
import candleImage from '../assets/space.jpg';
import metalNutImage from '../assets/pen.jpg';
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Showcase handwriting aspects instead of factory devices
  const deviceShowcaseItems = [
    {
      img: zipImage,
      title: "Cursive Letters",
      desc: "Every curve tells a story—Scry decodes it.",
      color: "text-teal-300",
      fallback: "Handwriting",
    },
    {
      img: metalNutImage,
      title: "Pressure & Pen Strokes",
      desc: "Thick or thin—your handwriting reveals your emotions.",
      color: "text-blue-300",
      fallback: "Pen Strokes",
    },
    {
      img: candleImage,
      title: "Spacing & Alignment",
      desc: "Mindset hidden in margins, spacing, and flow.",
      color: "text-purple-300",
      fallback: "Spacing",
    },
  ];

  // Use cases instead of industries
  const industryImpactItems = [
    {
      img: "https://imgs.search.brave.com/VR3q0NxYSYFQhJx90PzWCFgTkeXkI6xBI-CPMANhisg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/ODY2Lzg3NS9zbWFs/bC9lZHVjYXRpb24t/Y29uY2VwdHVhbC1i/YWNrZ3JvdW5kLXBo/b3RvLmpwZw",
      title: "Education",
      desc: "Understand student behavior and learning style.",
      color: "text-orange-300",
    },
    {
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      title: "Recruitment",
      desc: "Support HR in candidate personality evaluation.",
      color: "text-cyan-300",
    },
    {
      img: "https://imgs.search.brave.com/9xmo0Wnh37tqg_8h9NIQi5WhWPSYPQaJm1Taq_5BukQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODE1/Nzg0NDQ4L3Bob3Rv/L3BzeWNob3RoZXJh/cHktc2Vzc2lvbi13/b21hbi10YWxraW5n/LXRvLWhpcy1wc3lj/aG9sb2dpc3QtaW4t/dGhlLXN0dWRpby5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/NkxwYTVaMTdaVURG/M0JlV0pUbDJ1bXd1/aVlENi1nNUx0M3Jr/Z3FpaWJFND0",
      title: "Therapy & Counseling",
      desc: "Assist psychologists with deeper behavioral insights.",
      color: "text-red-300",
    },
    {
      img: "https://imgs.search.brave.com/9NMdhAeGx3q79Q2Zzu9jeC8Oj3bz1SUTTI_gjj0q9Bo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8yNy85Mi9t/ZW50YWwtc2VsZi1k/aXNjb3ZlcnktY29u/Y2VwdC12ZWN0b3It/NDU5NTI3OTIuanBn",
      title: "Self Discovery",
      desc: "Individuals understanding themselves better.",
      color: "text-indigo-300",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-6 py-25 px-4 md:p-8 min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #0c0c0f, #181820, #212231, #2b2c43, #363755)",
        color: "#e0e0e0",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center w-full px-2"
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-1 pt-20 pb-3 bg-clip-text text-transparent leading-tight"
          style={{
            backgroundImage:
              "linear-gradient(to right, #93c5fd, #a78bfa, #c4b5fd)",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
          }}
        >
          Scry
        </motion.h1>
        <motion.p className="text-lg sm:text-xl text-gray-400 italic">
          Smart insights — Beyond just handwriting.
        </motion.p>
      </motion.header>

      {/* Precision in Every Stroke */}
      <motion.section className="p-6 rounded-xl border border-gray-800 max-w-7xl mx-auto" style={{ background:"rgba(52,211,153,0.05)" }}>
        <h2 className="text-3xl font-bold text-center text-green-200">Precision in Every Stroke</h2>
        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          Scry is an AI-driven personality analysis platform that interprets handwriting to reveal behavioral traits. From slants to pressure—every stroke holds psychological meaning.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {deviceShowcaseItems.map((item, i) => (
            <motion.div key={i} className="p-4 bg-gray-900 bg-opacity-50 rounded-lg text-center" variants={itemVariants}>
              <img src={item.img} alt={item.title} className="w-40 h-40 object-cover rounded-lg mx-auto mb-3" />
              <h3 className={clsx("text-xl font-semibold", item.color)}>{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Revolutionizing Personality Interpretation */}
      <motion.section className="p-6 rounded-xl border border-gray-800 max-w-7xl mx-auto mt-8" style={{ background:"rgba(236,72,153,0.05)" }}>
        <h2 className="text-3xl font-bold text-center text-pink-300">Revolutionizing Personality Interpretation</h2>
        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          Scry combines psychology and machine learning to decode personality traits with accuracy and clarity. Instead of detecting defects in objects—we detect patterns in thoughts, emotions, and behavior through handwriting.
        </p>
        <div className="flex flex-col lg:flex-row gap-6 items-center mt-6">
          <img src="https://imgs.search.brave.com/DWppN2mh9Ddii76c8yeAqQpCdDgQL6O3YAbwl7DK3rM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ncmFw/aG9sb2d5LnNjcnkz/ZC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDgvaGFu/ZHdyaXRpbmctYW5h/bHlzaXMuanBn" alt="Handwriting Analysis" className="w-full lg:w-1/2 rounded-xl border max-h-80 object-cover" />
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-bold text-purple-300">AI-Powered Personality Mapping</h3>
            <p className="text-gray-300 mt-2">
              Our deep learning models analyze features like stroke pressure, baseline alignment, spacing, letter formation, and slants to determine traits like confidence, emotional stability, introversion, and creativity.
            </p>
            <ul className="list-disc text-gray-400 pl-5 mt-3 space-y-2">
              <li>Accurate Trait Prediction (Big Five Model)</li>
              <li>Zero Human Bias</li>
              <li>Real-time Personality Report</li>
              <li>Data Privacy & Secure Storage</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Use Cases */}
      <motion.section className="p-6 rounded-xl border border-gray-800 max-w-7xl mx-auto mt-8" style={{ background:"rgba(251,191,36,0.05)" }}>
        <h2 className="text-3xl font-bold text-center text-yellow-300">Real-World Applications</h2>
        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          Scry is not limited to research. It provides meaningful impact across multiple domains like psychology, recruitment, education, and personal development.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {industryImpactItems.map((item, i) => (
            <motion.div key={i} className="p-4 rounded-lg bg-gray-900 bg-opacity-50 text-center" variants={itemVariants}>
              <img src={item.img} alt={item.title} className="w-32 h-32 object-cover rounded-lg mx-auto mb-3" />
              <h3 className={clsx("text-lg font-semibold", item.color)}>{item.title}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer Badge */}
      <motion.div className="flex justify-center mt-8 pb-8">
        <div className="text-white px-6 py-3 rounded-full flex items-center gap-3" style={{ background:"linear-gradient(to right, #4c40b8, #6d28d9, #9333ea)" }}>
          <span>Accurate. Intelligent. Trustworthy — Scry AI Personality Insights</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
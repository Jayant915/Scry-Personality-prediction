
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Flowchart from "../assets/Flowchart.png"; // Your flowchart image

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const HowItWorks = () => {
  const controls = useAnimation();
  const sectionRefs = {
    flowchart: useRef(null),
    workflow: useRef(null),
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const workflowSteps = [
    {
      id: 1,
      color: {
        bg: "bg-green-500",
        text: "text-green-400"
      },
      title: "Start: Product Enters Inspection",
      desc: "Every product goes through automated visual inspection before approval.",
    },
    {
      id: 2,
      color: {
        bg: "bg-blue-500",
        text: "text-blue-400"
      },
      title: "Image Acquisition",
      desc: "Images captured via file upload (JPG, PNG) or live webcam integration."
    },
    {
      id: 3,
      color: {
        bg: "bg-purple-500",
        text: "text-purple-400"
      },
      title: "Data Preprocessing",
      desc: "Images are cleaned and enhanced for analysis.",
      extra: (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-700 rounded text-sm">Resizing</span>
          <span className="px-2 py-1 bg-gray-700 rounded text-sm">Noise Removal</span>
          <span className="px-2 py-1 bg-gray-700 rounded text-sm">Normalization</span>
        </div>
      ),
    },
    {
      id: 4,
      color: {
        bg: "bg-pink-500",
        text: "text-pink-400"
      },
      title: "ML Model Inference",
      desc: "Preprocessed image is analyzed using a trained deep learning model to predict defect status.",
    },
    {
      id: 5,
      color: {
        bg: "bg-yellow-500",
        text: "text-yellow-400"
      },
      title: "Defect Detection Decision",
      desc: "AI makes the final determination:",
      extra: (
        <div className="mt-2 flex gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>No defect → Approved</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>Defect found → Rejected</span>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      color: {
        bg: "bg-red-500",
        text: "text-red-400"
      },
      title: "Report Generation",
      desc: "A quality report is generated for review and records. It helps track patterns and defects.",
    },
    {
      id: 7,
      color: {
        bg: "bg-teal-500",
        text: "text-teal-400"
      },
      title: "Process Optimization",
      desc: "The system uses past inspection results to fine-tune the process and improve accuracy.",
    },
    {
      id: 8,
      color: {
        bg: "bg-indigo-500",
        text: "text-indigo-400"
      },
      title: "Continuous Monitoring",
      desc: "Real-time feedback allows the model to keep learning and catch new defects as they arise.",
      extra: (
        <div className="mt-2 flex items-center text-sm text-gray-400">
          <svg
            className="w-4 h-4 mr-1 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          System improves with each inspection
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen text-gray-200 font-sans p-5 overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #0c0c0f, #181820, #212231, #2b2c43, #363755, #3a3553, #3d3451, #40324e, #362538, #281b25, #191015, #000000)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-18 pb-2"
      >
        <h1
          className="text-4xl text-purple-300 md:text-5xl font-bold bg-clip-text mb-4 tracking-tight"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0, #f8fafc, #e2e8f0)",
          }}
        >
          How Our Quality Detection Works
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Advanced AI-powered defect detection for manufacturing excellence
        </p>
      </motion.div>

      {/* Flowchart Section */}
      <motion.section
        ref={sectionRefs.flowchart}
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
        className="max-w-4xl mx-auto my-16 p-8 rounded-xl shadow-lg border border-gray-700"
        style={{
          background:
            "linear-gradient(135deg, rgba(24,24,32,0.7) 0%, rgba(0,0,0,0.9) 100%)",
        }}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Visual Flowchart
          </h2>
        </motion.div>
        <motion.div variants={itemVariants}>
          <img
            src={Flowchart}
            alt="System Flowchart"
            className="rounded-lg border border-gray-600 shadow-md mx-auto w-full h-auto max-h-[600px] object-contain"
          />
        </motion.div>
      </motion.section>

      {/* Workflow Section */}
      <motion.section
        ref={sectionRefs.workflow}
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
        className="max-w-4xl mx-auto my-16 p-8 rounded-xl shadow-lg border border-gray-700"
        style={{
          background:
            "linear-gradient(135deg, rgba(24,24,32,0.7) 0%, rgba(0,0,0,0.9) 100%)",
        }}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-purple-400">
            Inspection Workflow
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          {workflowSteps.map(({ id, color, title, desc, extra }) => (
            <motion.div
              key={id}
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`flex-shrink-0 w-12 h-12 ${color.bg} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                {id}
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${color.text}`}>{title}</h3>
                <p className="text-gray-300">{desc}</p>
                {extra}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HowItWorks;
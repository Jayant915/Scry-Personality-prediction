import { motion } from "framer-motion";
import { FiArrowRight, FiUsers, FiSettings, FiActivity } from "react-icons/fi";
import HeroImage from "../assets/feature.jpg"; 
import Feature1 from "../assets/feature1.png";
import Feature2 from "../assets/feature2.png";
import Feature3 from "../assets/feature3.png";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 text-gray-900 flex flex-col items-center px-4 md:px-8 py-12"
    >
      {/* Hero Section */}
      <motion.section
        className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full mb-12"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="md:w-1/2 text-center md:text-left py-12 ">
          <h1 className="text-6xl md:text-5xl font-bold text-purple-900 mb-4">
            Discover Your Personality <br /> Through Handwriting
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-6">
            Scry uses advanced machine learning and graphology principles
            to analyze your handwriting and predict personality traits.
          </p>
          <motion.a
            href="/upload"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:from-purple-500 hover:to-blue-400 transition-all"
          >
            Get Started <FiArrowRight className="inline ml-2" />
          </motion.a>
        </div>

        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src={HeroImage}
            alt="Handwriting illustration"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="grid md:grid-cols-3 gap-6 max-w-6xl w-full mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-purple-600 to-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <img src={Feature1} alt="Personalized insights" className="w-20 h-20 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-purple-900">Personalized Insights</h3>
          <p className="text-gray-700 text-sm">
            Detailed personality analysis based on unique handwriting patterns.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-600 to-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <img src={Feature2} alt="Interactive canvas" className="w-20 h-20 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-purple-900">Interactive Canvas</h3>
          <p className="text-gray-700 text-sm">
            Draw or upload handwriting samples and see instant AI predictions.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-purple-600 to-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <img src={Feature3} alt="Secure and private" className="w-20 h-20 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-purple-900">Secure & Private</h3>
          <p className="text-gray-700 text-sm">
            All analysis happens locally, so your handwriting data remains private.
          </p>
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="max-w-5xl w-full mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-900">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 mb-4 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <h4 className="text-lg font-semibold mb-2 text-purple-900">Draw or Upload</h4>
            <p className="text-gray-700 text-sm">Provide a handwriting sample via canvas or image upload.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 mb-4 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <h4 className="text-lg font-semibold mb-2 text-purple-900">AI Analysis</h4>
            <p className="text-gray-700 text-sm">The ML model analyzes slant, spacing, pressure and letter size.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 mb-4 bg-purple-400 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <h4 className="text-lg font-semibold mb-2 text-purple-900">View Results</h4>
            <p className="text-gray-700 text-sm">See predicted personality traits with confidence scores instantly.</p>
          </div>
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section
        className="text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-900">Ready to Explore?</h2>
        <motion.a
          href="/upload"
          whileHover={{ scale: 1.05 }}
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:from-purple-500 hover:to-blue-400 transition-all"
        >
          Start Now
        </motion.a>
      </motion.section>
    </motion.div>
  );
};

export default Home;

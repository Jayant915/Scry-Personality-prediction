import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaEnvelope, FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 border-t border-purple-400 mt-12 overflow-hidden"
    >
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-8">
          
          {/* Brand Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h2
              className="text-2xl font-bold text-transparent bg-clip-text mb-3"
              style={{
                backgroundImage: "linear-gradient(to right, #ffffff, #e9d5ff)",
              }}
            >
              Scry
            </h2>
            <p className="text-purple-100 text-sm max-w-xs">
              AI-powered personality analysis through handwriting recognition
            </p>
          </motion.div>

          {/* About Section */}
          <div className="flex flex-col items-center md:items-start text-center">
            <h3 className="text-white mb-3 font-semibold px-4">About This Website</h3>
            <ul className="space-y-2 text-purple-100 text-sm">
              <li>Based on the Big Five Model</li>
              <li>Machine Learning Powered</li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-white mb-3 font-semibold">Connect</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm"
              >
                <FaGithub className="w-5 h-5 text-white" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm"
              >
                <FaTwitter className="w-5 h-5 text-white" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm"
              >
                <FaEnvelope className="w-5 h-5 text-white" />
              </motion.a>
            </div>
            <p className="text-purple-200 text-xs mt-3">
              Questions or feedback? Reach out!
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-purple-400/50 pt-6 text-center"
        >

          <motion.p
            whileHover={{ scale: 1.05 }}
            className="text-purple-200 text-xs mt-2"
          >
           Built with React & Machine Learning
          </motion.p>

          <p className="text-purple-300 text-xs mt-1">
            This tool analyzes handwriting patterns using simulated AI for educational purposes
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

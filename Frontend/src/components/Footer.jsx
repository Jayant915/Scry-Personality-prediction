import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-12 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Brand Section */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col items-center md:items-start">
            <h2
              className="text-2xl font-bold bg-clip-text text-transparent mb-4"
              style={{
                backgroundImage: 'linear-gradient(to right, #93c5fd, #a78bfa)' // Soft Blue to Purple
              }}
            >
              Scry
            </h2>
            <p className="text-gray-400 text-center md:text-left">
              AI-powered handwriting analysis for<br />personality insights and self-discovery.
            </p>
          </motion.div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Quick Links</h3>
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
              <motion.li whileHover={{ x: 5 }}>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/upload" className="text-gray-300 hover:text-white transition-colors">Upload</a>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500"
        >
          <p>© {currentYear} Scry. All rights reserved.</p>
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="text-sm mt-2 text-gray-400"
          >
            Decoding Personality Through Handwriting
          </motion.p>

          {/* Social Icons (optional but matching your import) */}
          <div className="flex justify-center gap-6 mt-4 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

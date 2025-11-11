import jayantImage from "../assets/jayant.jpg";
import sindhuImage from "../assets/sindhu.jpg";
import anshuImage from "../assets/Anshu.jpg";
import akshaImage from "../assets/Aksha.jpg";
import { motion } from "framer-motion";

const About = () => {
  const teamMembers = [
    {
      name: "Jayant Kishore",
      role: "MLOps Engineer",
      description:
        "Optimizes ML model, enabling seamless collaboration between data science and engineering",
      delay: 0.1,
      linkedin: "https://www.linkedin.com/in/jayant-kishore-595a84326/",
      github: "https://github.com/Jayant915",
      imageUrl: jayantImage,
    },
    {
      name: "Sindhu Kumari",
      role: "Backend Developer ",
      description:
        "Builds robust, secure backends with AI integration for real-time intelligence and seamless connectivity",
      delay: 0.2,
      linkedin:
        "https://www.linkedin.com/in/sindhu-kumari-48b413229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/sindhu213",
      imageUrl: sindhuImage,
    },
    {
      name: "Aksha Perween",
      role: "Server-Side Developer",
      description:
        "Develops efficient server-side logic, ensuring robust performance, secure data flow, and smooth backend operations.",
      delay: 0.3,
      linkedin: "https://linkedin.com/in/aksha-perween",
      github: "https://github.com/AkshaPerween",
      imageUrl: akshaImage,
    },
    {
      name: "Anshu Kumari",
      role: "Frontend Developer",
      description:
        "Created core UI elements ensuring smooth interactions, responsive design, and a consistent visual experience across devices.",
      delay: 0.4,
      linkedin: "https://www.linkedin.com/in/anshu-kumari-89bb21258/",
      github: "https://github.com/Anshu-Kumari108",
      imageUrl: anshuImage,
    },

  ];

  const LinkedInIcon = () => (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Inline SVG for GitHub icon
  const GithubIcon = () => (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 0C5.372 0 0 5.372 0 12c0 5.309 3.438 9.792 8.207 11.387.6.11.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.087-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.834 2.808 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.382 1.235-3.22-.125-.3-.535-1.52.117-3.175 0 0 1-.32 3.297 1.23.957-.266 1.983-.4 3.003-.404 1.02.004 2.046.138 3.004.404 2.29-1.55 3.286-1.23 3.286-1.23.653 1.655.243 2.875.118 3.175.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.62-5.485 5.92.43.37.81 1.12.81 2.25 0 1.606-.015 2.895-.015 3.286 0 .318.21.693.825.575C20.565 21.792 24 17.309 24 12c0-6.628-5.372-12-12-12z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Inline SVG for Globe icon
  const GlobeIcon = () => (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.53.05-1.05.14-1.56L9.62 17.3c.69 1.17 1.76 2.11 3.01 2.76L11 19.93zM15 19.82c-1.25-.65-2.32-1.59-3.01-2.76L4.14 8.44c-.09.51-.14 1.03-.14 1.56 0 4.08 3.05 7.44 7 7.93v2.89zM12 4.07c3.95.49 7 3.85 7 7.93 0 .53-.05 1.05-.14 1.56L14.38 6.7c-.69-1.17-1.76-2.11-3.01-2.76L12 4.07zM9 4.18c1.25.65 2.32 1.59 3.01 2.76L19.86 15.56c.09-.51.14-1.03.14-1.56 0-4.08-3.05-7.44-7-7.93v-2.89zM12 10.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-25 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(to right bottom, #0c0c0f, #181820, #212231, #2b2c43, #363755, #3a3553, #3d3451, #40324e, #362538, #281b25, #191015, #000000)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-bold bg-clip-text text-purple-300 mb-4"
            style={{
              backgroundImage:
                "linear-gradient(to right, #e2e8f0, #f8fafc, #e2e8f0)",
            }}
          >
            About NeuroSpec
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Where machines see what humans miss — deep learning for intelligent
            image diagnostics{" "}
          </p>
        </motion.div>

        {/* Company Description - Section 1 */}
        <motion.div
          className="p-8 rounded-xl border border-gray-700 shadow-md shadow-black/20 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(30,30,40,0.8), rgba(0,0,0,0.95))",
            backdropFilter: "blur(4px)",
          }}
        >
          <p className="text-gray-200 text-lg mb-5 leading-relaxed tracking-wide">
            <span className="text-purple-300 font-semibold">NeuroSpec</span> is
            a collaborative project focused on developing intelligent image
            inspection systems using deep learning and advanced imaging
            techniques. Our system is already functional and continuously being
            improved to handle a broader range of products with greater accuracy
            and efficiency.
          </p>
          <p className="text-gray-400 leading-relaxed tracking-wide">
            We aim to build a system capable of identifying defects across a
            wide range of objects and materials — making quality control{" "}
            <span className="text-green-400 font-medium">faster</span>,{" "}
            <span className="text-yellow-400 font-medium">smarter</span>, and{" "}
            <span className="text-blue-400 font-medium">more reliable</span> in
            diverse industrial settings.
          </p>
        </motion.div>

        {/* Company Description - Section 2 */}
        <motion.div
          className="p-10 rounded-xl border border-indigo-800 shadow-lg shadow-indigo-900/20 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(18,18,25,0.85), rgba(5,5,10,0.95))",
            backdropFilter: "blur(6px)",
          }}
        >
          <p className="text-indigo-200 text-lg mb-5 leading-relaxed italic">
            The model not only identifies the type of object being inspected but
            also classifies it as{" "}
            <strong className="text-pink-400 font-semibold">defective</strong>{" "}
            or{" "}
            <strong className="text-green-400 font-semibold">
              non-defective
            </strong>
            , along with a confidence score indicating how certain the
            prediction is.
          </p>
          <p className="text-indigo-100 leading-relaxed tracking-wide">
            It also generates{" "}
            <span className="text-indigo-400 font-semibold">
              detailed captions
            </span>{" "}
            that describe what the defect is and where it occurs — giving
            manufacturers clear, context-rich insights for enhanced{" "}
            <em className="text-yellow-200">precision</em> and{" "}
            <em className="text-blue-300">actionability</em>.
          </p>
        </motion.div>

        {/* Team Section */}
        <div className="mt-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              color: "#a78bfa",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Our <span style={{ color: "#d8b4fe" }}>Expert</span> Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: member.delay }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 10px 25px -5px rgba(50, 50, 60, 0.2)",
                }}
                className="p-6 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 flex flex-col"
                style={{
                  backdropFilter: "blur(4px)",
                  minHeight: "420px",
                  background:
                    "linear-gradient(to bottom right, rgba(25, 25, 30, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%)",
                }}
              >
                <div className="flex-grow flex flex-col items-center">
                  {member.imageUrl ? (
                    <motion.img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover mb-4 shadow-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      onError={(e) => {
                        e.target.src = `https://placehold.co/150x150/2b2c43/f3f4f6?text=${member.name.charAt(
                          0
                        )}`;
                        e.target.alt = `Placeholder for ${member.name}`;
                      }}
                    />
                  ) : (
                    <motion.div
                      className="w-28 h-28 rounded-full mb-4 flex items-center justify-center text-3xl font-bold"
                      style={{
                        background:
                          "linear-gradient(145deg, #2b2c43 0%, #363755 100%)",
                        color: "#f3f4f6",
                        boxShadow: "inset 0 4px 6px rgba(0,0,0,0.3)",
                      }}
                      whileHover={{ rotate: 10, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.name.charAt(0)}
                    </motion.div>
                  )}

                  <h3
                    className="text-xl font-bold mb-1 text-center"
                    style={{ color: "#f3f4f6" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="font-medium mb-3 text-center"
                    style={{ color: "#d1d5db" }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-center text-sm mb-6 flex-grow"
                    style={{ color: "#9ca3af" }}
                  >
                    {member.description}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4 mt-auto pt-4">
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="p-2 rounded-full transition-colors"
                    style={{
                      background: "rgba(55, 65, 81, 0.8)",
                      color: "#f3f4f6",
                    }}
                  >
                    <LinkedInIcon />
                  </motion.a>
                  <motion.a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="p-2 rounded-full transition-colors"
                    style={{
                      background: "rgba(55, 65, 81, 0.8)",
                      color: "#f3f4f6",
                    }}
                  >
                    <GithubIcon />
                  </motion.a>
                  {member.website && (
                    <motion.a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      className="p-2 rounded-full transition-colors"
                      style={{
                        background: "rgba(55, 65, 81, 0.8)",
                        color: "#f3f4f6",
                      }}
                    >
                      <GlobeIcon />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
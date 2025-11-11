import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiCheckCircle, FiAlertCircle, FiCamera, FiVideoOff, FiTag } from 'react-icons/fi';
import Webcam from 'react-webcam';

function toProperCase(str) {
  if (!str) {
    return "";
  }
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Upload = () => {
  // --- State Management ---
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); 
  const [imageFile, setImageFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const webcamRef = useRef(null);

  // --- Constants ---
  const MAX_FILE_SIZE_MB = 5; 

  const resetStates = useCallback(() => {
    setImagePreviewUrl(null);
    setImageFile(null);
    setAnalysisResult(null);
    setIsProcessing(false);
    setError(null);
  }, []);

  /**
   * Handles image processing from file or webcam capture.
   * @param {File} file - The image file to process.
   */
  const processImageFile = useCallback((file) => {
    resetStates(); // Clear previous states first

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image size should be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setImagePreviewUrl(URL.createObjectURL(file));
    setImageFile(file);
    setError(null);
    setIsWebcamActive(false); 
  }, [resetStates]);


  const startWebcam = useCallback(() => {
    resetStates(); 
    setIsWebcamActive(true);
    setError(null);
  }, [resetStates]);

  const stopWebcam = useCallback(() => {
    setIsWebcamActive(false);
  }, []);

  const captureFromWebcam = useCallback(() => {
    if (!isWebcamActive || !webcamRef.current) {
      setError('Camera not ready. Please ensure camera access is granted.');
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setError('Failed to capture image from webcam. Please try again.');
      return;
    }

    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
        processImageFile(file); 
        stopWebcam(); 
      })
      .catch(err => {
        console.error('Error converting webcam image:', err);
        setError('Failed to process captured image from webcam.');
      });
  }, [isWebcamActive, processImageFile, stopWebcam]);


  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  }, [processImageFile]);

  const handleFileSelect = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  }, [processImageFile]);


  const detectDefects = async () => {
    if (!imageFile) {
      setError('No image available for detection.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setAnalysisResult(null); 

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown server error' }));
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }

      const result = await response.json();
      console.log('API response:', result);

      if (result) {
        const confidence = parseFloat(result.confidence);
        const newConfidence = isNaN(confidence) ? 0 : confidence;
              const rawClass = result.class || "";
      const predictedClass = rawClass.replace(/[^a-zA-Z]/g, "").trim();
       /*const predictedClass = toProperCase(result.class.split(" ")[1]);*/
        console.log(predictedClass)

        console.log("Predicted class: ",predictedClass);

 let personalityMessage = '';

switch (predictedClass) {
  case 'Openness':
    personalityMessage = 'This handwriting shows the personality of a person who is Imaginative, insightful, and curious about the world. They enjoy novelty, art, and new ideas.';
    break;
  case 'Conscientiousness':
    personalityMessage = 'This handwriting reflects a person who is Organized, responsible, dependable, and goal-directed. They exhibit high self-discipline.';
    break;
  case 'Extraversion':
    personalityMessage = 'This handwriting represents an Outgoing, energetic, and assertive personality. They gain energy from social interaction';
    break;
  case 'Agreeableness':
    personalityMessage = 'This handwriting indicates a Compassionate, cooperative, and kind personality. They value getting along with others.';
    break;
  case 'Neuroticism':
    personalityMessage = 'This handwriting reflects an emotional and sensitive personality.';
    break;
  default:
    personalityMessage = 'This handwriting shows personality of person who is Prone to emotional instability, anxiety, and moodiness. They experience negative emotions more intensely.';
}

setAnalysisResult({
  defect_description: result.defect_description || 'No specific description provided.',
  confidence: newConfidence,
  predictedClass: predictedClass,
  personalityMessage: personalityMessage,
});

      } else {
        setError('detection response was empty or invalid.');
      }
    } catch (err) {
      console.error('Error during detection:', err);
      setError(`Failed to detect: ${err.message || 'Please check your backend server.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Webcam Constraints ---
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment" 
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full py-20 px-4 md:px-8 flex flex-col items-center"
      style={{
        background: 'radial-gradient(circle at center, #1c1c1f 0%, #000000 100%)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 w-full"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-2">Personality Prediction Model</h1>
          <p className="text-lg text-gray-400">Upload images for personality prediction</p>
        </motion.div>

        {/* Webcam Preview */}
        {isWebcamActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full max-w-3xl mx-auto mb-4 rounded-xl overflow-hidden border-2 border-blue-500/50"
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-center gap-3">
              <button
                onClick={captureFromWebcam}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <FiCamera /> Capture Image
              </button>
              <button
                onClick={stopWebcam}
                className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <FiVideoOff /> Close Camera
              </button>
            </div>
          </motion.div>
        )}

        {/* Upload Area */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="border-2 border-dashed border-blue-500/50 rounded-xl p-6 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center cursor-pointer bg-gradient-to-br from-gray-800/10 to-black/20 transition-all mb-8"
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={handleDrop}
          style={{
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)'
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiUpload className="text-blue-400 text-4xl mb-3" />
          </motion.div>
          <p className="text-md mb-3 text-gray-300">Drag & drop handwriting image here</p>
          <p className="text-sm mb-4 text-gray-400/60">Supports JPG, PNG up to {MAX_FILE_SIZE_MB}MB</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:from-blue-600 hover:to-blue-500 transition-all flex items-center gap-2 text-sm"
                style={{
                  boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)'
                }}
              >
                <FiImage /> Select Image
              </label>
            </div>

            <button
              onClick={isWebcamActive ? stopWebcam : startWebcam}
              className={`${isWebcamActive ? 'bg-red-900 hover:bg-red-800' : 'bg-gradient-to-r from-purple-800 to-purple-700 hover:from-purple-700 hover:to-purple-600'} text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm transition-all`}
              style={{
                boxShadow: `0 2px 10px ${isWebcamActive ? 'rgba(220, 38, 38, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`
              }}
            >
              {isWebcamActive ? <FiVideoOff /> : <FiCamera />}
              {isWebcamActive ? 'Close Camera' : 'Use Webcam'}
            </button>
          </div>
        </motion.div>

        {/* Error Message Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/50 border border-red-700 p-3 rounded-lg flex items-center gap-3 mb-8 w-full max-w-3xl mx-auto"
          >
            <FiAlertCircle className="text-red-400 text-xl" />
            <p className="text-red-100 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Image Preview and Analysis Results */}
        {imagePreviewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto bg-black/20 p-5 rounded-xl border border-blue-900/30 backdrop-blur-sm"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Image Preview Area */}
            <motion.div
              className="flex-1 w-full lg:w-auto relative"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={imagePreviewUrl}
                alt="Product image for defect detection"
                className="w-full h-auto rounded-lg shadow-lg border-2 border-blue-900/50"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 text-blue-300 px-2 py-1 rounded text-xs">
                Handwriting image Image
              </div>

              {/* Detect Defects Button */}
              {imageFile && !isProcessing && !analysisResult && ( // Show button only if file exists, not processing, and no results yet
                <div className="absolute top-3 right-3">
                  <button
                    onClick={detectDefects}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                  >
                    predict personality
                  </button>
                </div>
              )}
            </motion.div>

            {/* Analysis Results Display */}
            <div className="flex-1 w-full lg:w-auto bg-gradient-to-br from-gray-900/20 to-black/30 p-5 rounded-lg border border-gray-800/20">
              <h3 className="text-xl font-semibold mb-4 text-blue-300 flex items-center gap-2">
                <FiCheckCircle className="text-blue-400" /> Model Prediction
              </h3>

              {isProcessing ? (
                <motion.div
                  className="flex flex-col items-center justify-center gap-3 py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-10 h-10 border-[3px] border-gray-900/20 border-t-blue-500 rounded-full animate-spin"></div>
                  <p className="text-blue-300 animate-pulse text-sm">Analyzing handwriting...</p>
                </motion.div>
              ) : (
                <>
                  {analysisResult ? (
                    <>
                      {/* Predicted Class Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`p-3 rounded-lg mb-4 flex items-center gap-3 ${
                          analysisResult.predictedClass === 'Defective' ? 'bg-red-800/30 border border-red-700' : 'bg-green-800/30 border border-green-700'
                        }`}
                      >
                        <FiTag className={`${analysisResult.predictedClass === 'Defective' ? 'text-red-400' : 'text-green-400'} text-xl`} />
                        <p className={`text-lg font-bold ${analysisResult.predictedClass === 'Defective' ? 'text-red-200' : 'text-green-200'}`}>
                          Prediction: {analysisResult.predictedClass}
                        </p>
                      </motion.div>

                      {/* Defect Analysis */}
                      {/* Personality Summary */}
<div className="mb-6">
  <h4 className="text-md font-medium mb-2 text-blue-300">Personality summary:</h4>
  <div className="bg-green-800/20 p-3 rounded-lg border-l-4 border-green-600">
    <p className="text-green-100 text-sm">{analysisResult.personalityMessage}</p>
  </div>
</div>

                      <div className="mb-6">
                        <h4 className="text-md font-medium mb-2 text-blue-300">Handwriting analysis:</h4>
                        <div className="bg-gray-800/40 p-3 rounded-lg border-l-3 border-blue-600">
                          <p className="text-gray-100 text-sm">{analysisResult.defect_description}</p>
                        </div>
                      </div>

                      {/* Quality Confidence */}
                      <div>
                        <h4 className="text-md font-medium mb-2 text-blue-300">Confidence score:</h4>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-full bg-blue-900/20 rounded-full h-2.5">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
                              initial={{ width: 0 }}
                              animate={{ width: `${analysisResult.confidence * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          <span className="text-blue-300 font-bold whitespace-nowrap text-sm">
                            {Math.round(analysisResult.confidence * 100)}%
                          </span>
                        </div>
                    
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>Upload an image or capture from webcam to start analysis.</p>
                      {imageFile && <p>Click "Predict Personality" to analyze the image.</p>}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Upload;
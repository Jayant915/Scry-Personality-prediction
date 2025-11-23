import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiCheckCircle, FiAlertCircle, FiTrash2 } from 'react-icons/fi';
import { Card } from './ui/card';

function toProperCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Upload = () => {
  const [canvasData, setCanvasData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const MAX_FILE_SIZE_MB = 5;

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#6b21a8'; // purple accent
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCanvasData(null);
    setAnalysisResult(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image.');
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
        ctxRef.current.drawImage(img, 0, 0, canvas.width, canvas.height);
        setCanvasData(canvas.toDataURL('image/png'));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const analyzeCanvas = async () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setCanvasData(dataUrl);
    setIsProcessing(true);
    setError(null);

    try {
      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append('image', new File([blob], 'handwriting.png', { type: 'image/png' }));

      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errData.message || 'Server error');
      }

      const result = await response.json();
      const predictedClass = result.class?.replace(/[^a-zA-Z]/g, '').trim() || 'Unknown';

      let personalityMessage = '';
      switch (predictedClass) {
        case 'Openness':
          personalityMessage = 'Imaginative, curious, enjoys novelty, art, and ideas.';
          break;
        case 'Conscientiousness':
          personalityMessage = 'Organized, responsible, goal-directed, and disciplined.';
          break;
        case 'Extraversion':
          personalityMessage = 'Outgoing, energetic, assertive, sociable.';
          break;
        case 'Agreeableness':
          personalityMessage = 'Compassionate, cooperative, values harmony.';
          break;
        case 'Neuroticism':
          personalityMessage = 'Emotionally sensitive, prone to anxiety and moodiness.';
          break;
        default:
          personalityMessage = 'Personality could not be determined.';
      }

      const analysis = {
        predictedClass,
        personalityMessage,
        defect_description: result.defect_description || 'No additional notes.',
        confidence: parseFloat(result.confidence) || 0,
        timestamp: new Date().toLocaleString(),
        image: dataUrl,
      };

      setAnalysisResult(analysis);
      setHistory(prev => [analysis, ...prev]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to analyze handwriting.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 via-blue-100 to-white"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2">
            Handwriting Personality Analysis
          </h1>
          <p className="text-blue-600">
            Draw on the canvas or upload handwriting images
          </p>
        </div>

       {/* Canvas Input */}
<Card className="p-6 bg-white border border-purple-300 shadow-lg flex flex-col items-center space-y-4">
  <canvas
    ref={canvasRef}
    className="w-full max-w-xs h-96 bg-white border-2 border-blue-300 rounded-lg shadow-inner cursor-crosshair"
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={stopDrawing}
    onMouseLeave={stopDrawing}
  />

  <div className="flex flex-col gap-3 w-full max-w-xs">
    <button
      onClick={clearCanvas}
      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 shadow-md transition-all transform hover:-translate-y-1"
    >
      Clear
    </button>

    <label className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 cursor-pointer shadow-md transition-all transform hover:-translate-y-1 text-center">
      Upload Image
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
    </label>

    <button
      onClick={analyzeCanvas}
      disabled={isProcessing}
      className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-500 hover:to-blue-400 shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-50"
    >
      {isProcessing ? 'Analyzing...' : 'Predict Personality'}
    </button>
  </div>
</Card>


        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-3 bg-blue-100 text-blue-700 rounded-lg shadow-sm"
          >
            <FiAlertCircle /> {error}
          </motion.div>
        )}

        {/* Analysis Result */}
        {analysisResult && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-r from-purple-50 via-blue-50 to-white border border-purple-300 shadow-xl">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2 animate-pulse">
                <FiCheckCircle /> Analysis Result
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
                  <img
                    src={analysisResult.image}
                    alt="handwriting"
                    className="w-48 h-48 object-cover rounded-lg border-2 border-blue-300 shadow-md"
                  />
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <p className="text-purple-700 font-semibold text-lg">
                    Class: {analysisResult.predictedClass}
                  </p>
                  <p className="text-blue-700 font-medium">
                    Personality: {analysisResult.personalityMessage}
                  </p>

                  {/* Animated Confidence Bar */}
                  <div>
                    <p className="text-purple-600 font-medium mb-1">Confidence</p>
                    <div className="w-full h-4 bg-blue-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisResult.confidence * 100}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                      />
                    </div>
                    <p className="text-purple-600 text-sm mt-1">{(analysisResult.confidence * 100).toFixed(1)}%</p>
                  </div>

                  <p className="text-blue-700 font-medium mt-2">Notes:</p>
                  <p className="text-blue-500 text-sm">{analysisResult.defect_description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* History */}
        {history.length > 0 && (
          <Card className="p-6 bg-gradient-to-r from-purple-50 via-blue-50 to-white border border-purple-300 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Analysis History</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {history.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-4 bg-white p-3 rounded-lg border border-blue-200 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt="handwriting"
                    className="w-24 h-24 object-cover rounded-lg border border-blue-200 shadow"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-purple-700">{item.predictedClass} - {(item.confidence * 100).toFixed(1)}%</p>
                    <p className="text-blue-600 text-sm">{item.personalityMessage}</p>
                    <p className="text-gray-400 text-xs">{item.timestamp}</p>
                  </div>
                  <button
                    onClick={() => setHistory(prev => prev.filter((_, i) => i !== idx))}
                    className="text-blue-600 hover:text-blue-400 transition"
                  >
                    <FiTrash2 />
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default Upload;

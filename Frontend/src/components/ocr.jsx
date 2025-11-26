// Frontend/src/components/ui/OCR.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Card } from "./ui/card"; 
import { UploadCloud, FileText, Loader2, Zap, AlertTriangle } from "lucide-react";

export default function OCR() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setRecognizedText('');
            setError('');
        }
    };

    // Upload image + run OCR
    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select an image file first.");
            return;
        }

        const formData = new FormData();

        // Flask expects: request.files["handwriting_image"]
        formData.append("handwriting_image", selectedFile);

        setLoading(true);
        setError("");
        setRecognizedText("");

        try {
            // Flask runs on http://127.0.0.1:5000
            const response = await axios.post(
                "http://127.0.0.1:5000/api/ocr-recognize",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setRecognizedText(response.data.recognized_text || "");

        } catch (err) {
            console.error("OCR Error:", err);
            const message =
                err.response?.data?.error ||
                "Failed to process image. Check server status.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 sm:px-10 lg:px-12 py-18 space-y-18">

            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-4">
                    Handwriting to Text
                </h1>
                <p className="text-lg sm:text-xl text-slate-600">
                    Upload an image and our OCR engine will convert your handwriting into digital text.
                </p>
            </div>

            {/* Upload Section */}
            <Card className="p-8 bg-white border-purple-200 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-2 mb-4 border-b pb-4">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <h3 className="text-purple-900 font-semibold">How it Works</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Select File */}
                    <div className="space-y-4">
                        <p className="text-slate-900 font-medium">1. Choose a File</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-slate-600 border border-purple-300 p-2 rounded-lg"
                        />

                        {selectedFile && (
                            <p className="text-sm text-green-600">
                                File Selected: {selectedFile.name}
                            </p>
                        )}
                    </div>

                    {/* Upload Button */}
                    <div className="flex flex-col items-stretch">
                        <button
                            onClick={handleUpload}
                            disabled={loading || !selectedFile}
                            className={`p-4 rounded-lg text-white font-bold transition-colors ${
                                loading || !selectedFile
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-fuchsia-600 hover:bg-fuchsia-700"
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <UploadCloud className="w-5 h-5 mr-2" />
                                    Start Recognition
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </Card>

            {/* Recognized Text */}
            {recognizedText && (
                <Card className="p-8 bg-white border-purple-200 max-w-4xl mx-auto space-y-4">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <h3 className="text-purple-900 font-semibold">Recognized Text</h3>
                    </div>
                    <textarea
                        readOnly
                        value={recognizedText}
                        className="w-full h-40 p-4 border border-slate-300 rounded-lg bg-slate-50 text-slate-800 text-base font-mono"
                    />
                </Card>
            )}

            {/* Error Message */}
            {error && (
                <Card className="p-4 bg-red-100 border border-red-400 max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 text-red-700">
                        <AlertTriangle className="w-5 h-5" />
                        <p className="font-medium">{error}</p>
                    </div>
                </Card>
            )}
        </div>
    );
}

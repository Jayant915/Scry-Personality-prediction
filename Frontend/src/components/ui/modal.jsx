import { Zap, X } from "lucide-react";

export default function OCRInstructionsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-purple-600" />
                        How the OCR Works
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="text-slate-700 space-y-3">
                    <p>
                        <strong>Optical Character Recognition (OCR)</strong> converts the image of handwriting into digital text.
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                        <li>
                            <strong>1. Image Pre-processing:</strong> Improves readability by adjusting brightness and contrast.
                        </li>
                        <li>
                            <strong>2. Feature Extraction:</strong> Deep learning models analyze strokes and patterns.
                        </li>
                        <li>
                            <strong>3. NLP Integration:</strong> Analyzes style, structure, and writing behavior for personality insights.
                        </li>
                    </ul>

                    <p className="text-sm text-purple-700 italic">
                        This process creates the foundation for the Scry personality prediction system.
                    </p>
                </div>
            </div>
        </div>
    );
}

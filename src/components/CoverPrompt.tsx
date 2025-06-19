import React from 'react';

interface CoverPromptProps {
    eye: 'left' | 'right';
    onContinue: () => void;
}

const CoverPrompt: React.FC<CoverPromptProps> = ({ eye, onContinue }) => (
    <div className="space-y-4">
        <p>Please cover your <strong>{eye === 'left' ? 'right' : 'left'} eye</strong>.</p>
        <button
            onClick={onContinue}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Continue
        </button>
    </div>
);

export default CoverPrompt;
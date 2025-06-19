import { useState } from 'react';
import { CONTENT } from '../constants/content';

interface SetupProps {
    onComplete: () => void;
}

export function Setup({ onComplete }: SetupProps) {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const steps = [
        {
            title: CONTENT.SETUP.DEVICE,
            instruction: "Position your screen at eye level while sitting",
        },
        {
            title: CONTENT.SETUP.DISTANCE,
            instruction: "Stand or sit exactly 10 feet away from your screen",
        },
        {
            title: CONTENT.SETUP.LIGHTING,
            instruction: "Ensure your room is well lit without glare on the screen",
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="max-w-md w-full">
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 w-full mx-1 rounded ${i + 1 <= step ? 'bg-blue-500' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-center text-sm text-gray-600">
                        Step {step} of {totalSteps}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">{step}</span>
                    </div>

                    <h2 className="text-xl font-bold mb-4">
                        {steps[step - 1].title}
                    </h2>

                    <p className="text-gray-600 mb-8">
                        {steps[step - 1].instruction}
                    </p>

                    <button
                        onClick={() => {
                            if (step < totalSteps) {
                                setStep(step + 1);
                            } else {
                                onComplete();
                            }
                        }}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {step === totalSteps ? "Start Test" : "Next"}
                    </button>

                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="w-full mt-2 text-gray-500 py-2 hover:text-gray-700"
                        >
                            Back
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

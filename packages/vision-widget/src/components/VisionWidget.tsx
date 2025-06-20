import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

// K12 brand colors
const k12Colors = {
    primary: '#0066cc', // K12 blue
    secondary: '#002B49', // K12 dark blue
    accent: '#FF6B00', // K12 orange
    success: '#4CAF50',
    background: '#F5F7FA',
    text: '#333333',
};

const POSSIBLE_LETTERS = "ABCDEFHKMNPRSTVXYZ".split("");
const ACUITY_MAP = [200, 100, 70, 50, 40, 30, 20];

export interface VisionWidgetProps {
    containerClassName?: string;
    onComplete?: (results: { left: string; right: string }) => void;
    distance?: number;
    theme?: 'light' | 'dark';
    brandColor?: string;
}

function generateRandomLetters(): string[] {
    return Array.from({ length: 3 }, () =>
        POSSIBLE_LETTERS[Math.floor(Math.random() * POSSIBLE_LETTERS.length)]
    );
}

export function VisionWidget({
    containerClassName,
    onComplete,
    distance = 3,
    theme = 'light',
    brandColor = k12Colors.primary
}: VisionWidgetProps) {
    const [currentLine, setCurrentLine] = useState(0);
    const [currentLetters, setCurrentLetters] = useState<string[]>([]);
    const [inputValues, setInputValues] = useState(['', '', '']);
    const [eye, setEye] = useState<'left' | 'right'>('left');
    const [score, setScore] = useState(0);

    useEffect(() => {
        setCurrentLetters(generateRandomLetters());
    }, [currentLine]);

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputValues];
        newInputs[index] = value.toUpperCase();
        setInputValues(newInputs);

        if (value && index < 2) {
            const nextInput = document.getElementById(`letter-input-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const correctCount = inputValues.reduce((count, input, index) =>
            input === currentLetters[index] ? count + 1 : count, 0
        );

        if (correctCount >= 2) {
            if (currentLine < ACUITY_MAP.length - 1) {
                setCurrentLine(currentLine + 1);
                setInputValues(['', '', '']);
                setScore(score + 1);
                setTimeout(() => {
                    document.getElementById('letter-input-0')?.focus();
                }, 0);
            } else {
                finishTest();
            }
        } else {
            finishTest();
        }
    };

    const finishTest = () => {
        const acuityValue = `20/${ACUITY_MAP[currentLine]}`;
        if (eye === 'left') {
            setEye('right');
            setCurrentLine(0);
            setInputValues(['', '', '']);
            setCurrentLetters(generateRandomLetters());
            setScore(0);
            setTimeout(() => {
                document.getElementById('letter-input-0')?.focus();
            }, 0);
        } else {
            onComplete?.({ left: acuityValue, right: acuityValue });
        }
    };

    const baseSize = 48;
    const size = baseSize * (distance / 3) * ((ACUITY_MAP.length - currentLine) / ACUITY_MAP.length + 0.5);

    return (
        <div
            className={clsx(
                'k12-vision-widget min-h-[600px] flex flex-col items-center justify-center p-4',
                theme === 'light' ? 'bg-[#F5F7FA]' : 'bg-[#002B49] text-white',
                containerClassName
            )}
            style={{
                '--k12-brand-color': brandColor,
                '--k12-text-color': theme === 'light' ? k12Colors.text : '#ffffff'
            } as React.CSSProperties}
        >
            <div className="max-w-md w-full space-y-6">
                <div className="text-center">
                    <h2 className={clsx(
                        'text-2xl font-bold mb-4',
                        theme === 'dark' && 'text-white'
                    )}>
                        {eye === 'left' ? 'Cover Your Right Eye' : 'Cover Your Left Eye'}
                    </h2>
                    <div className={clsx(
                        'rounded-full px-4 py-2 mb-4 text-sm font-medium',
                        theme === 'light' ? 'bg-white shadow-sm' : 'bg-[#003666]'
                    )}>
                        Line {currentLine + 1} of {ACUITY_MAP.length}
                    </div>
                </div>

                <div className={clsx(
                    'rounded-lg shadow-lg p-8 flex justify-center items-center',
                    theme === 'light' ? 'bg-white' : 'bg-[#001F33]'
                )}>
                    <div
                        className="font-mono tracking-wider"
                        style={{ fontSize: `${size}px` }}
                    >
                        {currentLetters.join(' ')}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center gap-4">
                        {[0, 1, 2].map(index => (
                            <input
                                key={index}
                                id={`letter-input-${index}`}
                                type="text"
                                maxLength={1}
                                value={inputValues[index]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className={clsx(
                                    'w-12 h-12 text-center text-2xl border-2 rounded uppercase',
                                    'focus:ring-2 transition-colors',
                                    theme === 'light'
                                        ? 'border-gray-300 focus:border-[var(--k12-brand-color)] focus:ring-[var(--k12-brand-color)] bg-white'
                                        : 'border-[#003666] focus:border-[var(--k12-brand-color)] focus:ring-[var(--k12-brand-color)] bg-[#001F33] text-white'
                                )}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className={clsx(
                            'w-full py-3 rounded-lg text-white transition-colors',
                            'bg-[var(--k12-brand-color)] hover:brightness-110'
                        )}
                    >
                        Check Letters
                    </button>
                </form>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { CONTENT } from '../constants/content';

// All possible letters for the test (excluding similar-looking letters)
const POSSIBLE_LETTERS = "ABCDEFHKMNPRSTVXYZ".split("");
const ACUITY_MAP = [200, 100, 70, 50, 40, 30, 20];

// Generate random letters for each line
function generateRandomLetters(): string[] {
  return Array.from({ length: 3 }, () =>
    POSSIBLE_LETTERS[Math.floor(Math.random() * POSSIBLE_LETTERS.length)]
  );
}

interface SnellenProps {
  distance: number;
  onComplete: (acuity: { left: string; right: string }) => void;
}

export function SnellenChart({ distance, onComplete }: SnellenProps) {
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

    // Auto-advance to next input
    if (value && index < 2) {
      const nextInput = document.getElementById(`letter-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Count correct letters
    const correctCount = inputValues.reduce((count, input, index) =>
      input === currentLetters[index] ? count + 1 : count, 0
    );

    if (correctCount >= 2) {
      // Passed this line
      if (currentLine < ACUITY_MAP.length - 1) {
        setCurrentLine(currentLine + 1);
        setInputValues(['', '', '']);
        setScore(score + 1);
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
      // Move to right eye
      setEye('right');
      setCurrentLine(0);
      setInputValues(['', '', '']);
      setCurrentLetters(generateRandomLetters());
      setScore(0);
    } else {
      // Both eyes done
      onComplete({ left: acuityValue, right: acuityValue });
    }
  };

  // Scale the font size based on distance and line
  const baseSize = 48; // px at closest distance
  const size = baseSize * (distance / 3) * ((ACUITY_MAP.length - currentLine) / ACUITY_MAP.length + 0.5);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {eye === 'left' ? CONTENT.TEST.LEFT_EYE : CONTENT.TEST.RIGHT_EYE}
          </h2>
          <div className="bg-gray-100 rounded-full px-4 py-2 mb-4">
            {CONTENT.TEST.PROGRESS.replace('{current}', String(currentLine + 1))
              .replace('{total}', String(ACUITY_MAP.length))}
          </div>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-8 flex justify-center items-center"
          style={{ minHeight: '200px' }}
        >
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
                className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 uppercase"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Check Letters
          </button>
        </form>
      </div>
    </div>
  );
}
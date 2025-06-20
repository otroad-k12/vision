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
  const [leftEyeScore, setLeftEyeScore] = useState(-1); // -1 indicates not yet tested
  const [rightEyeScore, setRightEyeScore] = useState(-1); // -1 indicates not yet tested

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

    console.log(`Eye: ${eye}, Line: ${currentLine}, Correct: ${correctCount}, Current letters:`, currentLetters, 'Input:', inputValues);

    if (correctCount === currentLetters.length) {
      // Passed this line
      if (currentLine < ACUITY_MAP.length - 1) {
        // Update score to current line since they passed it
        if (eye === 'left') {
          setLeftEyeScore(currentLine);
        } else {
          setRightEyeScore(currentLine);
        }

        setCurrentLine(currentLine + 1);
        setInputValues(['', '', '']);
        setTimeout(() => {
          document.getElementById('letter-input-0')?.focus();
        }, 0);
      } else {
        // Passed the last line
        const finalScore = currentLine;
        if (eye === 'left') {
          setLeftEyeScore(finalScore);
          switchToRightEye();
        } else {
          setRightEyeScore(finalScore);
          completeTest(leftEyeScore, finalScore);
        }
      }
    } else if (correctCount > 0) {
      // Partial pass only if all correct: treat as fail for acuity level
      const finalScore = Math.max(0, currentLine - 1);
      if (eye === 'left') {
        setLeftEyeScore(finalScore);
        switchToRightEye();
      } else {
        setRightEyeScore(finalScore);
        completeTest(leftEyeScore, finalScore);
      }
    } else {
      // No correct letters: cannot pass
      const finalScore = Math.max(0, currentLine - 1);
      if (eye === 'left') {
        setLeftEyeScore(finalScore);
        switchToRightEye();
      } else {
        setRightEyeScore(finalScore);
        completeTest(leftEyeScore, finalScore);
      }
    }
  };

  const switchToRightEye = () => {
    console.log('Switching to right eye');
    setEye('right');
    setCurrentLine(0);
    setInputValues(['', '', '']);
    setCurrentLetters(generateRandomLetters());
    setTimeout(() => {
      document.getElementById('letter-input-0')?.focus();
    }, 0);
  };

  const completeTest = (leftScore: number, rightScore: number) => {
    console.log(`Completing test - Left: ${leftScore}, Right: ${rightScore}`);
    // Convert scores to acuity values
    const leftAcuity = `20/${ACUITY_MAP[Math.max(0, leftScore)]}`;
    const rightAcuity = `20/${ACUITY_MAP[Math.max(0, rightScore)]}`;
    console.log(`Final acuity - Left: ${leftAcuity}, Right: ${rightAcuity}`);
    onComplete({ left: leftAcuity, right: rightAcuity });
  };

  // Scale the font size based on distance and line
  const baseSize = 48; // px at closest distance
  const size = baseSize * (distance / 3) * ((ACUITY_MAP.length - currentLine) / ACUITY_MAP.length + 0.5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* COLUMN 1: the image */}
        <div className="w-full">
          <img
            src="https://www.k12.com/wp-content/uploads/2025/02/K12-HP-Hero-Large-Desktop-1536x1071.png"
            alt="Vision Test Chart"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {/* Marketing text under image */}
          <div className="bg-white mt-6 p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-k12-dark-blue mb-2">Vision Screening Test</h2>
            <p className="text-k12-text mb-4">
              This quick vision screening helps identify potential vision issues. Stand about 10 feet from your screen and follow the instructions for each eye.
            </p>
            <div className="bg-k12-blue/10 p-4 rounded-lg border border-k12-blue/20">
              <h3 className="text-k12-dark-blue font-semibold mb-1">Important</h3>
              <p className="text-sm text-k12-text">
                This is a screening test, not a substitute for a professional exam. If you experience vision problems or eye pain, consult an eye care professional.
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 2: the form */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            {eye === 'left' ? CONTENT.TEST.LEFT_EYE : CONTENT.TEST.RIGHT_EYE}
          </h2>

          <div className="bg-white border border-k12-blue/20 rounded-full px-4 py-2 mb-4 shadow-sm text-k12-dark-blue font-semibold">
            {CONTENT.TEST.PROGRESS.replace('{current}', String(currentLine + 1))
              .replace('{total}', String(ACUITY_MAP.length))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex justify-center items-center">
            <div
              className="font-mono tracking-wider text-k12-dark-blue"
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
                  className="w-12 h-12 text-center text-2xl border-2 border-k12-blue/20 rounded-lg focus:border-k12-blue focus:ring-2 focus:ring-k12-blue/20 uppercase bg-white text-k12-dark-blue font-semibold"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full k12-btn text-lg"
            >
              Check Letters
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
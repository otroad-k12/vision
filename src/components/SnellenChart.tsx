import React, { useState } from 'react';

// Single-letter optotypes for simplicity
const LINES = ['E', 'F', 'P', 'T', 'O', 'Z', 'L'];
const ACUITY_MAP = [200, 100, 70, 50, 40, 30, 20];

interface SnellenProps {
  distance: number;
  onComplete: (acuity: { left: string; right: string }) => void;
}

export function SnellenChart({ distance, onComplete }: SnellenProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [eye, setEye] = useState<'left' | 'right'>('left');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().toUpperCase() === LINES[currentLine]) {
      // correct
      if (currentLine < LINES.length - 1) {
        setCurrentLine(currentLine + 1);
        setInputValue('');
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
      // move to right eye
      setEye('right');
      setCurrentLine(0);
      setInputValue('');
    } else {
      // both eyes done
      onComplete({ left: acuityValue, right: acuityValue });
    }
  };

  // Scale the font size based on distance and line
  const baseSize = 48; // px at closest distance
  const size = baseSize * (distance / 3) * ((LINES.length - currentLine) / LINES.length + 0.5);

  return (
    <div className="space-y-4">
      <p>Testing: <strong>{eye === 'left' ? 'Left Eye' : 'Right Eye'}</strong></p>
      <div
        className="mx-auto"
        style={{ fontSize: `${size}px`, fontFamily: 'monospace' }}
      >
        {LINES[currentLine]}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label>
          Enter the letter you see:
          <input
            type="text"
            maxLength={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="ml-2 border rounded px-2 py-1 w-16 text-center uppercase"
            autoFocus
          />
        </label>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      <p className="text-sm text-gray-500">Distance: {distance} m | Line: {currentLine + 1} of {LINES.length}</p>
    </div>
  );
}
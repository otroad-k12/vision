import { useEffect } from 'react';

const LINES = ["E", "FP", "TOZ", "LPED", "PECFD", "EDFCZP", "FELOPZD"];

interface SnellenProps {
  currentLine: number;
  setCurrentLine: (i: number) => void;
  setTestComplete: (b: boolean) => void;
  setResults: (r: { left: string; right: string }) => void;
}

export function SnellenChart({ currentLine, setCurrentLine, setTestComplete, setResults }: SnellenProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (currentLine < LINES.length - 1) {
          setCurrentLine(currentLine + 1);
        } else {
          setTestComplete(true);
          const acuity = `20/${(LINES.length - currentLine) * 10}`;
          setResults({ left: acuity, right: acuity });
        }
      } else if (e.key === 'ArrowLeft') {
        setTestComplete(true);
        const acuity = `20/${(LINES.length - currentLine) * 10}`;
        setResults({ left: acuity, right: acuity });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentLine, setCurrentLine, setTestComplete, setResults]);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-2">Use → if you can read it, ← if you can't.</p>
      <h2 className="text-5xl md:text-6xl font-mono mt-4">{LINES[currentLine]}</h2>
    </div>
  );
}

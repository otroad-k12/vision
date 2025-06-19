import { useState, useRef, useEffect } from 'react';
import { CONTENT } from '../constants/content';

interface CalibrationProps {
  onComplete: (pixelsPerCm: number) => void;
}

export function Calibration({ onComplete }: CalibrationProps) {
  const [isReady, setIsReady] = useState(false);
  const creditCardRef = useRef<HTMLDivElement>(null);
  
  // Standard credit card width in cm
  const CREDIT_CARD_WIDTH_CM = 8.56;
  
  useEffect(() => {
    if (creditCardRef.current && isReady) {
      const pixelsPerCm = creditCardRef.current.offsetWidth / CREDIT_CARD_WIDTH_CM;
      onComplete(pixelsPerCm);
    }
  }, [isReady, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-6">{CONTENT.SETUP.CALIBRATE}</h2>
        
        <div 
          ref={creditCardRef}
          className="w-[85.6mm] h-[53.98mm] mx-auto border-2 border-dashed border-blue-500 rounded-lg mb-8 flex items-center justify-center"
        >
          <div className="text-gray-400">Credit Card Outline</div>
        </div>

        <button
          onClick={() => setIsReady(true)}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          aria-label={CONTENT.SETUP.READY_BUTTON}
        >
          {CONTENT.SETUP.READY_BUTTON}
        </button>
      </div>
    </div>
  );
}

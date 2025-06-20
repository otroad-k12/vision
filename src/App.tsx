import React, { useState } from 'react';
import { VisionWidget } from '@k12/vision-widget';
import { ResultSummary } from './components/ResultSummary';

function App() {
  const [results, setResults] = useState<{ left: string; right: string }>({ left: '', right: '' });
  const [showResults, setShowResults] = useState(false);

  const handleComplete = (testResults: { left: string; right: string }) => {
    setResults(testResults);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {!showResults ? (
        <VisionWidget
          theme="light"
          brandColor="#0066cc"
          onComplete={handleComplete}
          distance={3}
        />
      ) : (
        <div className="p-6">
          <ResultSummary results={results} />
          <button
            onClick={() => setShowResults(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Take Test Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
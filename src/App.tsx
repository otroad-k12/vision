import React, { useState } from 'react';
import { SnellenChart } from './components/SnellenChart';
import { ResultSummary } from './components/ResultSummary';

function App() {
  const [stage, setStage] = useState<'distance' | 'test' | 'result'>('distance');
  const [distance, setDistance] = useState<string>('3'); // distance in meters
  const [results, setResults] = useState<{ left: string; right: string }>({ left: '', right: '' });

  return (
    <div className="min-h-screen bg-white text-center p-6">
      <h1 className="text-2xl font-bold mb-6">Online Vision Test</h1>

      {stage === 'distance' && (
        <div className="space-y-4">
          <p>Please stand <strong>{distance} m</strong> from your screen for accurate results.</p>
          <label>
            Distance (m):
            <input
              type="number"
              min="0.5"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="ml-2 border rounded px-2 py-1 w-20"
            />
          </label>
          <button
            onClick={() => setStage('test')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Test
          </button>
        </div>
      )}

      {stage === 'test' && (
        <SnellenChart
          distance={parseFloat(distance)}
          onComplete={(acuity) => {
            setResults(acuity);
            setStage('result');
          }}
        />
      )}

      {stage === 'result' && <ResultSummary results={results} />}
    </div>
  );
}

export default App;
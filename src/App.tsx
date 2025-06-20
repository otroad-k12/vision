import React, { useState } from 'react';
import { SnellenChart } from './components/SnellenChart';
import { ResultSummary } from './components/ResultSummary';
import { Header } from './components/Header';

function App() {
  const [results, setResults] = useState<{ left: string; right: string }>({ left: '', right: '' });
  const [showResults, setShowResults] = useState(false);

  const handleComplete = (testResults: { left: string; right: string }) => {
    setResults(testResults);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-k12-gray font-sans">
      <Header />
      <main className="pt-16 pb-12 bg-k12-gray">
        {!showResults ? (
          <SnellenChart
            distance={3}
            onComplete={handleComplete}
          />
        ) : (
          <div className="container mx-auto px-4">
            <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
              <ResultSummary results={results} />
              <button
                onClick={() => setShowResults(false)}
                className="mt-6 w-full k12-btn text-white rounded-lg transition-all font-semibold"
              >
                Take Test Again
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-k12-dark-blue text-white py-4 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>© 2023 K12 Inc. All rights reserved. This vision test is for screening purposes only.</p>
          <p className="mt-1 text-white/70">Not a substitute for a professional eye examination.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
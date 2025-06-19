import { useState } from 'react';
import { SnellenChart } from './components/SnellenChart';
import { ResultSummary } from './components/ResultSummary';

function App() {
  const [currentLine, setCurrentLine] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [results, setResults] = useState<{ left: string; right: string }>({ left: '', right: '' });

  return (
    <div className="min-h-screen bg-white text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Online Vision Test</h1>
      {!testComplete ? (
        <SnellenChart
          currentLine={currentLine}
          setCurrentLine={setCurrentLine}
          setTestComplete={setTestComplete}
          setResults={setResults}
        />
      ) : (
        <ResultSummary results={results} />
      )}
    </div>
  );
}

export default App;

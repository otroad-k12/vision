import React, { useState } from 'react';
import { CONTENT } from '../constants/content';

interface ResultProps {
  results: { left: string; right: string };
}

function getResultMessage(acuity: string): string {
  const score = parseInt(acuity.split('/')[1]);
  return score <= 30 ? CONTENT.RESULTS.PERFECT_SCORE : CONTENT.RESULTS.NEEDS_CHECK;
}

export function ResultSummary({ results }: ResultProps) {
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

  const generateCertificate = () => {
    // TODO: Generate actual PDF certificate
    const dataUrl = `data:text/plain;base64,${btoa(JSON.stringify(results))}`;
    setCertificateUrl(dataUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {CONTENT.RESULTS.TITLE}
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Left Eye Results */}
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="font-semibold mb-2">Left Eye</h3>
            <div className="text-2xl font-bold mb-2">{results.left}</div>
            <div className={`text-sm ${parseInt(results.left.split('/')[1]) <= 30
                ? 'text-green-600'
                : 'text-yellow-600'
              }`}>
              {getResultMessage(results.left)}
            </div>
          </div>

          {/* Right Eye Results */}
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="font-semibold mb-2">Right Eye</h3>
            <div className="text-2xl font-bold mb-2">{results.right}</div>
            <div className={`text-sm ${parseInt(results.right.split('/')[1]) <= 30
                ? 'text-green-600'
                : 'text-yellow-600'
              }`}>
              {getResultMessage(results.right)}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-800 mb-2">
            {CONTENT.RESULTS.EXPLANATION}
          </p>
          <p className="text-sm text-blue-800">
            {CONTENT.RESULTS.NEXT_STEPS}
          </p>
        </div>

        <button
          onClick={generateCertificate}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          {CONTENT.RESULTS.DOWNLOAD_BUTTON}
        </button>

        {certificateUrl && (
          <a
            href={certificateUrl}
            download="vision-test-results.txt"
            className="block w-full text-center text-blue-500 hover:text-blue-600"
          >
            Download your results
          </a>
        )}
      </div>
    </div>
  );
}

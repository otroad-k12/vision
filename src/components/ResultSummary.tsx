import React, { useState } from 'react';
import { CONTENT } from '../constants/content';

interface ResultProps {
  results: { left: string; right: string };
}

function getResultMessage(acuity: string): string {
  const score = parseInt(acuity.split('/')[1]);
  return score <= 30 ? CONTENT.RESULTS.PERFECT_SCORE : CONTENT.RESULTS.NEEDS_CHECK;
}

function getSeverity(acuity: string): 'good' | 'moderate' | 'poor' {
  const score = parseInt(acuity.split('/')[1]);
  if (score <= 30) return 'good';
  if (score <= 70) return 'moderate';
  return 'poor';
}

export function ResultSummary({ results }: ResultProps) {
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

  const generateCertificate = () => {
    // Generate a simple data URL certificate
    const dataUrl = `data:text/plain;base64,${btoa(JSON.stringify(results))}`;
    setCertificateUrl(dataUrl);
  };

  const leftSeverity = getSeverity(results.left);
  const rightSeverity = getSeverity(results.right);
  const overallGood = leftSeverity === 'good' && rightSeverity === 'good';

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-k12-dark-blue text-center mb-6">
        {CONTENT.RESULTS.TITLE}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-k12-gray rounded-lg p-4 border border-k12-blue/10 shadow-sm">
          <h3 className="font-semibold text-k12-dark-blue mb-2">Left Eye</h3>
          <div className="text-2xl font-bold text-k12-blue mb-2">{results.left}</div>
          <div className={`text-sm font-medium ${leftSeverity === 'good'
              ? 'text-green-600'
              : leftSeverity === 'moderate'
                ? 'text-k12-orange'
                : 'text-red-600'
            }`}>
            {getResultMessage(results.left)}
          </div>
        </div>

        <div className="bg-k12-gray rounded-lg p-4 border border-k12-blue/10 shadow-sm">
          <h3 className="font-semibold text-k12-dark-blue mb-2">Right Eye</h3>
          <div className="text-2xl font-bold text-k12-blue mb-2">{results.right}</div>
          <div className={`text-sm font-medium ${rightSeverity === 'good'
              ? 'text-green-600'
              : rightSeverity === 'moderate'
                ? 'text-k12-orange'
                : 'text-red-600'
            }`}>
            {getResultMessage(results.right)}
          </div>
        </div>
      </div>

      <div className={`rounded-lg p-4 mb-6 ${overallGood
          ? 'bg-green-50 border border-green-100'
          : 'bg-k12-orange/10 border border-k12-orange/20'
        }`}>
        <h3 className="font-semibold text-k12-dark-blue mb-2">
          {overallGood ? 'Great News!' : 'Recommendation'}
        </h3>
        <p className="text-k12-text">
          {overallGood
            ? 'Your vision appears to be in the normal range. Continue with regular eye check-ups.'
            : CONTENT.RESULTS.NEXT_STEPS}
        </p>
      </div>

      <div className="bg-k12-gray p-4 rounded-lg text-sm text-k12-text">
        <h3 className="font-semibold text-k12-dark-blue mb-2">What These Results Mean</h3>
        <p className="mb-2">{CONTENT.RESULTS.EXPLANATION}</p>
        <p>Remember that this is just a screening test. For a comprehensive assessment, please consult an eye care professional.</p>
      </div>

      {!certificateUrl ? (
        <button
          onClick={generateCertificate}
          className="mt-6 w-full px-4 py-3 bg-k12-dark-blue text-white rounded-lg hover:opacity-90 transition-all font-semibold"
        >
          {CONTENT.RESULTS.DOWNLOAD_BUTTON}
        </button>
      ) : (
        <a
          href={certificateUrl}
          download="vision-test-results.txt"
          className="mt-6 block w-full px-4 py-3 bg-k12-dark-blue text-white rounded-lg hover:opacity-90 transition-all font-semibold text-center"
        >
          Download Your Results
        </a>
      )}
    </div>
  );
}

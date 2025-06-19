import React from 'react';

interface ResultProps {
  results: { left: string; right: string };
}

export function ResultSummary({ results }: ResultProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Test Complete</h2>
      <p>Your estimated vision:</p>
      <p>Left Eye: <strong>{results.left}</strong></p>
      <p>Right Eye: <strong>{results.right}</strong></p>
      <p className="mt-4 text-sm text-gray-600">Remember, this is a rough estimate. See an eye care professional for a full exam.</p>
    </div>
  );
}

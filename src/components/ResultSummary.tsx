interface ResultProps {
  results: { left: string; right: string };
}

export function ResultSummary({ results }: ResultProps) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Test Complete</h2>
      <p>Your estimated vision:</p>
      <p className="mt-2">Left Eye: <strong>{results.left}</strong></p>
      <p>Right Eye: <strong>{results.right}</strong></p>
    </div>
  );
}

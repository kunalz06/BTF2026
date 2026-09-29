"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="error-state">
      <div>
        <p className="eyebrow">Build the Future Hackathon</p>
        <h1>Something interrupted this page.</h1>
        <p>The confirmed event information is safe. Try loading the page again.</p>
        <button className="button" type="button" onClick={reset}>Try again</button>
      </div>
    </main>
  );
}

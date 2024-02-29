"use client";

export default function Error() {
  // nextjs gives you access to an error prop, you can see it if you destructure it here {error}
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again.</p>
    </main>
  );
}

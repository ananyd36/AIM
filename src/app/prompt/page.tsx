"use client";
import { useState } from "react";
import Link from "next/link";

export default function PromptLibrary() {
  const [usecase, setUsecase] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setFeedback(null);
    setFeedbackSubmitted(false);
    // Call Gemini API (replace with your backend endpoint or direct API call)
    try {
      const res = await fetch("/api/gemini-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usecase }),
      });
      const data = await res.json();
      setResponse(data.prompt || "No prompt found.");
    } catch (err) {
      setResponse("Error fetching prompt. Please try again.");
    }
    setLoading(false);
  }

  async function handleFeedback(type: string) {
    setFeedback(type);
    setFeedbackSubmitted(true);
    // Optionally send feedback to backend
    // await fetch("/api/feedback", { method: "POST", body: JSON.stringify({ usecase, response, feedback: type }) });
  }

  return (
    <>
      {/* Navigation Bar (same as homepage) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
                AIM
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <Link href="/" className="nav-link text-[var(--foreground)]">About</Link>
                <Link href="/#services" className="nav-link text-[var(--foreground)]">Services</Link>
                <Link href="/#contact" className="nav-link text-[var(--foreground)]">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] pt-24 pb-12 px-4">
        <section className="w-full max-w-2xl mx-auto bg-[var(--secondary)] rounded-2xl shadow-lg p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--primary)] text-center">AI Prompt Library</h1>
          <p className="text-lg text-center mb-8 text-[var(--foreground)]/80">
            Describe your usecase and get a curated AI prompt instantly!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              className="w-full min-h-[80px] rounded-lg p-3 bg-[var(--background)] text-[var(--foreground)] border border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
              placeholder="Describe your usecase (e.g., Write a cold email for a SaaS product)"
              value={usecase}
              onChange={e => setUsecase(e.target.value)}
              required
            />
            <button
              type="submit"
              className="self-center px-8 py-3 text-lg font-medium rounded-full bg-[var(--primary)] text-[var(--background)] hover:opacity-90 transition-opacity disabled:opacity-60"
              disabled={loading || !usecase.trim()}
            >
              {loading ? "Generating..." : "Get Prompt"}
            </button>
          </form>

          {/* Response Area */}
          {response && (
            <div className="mt-8 bg-[var(--background)] rounded-lg p-6 border border-[var(--primary)] shadow-inner">
              <h2 className="text-xl font-semibold mb-2 text-[var(--primary)]">Suggested Prompt</h2>
              <pre className="whitespace-pre-wrap text-[var(--foreground)]/90 text-base mb-4">{response}</pre>
              {/* Feedback */}
              {!feedbackSubmitted ? (
                <div className="flex gap-4 items-center">
                  <span className="text-[var(--foreground)]/80">Was this helpful?</span>
                  <button
                    onClick={() => handleFeedback("yes")}
                    className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleFeedback("no")}
                    className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    No
                  </button>
                </div>
              ) : (
                <div className="text-[var(--primary)] font-medium mt-2">Thank you for your feedback!</div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
} 
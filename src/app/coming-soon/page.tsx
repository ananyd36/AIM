import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[var(--primary)]">
        Coming Soon
      </h1>
      <p className="text-xl text-center mb-12 text-[var(--foreground)]/90 max-w-2xl">
        We're working hard to bring you this exciting new service. Stay tuned for updates!
      </p>
      <Link
        href="/"
        className="px-8 py-3 text-lg font-medium rounded-full bg-[var(--primary)] text-[var(--background)] hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
} 
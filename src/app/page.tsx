import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Navigation Bar */}
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
                <Link href="#about" className="nav-link text-[var(--foreground)]">About</Link>
                <Link href="#services" className="nav-link text-[var(--foreground)]">Services</Link>
                <Link href="#contact" className="nav-link text-[var(--foreground)]">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full min-h-screen flex items-center justify-center bg-[var(--background)] pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-[var(--primary)]">
              Ready to AIM?
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-[var(--foreground)]/90">
              Empower your future through artificial intelligence!
            </p>
            <p className="text-lg sm:text-xl mb-12 text-[var(--foreground)]/80">
              Your partner in AI innovation, offering comprehensive solutions through our prompt library,
              expert consulting, and educational resources.
            </p>
            <Link 
              href="#services"
              className="inline-block px-8 py-3 text-lg font-medium rounded-full bg-[var(--primary)] text-[var(--background)] hover:opacity-90 transition-opacity"
            >
              Explore Our Services
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-20 bg-[var(--secondary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-[var(--primary)]">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1: Prompt Library */}
              <div className="bg-[var(--background)] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[var(--secondary)]">
                  <Image src="/prompt.svg" alt="Prompt Library" width={32} height={32} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[var(--primary)]">AI Prompt Library</h3>
                <p className="text-[var(--foreground)]/90 mb-6">Explore a curated library of AI prompts for any task—creative, business, coding, and more.</p>
                <Link 
                  href="/prompt"
                  className="text-[var(--primary)] hover:underline"
                >
                  Explore Prompt Library →
                </Link>
              </div>

              {/* Service 2: Consulting */}
              <div className="bg-[var(--background)] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[var(--secondary)]">
                  <Image src="/consulting.svg" alt="AI Consulting" width={32} height={32} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[var(--primary)]">AI Consulting & Solutions</h3>
                <p className="text-[var(--foreground)]/90 mb-6">Get expert guidance and custom AI solutions for your business needs.</p>
                <Link 
                  href="/consulting"
                  className="text-[var(--primary)] hover:underline"
                >
                  Explore Consulting →
                </Link>
              </div>

              {/* Service 3: Learning */}
              <div className="bg-[var(--background)] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[var(--secondary)]">
                  <Image src="/learning.svg" alt="AI Learning" width={32} height={32} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[var(--primary)]">AI Teaching & Courses</h3>
                <p className="text-[var(--foreground)]/90 mb-6">Learn AI from the ground up with our comprehensive courses and tutorials.</p>
                <Link 
                  href="/learning"
                  className="text-[var(--primary)] hover:underline"
                >
                  Explore Learning →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20 bg-[var(--background)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[var(--primary)]">Get in Touch</h2>
            <p className="text-xl mb-12 text-[var(--foreground)]/90">
              Ready to start your AI journey? We're here to help you succeed.
            </p>
            <div className="inline-flex gap-4">
              <a
                href="mailto:contact@aim.com"
                className="px-8 py-3 text-lg font-medium rounded-full bg-[var(--primary)] text-[var(--background)] hover:opacity-90 transition-opacity"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 bg-[var(--secondary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-[var(--foreground)]/60">
              &copy; {new Date().getFullYear()} AIM. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

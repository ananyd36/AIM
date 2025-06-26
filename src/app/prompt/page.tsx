"use client";
import { useState } from "react";
import Link from "next/link";

const checklistData = [
  {
    criterion: "Complexity Handled",
    description:
      "Automates tasks that typically demand expert human analysis, saving significant time and specialized labor costs.",
    techniques: ["Chain-of-Thought", "Task Decomposition", "Tree-of-Thought", "ReAct"],
  },
  {
    criterion: "Output Accuracy & Reliability",
    description:
      "Reduces the need for extensive manual review and correction, preventing costly errors and ensuring trustworthiness.",
    techniques: ["Self-Consistency", "Generate Knowledge", "RAG", "Few-Shot"],
  },
  {
    criterion: "Significant Time Savings",
    description:
      "Frees up valuable professional time, allowing users to focus on higher-level strategic work.",
    techniques: ["All techniques combined for efficiency"],
  },
  {
    criterion: "Deep Domain Specificity",
    description:
      "Delivers specialized insights that generic AI models cannot, acting as a virtual subject matter expert.",
    techniques: ["Persona Prompting", "Contextual Prompting", "Few-Shot"],
  },
  {
    criterion: "High Reusability & Scalability",
    description:
      "Offers long-term value by serving as a repeatable solution for recurring complex tasks.",
    techniques: ["Structured Prompts", "Parameterization"],
  },
  {
    criterion: "Integration Readiness",
    description:
      "Enables automation of downstream processes, enhancing overall system efficiency and reducing manual data manipulation.",
    techniques: ["Structured Output Definition"],
  },
];

const techData: Record<string, { description: string; benefit: string }> = {
  "Chain-of-Thought (CoT)": {
    description:
      "Guides the model to break down complex problems into sequential, logical steps, articulating its intermediate thought processes. This enhances reasoning, particularly for math and symbolic reasoning, improving accuracy and transparency.",
    benefit: "Improved reasoning and problem-solving.",
  },
  "Few-Shot Prompting": {
    description:
      "Provides a small number of input-output examples ('shots') within the prompt to demonstrate the desired task, tone, or format. This helps the model understand the expected response pattern without being explicitly told.",
    benefit: "Better performance and consistency on new tasks.",
  },
  "Persona Prompting": {
    description:
      "Assigns a specific character, role, or expertise to the AI (e.g., 'Act as a senior data analyst'). This influences its tone, vocabulary, and perspective, leading to more authoritative and domain-specific responses.",
    benefit: "Ensures domain-specific, authoritative answers.",
  },
  "Task Decomposition": {
    description:
      "Breaks down a complex overall task into smaller, more manageable subtasks that the AI processes sequentially. This simplifies complex problems and reduces the likelihood of errors.",
    benefit: "Manages complexity and improves reliability.",
  },
  "Retrieval Augmented Generation (RAG)": {
    description:
      "Integrates external, up-to-date information retrieval with the generative AI. The model uses this fetched knowledge to produce responses that are more accurate and grounded in current or proprietary data.",
    benefit: "Provides more informed and factually accurate responses.",
  },
  "Tree-of-Thought (ToT)": {
    description:
      "Extends CoT by encouraging the model to explore multiple branches of reasoning simultaneously before converging on a final output. This allows for more robust and comprehensive problem-solving.",
    benefit: "Facilitates better solutions for complex problems with multiple paths.",
  },
};

const promptData: Record<string, { category: string; value: string; techniques: string[]; content: string }> = {
  "SQL Debugger": {
    category: "Data & Analytics",
    value:
      "Acts as a virtual senior SQL architect, identifying subtle errors, performance bottlenecks, and syntax issues. It provides corrections, detailed explanations, and optimized alternatives, saving hours of manual debugging.",
    techniques: ["Persona Prompting", "Chain-of-Thought", "Structured Output"],
    content: `You are an Expert SQL Architect with over 20 years of experience in optimizing, debugging, and refactoring complex SQL queries for high-performance, enterprise-grade relational databases. Your task is to meticulously review a provided SQL query.\n\n**Follow these steps for your analysis:**\n1.  **Syntax Check:** Validate the SQL syntax.\n2.  **Logical Flow Analysis:** Trace the data flow and operations.\n3.  **Performance Bottleneck Identification:** Analyze for anti-patterns.\n4.  **Best Practices Review:** Assess against general SQL best practices.\n5.  **Provide Corrected & Optimized Query.**\n6.  **Explain Changes:** Detail why each change was made.\n\n**Input Data:**\n**SQL Dialect:** [User provides dialect]\n**Database Schema:** [User provides schema]\n**Original SQL Query:** [User provides query]\n**Observed Error/Problem:** [User provides error]\n\n**Output Format:**\nProvide the response in Markdown, structured with the following headings:\n### SQL Debugging and Optimization Report\n#### 1. Syntax Review\n#### 2. Logical Flow Analysis\n#### 3. Performance Bottleneck Identification & Optimization\n#### 4. Best Practices Adherence\n#### 5. Corrected & Optimized SQL Query\n\`\`\`sql\n-- Corrected and Optimized Query Here\n\`\`\`\n#### 6. Explanation of Changes\n`,
  },
  "Resume Optimizer": {
    category: "Job Search & Career",
    value:
      "Transforms a generic resume into a targeted, ATS-friendly document optimized for a specific job. It provides strategic advice on phrasing and impact statements, significantly increasing the chances of securing an interview.",
    techniques: ["Persona Prompting", "Task Decomposition", "Contextual Prompting"],
    content: `You are a Senior Talent Acquisition Specialist with deep knowledge of Applicant Tracking Systems (ATS) and what makes a resume stand out. Your goal is to optimize a resume for a specific job description.\n\n**Analyze and perform the following steps:**\n1.  **ATS Keyword Analysis:** Identify and highlight missing keywords.\n2.  **Impact Statement Enhancement:** Rephrase bullet points to be action-oriented and quantifiable.\n3.  **Summary/Objective Optimization:** Draft a compelling summary tailored to the job.\n4.  **Formatting & Readability Suggestions:** Provide recommendations for structure and layout.\n5.  **Identify Missing Information/Gaps.**\n\n**Input Data:**\n**Candidate's Current Resume:** [User provides resume text]\n**Target Job Description:** [User provides job description]\n\n**Output Format:**\nProvide the response in Markdown, structured with the following headings:\n### Resume Optimization Report\n#### 1. ATS Keyword Alignment & Gaps\n#### 2. Enhanced Impact Statements (Examples)\n#### 3. Optimized Professional Summary/Objective\n#### 4. Formatting & Readability Recommendations\n#### 5. Additional Areas for Improvement\n`,
  },
  "Dashboard Explainer": {
    category: "Data & Analytics",
    value:
      "Transforms complex data dashboards into clear, actionable narratives for non-technical stakeholders. It interprets trends and explains their business implications, improving data literacy and speeding up decision-making.",
    techniques: ["Persona Prompting", "Chain-of-Thought", "Structured Output"],
    content: `You are a Senior Data Storyteller and Business Analyst. Your objective is to explain a dashboard's key metrics, trends, and implications to a non-technical audience.\n\n**Follow these steps to construct your explanation:**\n1.  **Dashboard Overview:** Describe the dashboard's purpose.\n2.  **Key Metric Interpretation:** Explain each primary metric's significance.\n3.  **Trend Analysis:** Identify and interpret significant trends or anomalies.\n4.  **Root Cause & Impact Hypothesis:** Hypothesize causes and business impacts.\n5.  **Actionable Insights & Recommendations:** Translate insights into clear recommendations.\n6.  **Concise Summary:** Provide a high-level summary of takeaways.\n\n**Input Data:**\n**Dashboard Description/Purpose:** [User provides details]\n**Target Audience:** [User provides audience]\n**Key Dashboard Components:** [User describes charts/tables]\n\n**Output Format:**\nProvide the response as a narrative report in Markdown:\n### Dashboard Analysis\n#### 1. Executive Overview\n#### 2. Key Metric Deep Dive\n#### 3. Trend Analysis & Observations\n#### 4. Hypothesized Causes & Business Impact\n#### 5. Strategic Recommendations & Next Steps\n`,
  },
  "Cover Letter Draft": {
    category: "Job Search & Career",
    value:
      "Generates a highly personalized and compelling cover letter for a specific job application. It strategically highlights relevant skills and aligns with company values, distinguishing the applicant from generic submissions.",
    techniques: ["Persona Prompting", "Task Decomposition", "Contextual Prompting"],
    content: `You are a Professional Career Coach specializing in crafting impactful, personalized cover letters. Your task is to draft a compelling letter for a candidate.\n\n**Follow these steps to construct the letter:**\n1.  **Analyze Alignment:** Match candidate experience to job requirements.\n2.  **Personalized Introduction:** Draft an engaging opening paragraph.\n3.  **Skills & Experience Body Paragraphs:** Create 2-3 paragraphs highlighting achievements.\n4.  **Company Alignment:** Integrate insights about the company to show genuine interest.\n5.  **Strong Call to Action:** Conclude with a confident closing.\n6.  **Tone & Length:** Maintain a professional, concise tone (3-4 paragraphs).\n\n**Input Data:**\n**Candidate's Name & Background:** [User provides info]\n**Target Company & Job Title:** [User provides info]\n**Hiring Manager Name (if known, otherwise leave blank):**\n**Job Description:**\n**Key Candidate Achievements/Skills to Highlight (specific examples):**\n* [Achievement 1: e.g., "Successfully managed CRM system for 200+ clients, improving data accuracy by 15%."]\n* [Achievement 2: e.g., "Led cross-functional team of 5 to launch new product, exceeding Q1 revenue targets by 10%."]\n* [Achievement 3: e.g., "Implemented new customer feedback loop, increasing customer satisfaction scores by 8%."]\n**Why Candidate is Interested in THIS Company/Role (specific reasons):**\n* [Reason 1: e.g., "Deep admiration for Company X's innovative approach to sustainable technology."]\n* [Reason 2: e.g., "Excited by the opportunity to contribute to a team focused on developing cutting-edge AI solutions."]\n\n**Output Format:**\nProvide the cover letter in plain text, formatted as a standard business letter, ready for copy-pasting. Include a placeholder for the date and recipient address.\n`,
  },
};

const promptTabs = Object.keys(promptData);

export default function PromptLibrary() {
  // Sparkle Prompt State
  const [sparkleInput, setSparkleInput] = useState("");
  const [sparkleOutput, setSparkleOutput] = useState<string | null>(null);
  const [sparkleLoading, setSparkleLoading] = useState(false);
  const [sparkleError, setSparkleError] = useState<string | null>(null);

  // Toolkit State
  const [activeTech, setActiveTech] = useState(Object.keys(techData)[0]);

  // Prompt Library Tabs
  const [activePromptTab, setActivePromptTab] = useState(promptTabs[0]);

  // Checklist State
  const [openChecklist, setOpenChecklist] = useState<number | null>(null);

  // Sparkle Prompt Handler
  async function handleSparklePrompt() {
    setSparkleLoading(true);
    setSparkleError(null);
    setSparkleOutput(null);
    try {
      const res = await fetch("/api/gemini-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usecase: sparkleInput }),
      });
      const data = await res.json();
      if (data.prompt) {
        setSparkleOutput(data.prompt);
      } else {
        setSparkleError("Failed to generate prompt. Please try again.");
      }
    } catch (err) {
      setSparkleError("An error occurred. Please try again.");
    }
    setSparkleLoading(false);
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

      <main className="pt-24 pb-12 bg-[var(--background)] min-h-screen">
        {/* Product-Specific Navigation */}
        <nav className="bg-[var(--secondary)]/90 backdrop-blur-md top-[64px] z-40 shadow-sm border-b border-[var(--primary)] sticky">
          <div className="container mx-auto px-6 py-3 flex justify-center md:justify-start space-x-6 md:space-x-8 text-[var(--foreground)]">
            <a href="#hero" className="nav-link-product font-semibold text-[var(--primary)]">Prompts Overview</a>
            <a href="#value" className="nav-link-product">Value</a>
            <a href="#toolkit" className="nav-link-product">Toolkit</a>
            <a href="#library" className="nav-link-product">Library</a>
            <a href="#sparkle-prompt" className="nav-link-product">Sparkle Prompt</a>
            <a href="#strategy" className="nav-link-product">Strategy</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="py-20 md:py-32 text-center bg-[var(--secondary)]">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--primary)] leading-tight">
              Architecting Your Premium AI Prompts
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[var(--foreground)]/90 max-w-3xl mx-auto">
              This is a preview of our premium, expert-crafted AI prompts. Moving beyond simple queries, our specialized prompt packages engineer high-value instructions that deliver unparalleled results for analysts, creators, and builders.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a href="../waitlist/" className="cta-button cta-button-primary bg-[var(--secondary)] text-[var(--primary)] border-[var(--primary)] border-2 shadow-md rounded font-semibold px-6 py-3 transition-colors duration-200">Join Our Waitlist</a>
              <a href="/contact" className="cta-button cta-button-primary bg-[var(--secondary)] text-[var(--primary)] border-[var(--primary)] border-2 shadow-md rounded font-semibold px-6 py-3 transition-colors duration-200">Learn More</a>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-[var(--background)] p-6 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-[var(--primary)]">$6,533.87B</p>
                <p className="mt-2 text-[var(--foreground)]/80">Projected Prompt Engineering Market by 2034</p>
              </div>
              <div className="bg-[var(--background)] p-6 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-[var(--primary)]">32.90%</p>
                <p className="mt-2 text-[var(--foreground)]/80">Compound Annual Growth Rate (CAGR)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section id="value" className="py-20 bg-[var(--background)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">The Anatomy of a Premium Prompt</h2>
              <p className="mt-4 text-lg text-[var(--foreground)]/90 max-w-3xl mx-auto">
                A premium prompt is not just an instruction; it's a meticulously engineered solution. It justifies its value by automating complex tasks, reducing errors, and delivering expert-level insights that save significant time and resources. Click each criterion to see how.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {checklistData.map((item, idx) => (
                <div key={item.criterion} className="bg-[var(--secondary)] rounded-lg shadow-sm overflow-hidden">
                  <button
                    className="w-full text-left p-4 font-semibold text-[var(--foreground)] flex justify-between items-center hover:bg-[var(--primary)]/10 transition-colors"
                    onClick={() => setOpenChecklist(openChecklist === idx ? null : idx)}
                  >
                    <span>{item.criterion}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${openChecklist === idx ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className={`px-4 pb-4 bg-[var(--background)] ${openChecklist === idx ? "block" : "hidden"}`}>
                    <p className="text-[var(--foreground)]/90">{item.description}</p>
                    <div className="mt-2 text-sm">
                      <span className="font-semibold">Key Techniques:</span>
                      <span className="text-[var(--primary)] ml-2">{item.techniques.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Toolkit Section */}
        <section id="toolkit" className="py-20 bg-[var(--secondary)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">The Prompt Architect's Toolkit</h2>
              <p className="mt-4 text-lg text-[var(--foreground)]/90 max-w-3xl mx-auto">
                Expert-level prompts are built using a combination of foundational principles and advanced techniques. This toolkit allows you to explore the methods that transform a simple query into a powerful, precise instruction for an AI model.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto bg-[var(--background)] p-4 rounded-lg shadow-md">
              <div className="md:w-1/3 flex-shrink-0 space-y-2">
                {Object.keys(techData).map((tech) => (
                  <button
                    key={tech}
                    className={`tech-btn w-full text-left p-3 rounded-md transition-colors ${activeTech === tech ? "bg-[var(--primary)]/20 text-[var(--primary)] font-semibold" : "hover:bg-[var(--primary)]/10"}`}
                    onClick={() => setActiveTech(tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              <div className="md:w-2/3 bg-[var(--secondary)] p-6 rounded-lg min-h-[300px]">
                <h3 className="text-xl font-bold text-[var(--primary)] mb-2">{activeTech}</h3>
                <p className="text-[var(--foreground)]/90 mb-4">{techData[activeTech].description}</p>
                <div className="bg-[var(--background)] p-3 rounded-md">
                  <p className="font-semibold text-[var(--primary)]">Primary Benefit:</p>
                  <p className="text-[var(--foreground)]/90">{techData[activeTech].benefit}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Library Section */}
        <section id="library" className="py-20 bg-[var(--background)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">The Premium Prompt Library</h2>
              <p className="mt-4 text-lg text-[var(--foreground)]/90 max-w-3xl mx-auto">
                Explore concrete examples of premium prompts designed for specific, high-value use cases. Each prompt applies the advanced techniques from the toolkit to automate complex professional tasks, showcasing the tangible output of expert prompt engineering.
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center border-b border-[var(--primary)] mb-8">
                {promptTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn px-4 py-2 -mb-px font-semibold border-b-2 border-transparent rounded-t-lg transition-colors duration-200
                      ${activePromptTab === tab
                        ? "bg-[var(--secondary)] text-[var(--primary)] border-[var(--primary)] shadow-md"
                        : "text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]"}
                    `}
                    onClick={() => setActivePromptTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="bg-[var(--secondary)] p-6 rounded-lg shadow-md">
                <div className="prompt-card active">
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-2">{activePromptTab}</h3>
                  <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-4">{promptData[activePromptTab].category}</p>
                  <p className="text-[var(--foreground)]/90 mb-4">{promptData[activePromptTab].value}</p>
                  <div className="mb-6">
                    <span className="font-semibold mr-2">Techniques Used:</span>
                    <span className="text-[var(--primary)]">
                      {promptData[activePromptTab].techniques.map((t: string) => (
                        <span key={t} className="inline-block bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{t}</span>
                      ))}
                    </span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Prompt Template:</h4>
                  <pre className="code-block whitespace-pre-wrap bg-[var(--background)] text-[var(--foreground)]">{promptData[activePromptTab].content.trim()}</pre>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-lg text-[var(--foreground)]/90 mb-6 max-w-2xl mx-auto">
                Ready to unlock the full power of AI for your specific needs? Join our waitlist to be notified about pricing and package options for our full range of premium prompt packages!
              </p>
              <a href="../waitlist/" className="cta-button cta-button-primary bg-[var(--secondary)] text-[var(--primary)] border-[var(--primary)] border-2 shadow-md rounded font-semibold px-6 py-3 transition-colors duration-200">Join the Waitlist Today!</a>
            </div>
          </div>
        </section>

        {/* Sparkle Prompt Section */}
        <section id="sparkle-prompt" className="py-20 bg-[var(--secondary)]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">✨ Try a Premium Prompt ✨</h2>
            <p className="text-lg text-[var(--foreground)]/90 max-w-3xl mx-auto mb-8">
              See the power of a meticulously crafted prompt! Enter a basic idea, and our AI will transform it into a professional, high-value prompt using the techniques outlined in our toolkit.
            </p>
            <div className="max-w-3xl mx-auto bg-[var(--background)] p-6 rounded-lg shadow-md">
              <textarea
                className="w-full p-4 rounded-md border border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent mb-4 resize-y min-h-[120px] text-[var(--foreground)] bg-[var(--background)]"
                placeholder="e.g., Write a marketing email for a new software feature called 'AI Methods Pro'."
                value={sparkleInput}
                onChange={e => setSparkleInput(e.target.value)}
              />
              <button
                onClick={handleSparklePrompt}
                className="cta-button cta-button-primary bg-[var(--secondary)] text-[var(--primary)] border-[var(--primary)] border-2 shadow-md rounded font-semibold px-6 py-3 transition-colors duration-200"
                disabled={sparkleLoading || !sparkleInput.trim()}
              >
                {sparkleLoading ? "Generating..." : "Generate Premium Prompt"}
              </button>
              <div className="mt-6 text-left">
                {sparkleLoading && (
                  <div className="text-center text-[var(--primary)] font-semibold">Generating your premium prompt...</div>
                )}
                {sparkleError && (
                  <div className="text-center text-red-600 font-semibold">{sparkleError}</div>
                )}
                {sparkleOutput && (
                  <pre className="code-block whitespace-pre-wrap bg-[var(--background)] text-[var(--foreground)]">{sparkleOutput}</pre>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="py-20 bg-[var(--background)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">Market Opportunity & Strategy</h2>
              <p className="mt-4 text-lg text-[var(--foreground)]/90 max-w-3xl mx-auto">
                The demand for specialized AI solutions is growing exponentially. This section outlines the market landscape and strategic approach for commercializing a premium prompt library, from productization to ensuring long-term value through continuous maintenance.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-[var(--secondary)] p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                {/* Placeholder for chart - you can integrate Chart.js or another chart library here if needed */}
                <div className="text-3xl font-bold text-[var(--primary)] mb-2">$6,533.87B</div>
                <div className="text-[var(--foreground)]/80 mb-4">Projected Prompt Engineering Market by 2034</div>
                <div className="text-3xl font-bold text-[var(--primary)] mb-2">32.90%</div>
                <div className="text-[var(--foreground)]/80">Compound Annual Growth Rate (CAGR)</div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">Packaging & Pricing</h3>
                  <p className="text-[var(--foreground)]/90">
                    Beyond individual sales, curated bundles and subscription models offer continuous value, providing users with a library that evolves alongside AI technology itself. This ensures prompts remain effective and justifies recurring revenue.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">Marketing & Positioning</h3>
                  <p className="text-[var(--foreground)]/90">
                    Focus on tangible benefits: time saved, errors eliminated, and access to virtual expertise. Case studies and educational content will demonstrate the clear ROI to a professional audience of analysts, creators, and builders.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">Scalability & Maintenance</h3>
                  <p className="text-[var(--foreground)]/90">
                    Success hinges on a robust framework of versioning, documentation, and automated testing. Continuous adaptation to new LLM versions is not just maintenance—it's a core feature of the premium value proposition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { usecase } = await req.json();
  if (!usecase) {
    return NextResponse.json({ error: "Missing usecase" }, { status: 400 });
  }

  // Replace with your Gemini API key
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

  try {
    const geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a high-quality AI prompt for the following usecase: ${usecase}`,
              },
            ],
          },
        ],
      }),
    });
    const geminiData = await geminiRes.json();
    const prompt = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "No prompt found.";
    return NextResponse.json({ prompt });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from Gemini API." }, { status: 500 });
  }
} 
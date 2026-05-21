import { GENERATE_SCRIPT_PROMPT } from "@/services/Prompt";
import { NextResponse } from "next/server"
import OpenAI from "openai"

export const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || "dummy-key",
    baseURL: "https://openrouter.ai/api/v1",
})
export async function POST(req) {

    const { topic } = await req.json();
    const PROMPT = GENERATE_SCRIPT_PROMPT.replace('{topic}', topic);

    const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
            { role: "user", content: PROMPT }
        ],
    })

    console.log(completion.choices[0].message)
    return NextResponse.json(completion.choices[0].message?.content)
}
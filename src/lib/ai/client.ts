import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

// Singleton pattern for Vercel serverless
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Model routing
export const MODELS = {
  primary: "claude-3-5-sonnet-20241022", // Main agent model
  fast: "claude-3-5-haiku-20241022", // Quick tasks, flashcard generation
  embeddings: "text-embedding-3-small", // OpenAI embeddings for search
} as const;

import OpenAI from "openai";
import { PropertyFilters } from "@/types";
import { SYSTEM_PROMPT } from "./system-prompt";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  ...(process.env.OPENAI_ORGANIZATION_ID && {
    organization: process.env.OPENAI_ORGANIZATION_ID,
  }),
});

export interface ChatResponse {
  message: string;
  filters?: Partial<PropertyFilters>;
}

export async function generateChatResponse(
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<ChatResponse> {
  try {
    // Verify API key is present
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      throw new Error("OpenAI API key is not configured");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    console.log("completion", completion.choices[0].message.content);

    if (!completion.choices[0].message.content) {
      console.error("Empty response from OpenAI");
      throw new Error("Empty response from OpenAI");
    }

    try {
      const response = JSON.parse(
        completion.choices[0].message.content
      ) as ChatResponse;

      // Validate response structure
      if (typeof response.message !== "string") {
        throw new Error("Invalid response format: message is not a string");
      }

      return response;
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      console.error("Raw response:", completion.choices[0].message.content);
      throw new Error("Failed to parse OpenAI response");
    }
  } catch (error) {
    console.error("Error in generateChatResponse:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return {
      message:
        "Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta mas tarde.",
    };
  }
}

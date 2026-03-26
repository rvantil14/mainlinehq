import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { businessName, tradeType, jobDescription } = await request.json();

    if (!businessName || !tradeType || !jobDescription) {
      return NextResponse.json(
        { error: "Missing required fields: businessName, tradeType, jobDescription" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === "sk-ant-your-key-here") {
      // Demo mode fallback
      const demoQuote = [
        `Quote for ${businessName}`,
        "",
        `Job: ${jobDescription}`,
        "",
        `Estimated Price Range: $150 - $350`,
        "",
        "What's Included:",
        "- Labor and standard materials",
        "- Cleanup after the job",
        "- 30-day workmanship guarantee",
        "",
        "Estimated Time: 2-4 hours",
        "",
        "Notes: Final price depends on on-site assessment. This is a rough estimate based on the description provided. No charge for the estimate visit.",
      ].join("\n");

      return NextResponse.json({ quote: demoQuote });
    }

    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are a pricing assistant for a ${tradeType} business called ${businessName}. Based on the customer's job description, provide a rough estimate range. Include: job description summary, estimated price range (low-high), what's included, estimated time, and any notes. Keep it professional but conversational. Format as plain text that can be copied and pasted into a text message or email. Do not use markdown formatting. Use line breaks to separate sections. Keep it concise.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: jobDescription,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const quote = textBlock ? textBlock.text : "Unable to generate quote.";

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Quote generation error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate quote";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

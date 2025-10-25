import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  try {
    const { emailContent } = await request.json()

    if (!emailContent || emailContent.trim().length === 0) {
      return Response.json({ error: "Email content is required" }, { status: 400 })
    }

    const prompt = `Analyze the following email for spam and phishing indicators. Provide a detailed assessment.

Email Content:
${emailContent}

Respond in JSON format with these exact fields:
{
  "spamScore": <number 0-100>,
  "riskLevel": "<Low Risk|Medium Risk|High Risk>",
  "threats": [<array of detected threat types like "phishing", "malware", "spoofing", "suspicious links", etc>],
  "analysis": "<detailed explanation of findings>",
  "recommendations": [<array of recommended actions>]
}

Consider these factors:
- Suspicious sender addresses or domain spoofing
- Urgency language and pressure tactics
- Requests for personal/financial information
- Suspicious links or attachments
- Grammar and spelling errors
- Unusual formatting or hidden content
- Known phishing patterns
- Malware indicators

Provide accurate, helpful analysis.`

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.3,
    })

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response")
    }

    const results = JSON.parse(jsonMatch[0])

    return Response.json(results)
  } catch (error) {
    console.error("Analysis error:", error)
    return Response.json({ error: "Failed to analyze email" }, { status: 500 })
  }
}

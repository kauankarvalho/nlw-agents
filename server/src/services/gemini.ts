import { GoogleGenAI } from "@google/genai"
import { env } from "../env/index.ts"

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

const model = "gemini-2.5-flash"

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const prompt =
    "Transcreva o áudio para o português do Brasil com precisão e naturalidade. Use pontuação adequada e divida o texto em parágrafos sempre que fizer sentido."

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })

  if (!response.text) {
    throw new Error("⚠️ Unable to convert the audio!")
  }

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [{ text }],
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error("⚠️ Unable to generate embeddings!")
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: number[],
) {
  const context = transcriptions.join("\n\n")

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda à pergunta de forma clara e precisa, em português do Brasil.

    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não estiver no contexto, responda que não há informações suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom educativo e profissional;
    - Cite trechos relevantes do contexto, se apropriado;
    - Ao citar o contexto, utilize o termo "conteúdo da aula".
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error("⚠️ Failed to generate a response using Gemini!")
  }

  return response.text
}

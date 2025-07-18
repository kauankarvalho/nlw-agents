import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { generateEmbeddings, transcribeAudio } from "../services/gemini.ts"
import { database } from "../db/connection.ts"
import { schema } from "../db/schema/index.ts"
import z from "zod/v4"

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/audio",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params

      const audio = await request.file()

      console.log(audio)

      if (!audio) {
        throw new Error("⚠️ Audio is required!")
      }

      const audioBuffer = await audio.toBuffer()
      const audioAsBase64 = audioBuffer.toString("base64")

      const transcription = await transcribeAudio(audioAsBase64, audio.mimetype)
      const embeddings = await generateEmbeddings(transcription)

      const result = await database
        .insert(schema.audioChunks)
        .values({
          room_id: roomId,
          transcription,
          embeddings,
        })
        .returning()

      const chunk = result[0]

      if (!chunk) {
        throw new Error("⚠️ Error saving audio chunk!")
      }

      return reply.status(201).send({ chunkId: chunk.id })
    },
  )
}

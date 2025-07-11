import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { database } from "../db/connection.ts"
import { schema } from "../db/schema/index.ts"
import { z } from "zod/v4"

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(2),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body

      const result = await database
        .insert(schema.questions)
        .values({
          room_id: roomId,
          question,
        })
        .returning()

      const insertedQuestion = result[0]

      if (!insertedQuestion) {
        throw new Error("Failed to create new question.")
      }

      return reply.status(201).send({ questionId: insertedQuestion.id })
    },
  )
}

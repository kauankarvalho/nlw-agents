import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { database } from "../db/connection.ts"
import { schema } from "../db/schema/index.ts"
import { desc, eq } from "drizzle-orm"
import { z } from "zod/v4"

export const getRoomQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request) => {
      const { roomId } = request.params

      const result = await database
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createdAt: schema.questions.created_at,
        })
        .from(schema.questions)
        .where(eq(schema.questions.room_id, roomId))
        .orderBy(desc(schema.questions.created_at))

      return result
    },
  )
}

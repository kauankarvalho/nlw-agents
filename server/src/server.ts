import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { env } from "./env/index.ts"
import { createQuestionRoute } from "./routes/create-question.ts"
import { createRoomRoute } from "./routes/create-room.ts"
import { getRoomQuestionsRoute } from "./routes/get-room-questions.ts"
import { getRoomsRoute } from "./routes/get-rooms.ts"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: "http://localhost:5173",
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get("/health", () => "OK")

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionRoute)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("🚀 HTTP Server Running!")
    console.log(`🔑 PORT:${env.PORT}`)
  })

import { reset, seed } from "drizzle-seed"
import { database, sql } from "./connection.ts"
import { schema } from "./schema/index.ts"

const seedSchema = {
  questions: schema.questions,
  rooms: schema.rooms,
}

await reset(database, schema)

await seed(database, seedSchema).refine((faker) => {
  return {
    rooms: {
      count: 3,
      columns: {
        name: faker.companyName(),
        description: faker.loremIpsum(),
      },
      with: {
        questions: 2,
      },
    },
  }
})

await sql.end()

console.log("🌱 Database seeded")

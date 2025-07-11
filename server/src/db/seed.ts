import { reset, seed } from "drizzle-seed"
import { database, sql } from "./connection.ts"
import { schema } from "./schema/index.ts"

await reset(database, schema)

await seed(database, schema).refine((faker) => {
  return {
    rooms: {
      count: 5,
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

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("🌱 Database seeded")

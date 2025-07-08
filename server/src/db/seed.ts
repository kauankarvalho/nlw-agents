import { reset, seed } from "drizzle-seed"
import { database, sql } from "./connection.ts"
import { schema } from "./schema/index.ts"

await reset(database, seed)

await seed(database, schema).refine((faker) => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: faker.companyName(),
        description: faker.loremIpsum(),
      },
    },
  }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("🌱 Database seeded")

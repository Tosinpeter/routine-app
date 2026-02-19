import { db } from './index.js'
import { users } from './schema.js'

async function seed() {
  // Seed users (onConflictDoNothing so re-running is safe)
  await db
    .insert(users)
    .values([
      { phone_number: '+1234567890' }
    ])
    .onConflictDoNothing({ target: users.phone_number })

  console.log('Seed completed.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

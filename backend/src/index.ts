import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from './routes/auth.js'
import { profileRoute } from './routes/profile.js'
import { couponRoute } from './routes/coupons.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/auth', auth)
app.route('/api/profile', profileRoute)
app.route('/api/coupons', couponRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

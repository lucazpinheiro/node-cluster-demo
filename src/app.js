import crypto from 'crypto'
import express from 'express'

const PORT = 3000

const app = express()

function doWork (duration = 5000) {
  const start = Date.now()
  while (Date.now() - start < duration) {}
}

app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`)
  next()
})

app.get('/status', (req, res) => {
  doWork()
  res.status(200).json({
    status: 'server is up!'
  })
})
app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
    res.status(200).json({
      msg: 'GET / - TODO'
    })
  })
})

export default function startApp() {
  app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))
}


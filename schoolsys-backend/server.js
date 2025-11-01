require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: process.env.ORIGIN || '*' }
})

app.use(cors({ origin: process.env.ORIGIN || '*' }))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => {
  console.error('Error conectando a MongoDB:', err.message)
  process.exit(1) // Render se cae si no conecta
})

// Socket global
app.set('io', io)

// Rutas
app.use('/api/alumnos', require('./routes/alumnos'))
app.use('/api/notas', require('./routes/notas'))
app.use('/api/asistencias', require('./routes/asistencias'))
app.use('/api/reportes', require('./routes/reportes'))

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))

const express = require('express')
const router = express.Router()
const Asistencia = require('../models/Asistencia')
const Alumno = require('../models/Alumno')

router.get('/', async (req, res) => {
  const asistencias = await Asistencia.find().populate('estudiante')
  const formateadas = asistencias.map(a => ({
    _id: a._id,
    alumnoNombre: `${a.estudiante.nombre} ${a.estudiante.apellido}`,
    estado: a.estado,
    fecha: a.fecha
  }))
  res.json(formateadas)
})

router.post('/', async (req, res) => {
  const nueva = new Asistencia(req.body)
  await nueva.save()
  const io = req.app.get('io')
  io.emit('asistencia:nueva', nueva)
  res.json(nueva)
})

router.get('/resumen', async (req, res) => {
  const resumen = await Asistencia.aggregate([
    { $group: { _id: '$estado', total: { $sum: 1 } } }
  ])
  const resultado = { presente: 0, ausente: 0, tarde: 0 }
  resumen.forEach(r => resultado[r._id] = r.total)
  res.json(resultado)
})

module.exports = router

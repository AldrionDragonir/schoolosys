const express = require('express')
const router = express.Router()
const Nota = require('../models/Nota')
const Alumno = require('../models/Alumno')

router.get('/', async (req, res) => {
  const notas = await Nota.find().populate('estudiante')
  const formateadas = notas.map(n => ({
    _id: n._id,
    estudianteNombre: n.estudiante.nombre,
    materia: n.materia,
    calificacion: n.calificacion
  }))
  res.json(formateadas)
})

router.post('/', async (req, res) => {
  const nueva = new Nota(req.body)
  await nueva.save()
  res.json(nueva)
})

module.exports = router

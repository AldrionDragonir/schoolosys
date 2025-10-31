const express = require('express')
const router = express.Router()
const Nota = require('../models/Nota')
const Asistencia = require('../models/Asistencia')
const Alumno = require('../models/Alumno')

router.get('/:id', async (req, res) => {
  const alumno = await Alumno.findById(req.params.id)
  const notas = await Nota.find({ estudiante: alumno._id })
  const asistencias = await Asistencia.find({ estudiante: alumno._id })

  const promedio = notas.length
    ? notas.reduce((acc, n) => acc + n.calificacion, 0) / notas.length
    : 0

  res.json({
    nombre: `${alumno.nombre} ${alumno.apellido}`,
    promedioNotas: promedio.toFixed(2),
    asistencias: asistencias.length
  })
})

module.exports = router

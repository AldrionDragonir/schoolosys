const mongoose = require('mongoose')

const NotaSchema = new mongoose.Schema({
  estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' },
  materia: String,
  calificacion: Number
})

module.exports = mongoose.model('Nota', NotaSchema)

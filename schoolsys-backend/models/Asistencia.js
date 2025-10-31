const mongoose = require('mongoose')

const AsistenciaSchema = new mongoose.Schema({
  estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' },
  estado: String,
  fecha: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Asistencia', AsistenciaSchema)

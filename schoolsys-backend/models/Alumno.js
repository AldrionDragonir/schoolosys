const mongoose = require('mongoose')

const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String
})

module.exports = mongoose.model('Alumno', AlumnoSchema)

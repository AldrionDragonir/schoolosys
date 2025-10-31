const express = require('express')
const router = express.Router()
const Alumno = require('../models/Alumno')

router.get('/', async (req, res) => {
  const alumnos = await Alumno.find()
  res.json(alumnos)
})

router.post('/', async (req, res) => {
  const nuevo = new Alumno(req.body)
  await nuevo.save()
  res.json(nuevo)
})

module.exports = router

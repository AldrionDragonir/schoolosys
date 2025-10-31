<template>
  <div>
    <h2>Gestión de Alumnos</h2>
    <form @submit.prevent="registrarAlumno">
      <input v-model="nuevoAlumno.nombre" placeholder="Nombre" required />
      <input v-model="nuevoAlumno.apellido" placeholder="Apellido" required />
      <button type="submit">Registrar</button>
    </form>

    <ul>
      <li v-for="a in alumnos" :key="a._id">{{ a.nombre }} {{ a.apellido }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'http://localhost:4000'
const alumnos = ref([])
const nuevoAlumno = ref({ nombre: '', apellido: '' })

async function cargarAlumnos() {
  const res = await axios.get(`${API}/api/alumnos`)
  alumnos.value = res.data
}

async function registrarAlumno() {
  await axios.post(`${API}/api/alumnos`, nuevoAlumno.value)
  nuevoAlumno.value = { nombre: '', apellido: '' }
  cargarAlumnos()
}

onMounted(cargarAlumnos)
</script>

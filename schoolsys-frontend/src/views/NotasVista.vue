<template>
  <div>
    <h2>Registro de Notas</h2>
    <form @submit.prevent="registrarNota">
      <select v-model="nota.estudiante" required>
        <option disabled value="">Seleccione alumno</option>
        <option v-for="a in alumnos" :value="a._id" :key="a._id">{{ a.nombre }}</option>
      </select>
      <input v-model="nota.materia" placeholder="Materia" required />
      <input type="number" v-model="nota.calificacion" placeholder="Nota" required />
      <button type="submit">Registrar</button>
    </form>

    <ul>
      <li v-for="n in notas" :key="n._id">{{ n.estudianteNombre }} - {{ n.materia }}: {{ n.calificacion }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'http://localhost:4000'
const alumnos = ref([])
const notas = ref([])
const nota = ref({ estudiante: '', materia: '', calificacion: 0 })

async function cargarDatos() {
  const resA = await axios.get(`${API}/api/alumnos`)
  alumnos.value = resA.data
  const resN = await axios.get(`${API}/api/notas`)
  notas.value = resN.data
}

async function registrarNota() {
  await axios.post(`${API}/api/notas`, nota.value)
  nota.value = { estudiante: '', materia: '', calificacion: 0 }
  cargarDatos()
}

onMounted(cargarDatos)
</script>

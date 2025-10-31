<template>
  <div>
    <h2>Registro de Asistencia</h2>
    <form @submit.prevent="registrar">
      <select v-model="registro.estudiante" required>
        <option disabled value="">Seleccione alumno</option>
        <option v-for="a in estudiantes" :value="a._id" :key="a._id">{{ a.nombre }} {{ a.apellido }}</option>
      </select>
      <select v-model="registro.estado" required>
        <option value="presente">Presente</option>
        <option value="ausente">Ausente</option>
        <option value="tarde">Tarde</option>
      </select>
      <button type="submit">Registrar</button>
    </form>

    <h3>Asistencias recientes</h3>
    <table>
      <thead><tr><th>Alumno</th><th>Estado</th><th>Fecha</th></tr></thead>
      <tbody>
        <tr v-for="a in asistencias" :key="a._id">
          <td>{{ a.alumnoNombre }}</td>
          <td>{{ a.estado }}</td>
          <td>{{ new Date(a.fecha).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'

const API = 'http://localhost:4000'
const socket = io(API)

const estudiantes = ref([])
const asistencias = ref([])
const registro = ref({ estudiante: '', estado: 'presente' })

async function cargar() {
  const resA = await axios.get(`${API}/api/estudiantes`)
  estudiantes.value = resA.data
  const resAs = await axios.get(`${API}/api/asistencias`)
  asistencias.value = resAs.data
}

async function registrar() {
  const payload = { ...registro.value, fecha: new Date() }
  await axios.post(`${API}/api/asistencias`, payload)
  cargar()
}

onMounted(() => {
  cargar()
  socket.on('asistencia:nueva', cargar)
})
</script>

<template>
  <div>
    <h2>Reportes para Padres</h2>
    <select v-model="seleccionado" @change="cargarReporte">
      <option disabled value="">Seleccione alumno</option>
      <option v-for="a in alumnos" :value="a._id" :key="a._id">{{ a.nombre }}</option>
    </select>

    <div v-if="reporte">
      <h3>Resumen de {{ reporte.nombre }}</h3>
      <p>Notas promedio: {{ reporte.promedioNotas }}</p>
      <p>Asistencias: {{ reporte.asistencias }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'http://localhost:4000'
const alumnos = ref([])
const seleccionado = ref('')
const reporte = ref(null)

async function cargarAlumnos() {
  const res = await axios.get(`${API}/api/alumnos`)
  alumnos.value = res.data
}

async function cargarReporte() {
  const res = await axios.get(`${API}/api/reportes/${seleccionado.value}`)
  reporte.value = res.data
}

onMounted(cargarAlumnos)
</script>

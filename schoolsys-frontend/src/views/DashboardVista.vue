<template>
  <div>
    <h2>Panel en tiempo real</h2>
    <canvas id="graficoAsistencia"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import Chart from 'chart.js/auto'

const API = 'http://localhost:4000'
const socket = io(API)
let grafico

async function cargarDatos() {
  const res = await axios.get(`${API}/api/asistencias/resumen`)
  const datos = res.data || { presente: 0, ausente: 0, tarde: 0 }
  const ctx = document.getElementById('graficoAsistencia').getContext('2d')
  if (grafico) grafico.destroy()
  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Presentes', 'Ausentes', 'Tarde'],
      datasets: [{
        label: 'Asistencias',
        data: [datos.presente, datos.ausente, datos.tarde],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
      }]
    }
  })
}

onMounted(() => {
  cargarDatos()
  socket.on('asistencia:nueva', cargarDatos)
})
</script>

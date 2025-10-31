import { createRouter, createWebHistory } from 'vue-router'
import AlumnosVista from '../views/AlumnosVista.vue'
import NotasVista from '../views/NotasVista.vue'
import AsistenciaVista from '../views/AsistenciaVista.vue'
import ReportesVista from '../views/ReportesVista.vue'
import DashboardVista from '../views/DashboardVista.vue'

const routes = [
  { path: '/', component: DashboardVista },
  { path: '/alumnos', component: AlumnosVista },
  { path: '/notas', component: NotasVista },
  { path: '/asistencia', component: AsistenciaVista },
  { path: '/reportes', component: ReportesVista }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

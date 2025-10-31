<template>
  <div id="app">
    <header>
      <h1>SchoolSys – Gestión Escolar</h1>
      <nav>
        <router-link to="/">Dashboard</router-link> |
        <router-link to="/alumnos">Alumnos</router-link> |
        <router-link to="/notas">Notas</router-link> |
        <router-link to="/asistencia">Asistencia</router-link> |
        <router-link to="/reportes">Reportes</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
// No se requiere lógica aquí, solo estructura
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
header {
  background: #2b3a4b;
  color: white;
  padding: 1rem;
}
nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
main {
  padding: 1rem;
}
</style>

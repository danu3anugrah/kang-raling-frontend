<template>
  <div id="app">
    
    <!-- Konten halaman yang berubah-ubah -->
    <router-view/>

  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: transparent;
}
</style>

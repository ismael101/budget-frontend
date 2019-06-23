<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <transition
       name="fade"
        mode="out-in"
      >
      <router-view></router-view>
      </transition>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>

import Footer from './components/Footer'
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Footer,
    Navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>


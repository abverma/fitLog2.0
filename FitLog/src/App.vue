<template>
  <div>
    <app-header v-bind:userName="userName"></app-header>
    <nav-bar v-bind:input="{appName: appName}"></nav-bar>
    <app-main></app-main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import LeftNavBar from './components/LeftNavBar.vue'
import Main from './components/Main.vue'

export default {
  components: {
    'app-header': Header,
    'nav-bar': LeftNavBar,
    'app-main': Main
  },
  data () {
    return {
      userName: 'Abhishek Verma',
      appName: 'FitLog'
    }
  }
}
</script>


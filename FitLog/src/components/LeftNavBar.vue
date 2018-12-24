<template>
  <div id="nav" class="nav">
    <div class="logo">
      <span id="logo">
        <i class="fas fa-running"></i>
        <span class="text">{{input.appName}}</span>
      </span>
      <i id="closeBtn" onclick="closeNav()" class="fas fa-chevron-left closeBtn"></i>
    </div>
    <nav-list></nav-list>
  </div>
</template>

<script>
import NavList from './NavList.vue'

export default {
  props: ['input'],
  components: {
    'nav-list': NavList
  },
  data () {
    return {
    }
  }
}
</script>

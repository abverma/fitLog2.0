<template>
  <nav id="toolbar" class="toolbar">
    <i id="openBtn" onclick="openNav()" class="fas fa-chevron-right openBtn"></i>
    <span class="tools">
      <span class="text">{{ userName }}</span>
      <i class="fas fa-power-off"></i>
    </span>
  </nav>
</template>

<script>

export default {
  props: ['userName'],
  data () {
    return {
    }
  }
}
</script>

<template>
  <div id="main">
    <div id="main-content">
        <div class="mainContentHeader">
          <button>Add new log</button>
          <h2>Your daily logs</h2>
          <i class="fas fa-plus-circle"></i>
        </div>

        <!-- Grid to be rendered on laptop and bigger devices -->

        <div id="grid">
          <log-grid></log-grid>
        </div>

        <card-details></card-details>
    </div>
  </div>  
</template>

<script>
import LogGrid from './LogGrid.vue'
import Cards from './Cards.vue'


export default {
  components: {
    'log-grid': LogGrid,
    'card-details': Cards
  },
  data () {
    return {
      
    }
  }
}
</script>


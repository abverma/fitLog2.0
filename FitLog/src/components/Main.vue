<template>
  <div id="main">
    <div id="main-content">
        <div class="mainContentHeader">
          <button class="bigAddBtn"><i class="fas fa-plus"></i></button>
          <h2>Your daily logs</h2>
          <i class="fas fa-plus-circle"></i>
        </div>

        <!-- Grid to be rendered on laptop and bigger devices -->
        <span v-if="loading" class="loadingMessage">Loading...</span>
        <div id="grid" v-if="!loading">
          <log-grid v-bind:logs="logs"></log-grid>
        </div>
        <!-- Cards to be rendered on tablets or smaller devices -->
        <card-details v-if="!loading" v-bind:logs="logs"></card-details>

        <div class="pagingToolBar">
          <button v-if="!loading && currentPage > 1" class="spanBtn" v-on:click="loadPreviousPage()">Previous</button>
          <button v-if="!loading && Math.floor(total/currentPage) > pageSize" class="spanBtn" v-on:click="loadNextPage()">Next</button>
        </div>
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
      logs: [],
      currentPage: 1,
      pageSize: 10,
      loading: true,
      total: 0
    }
  },
  created: function() {
    console.log('Card Vue instance created');
    this.fetchLogs();
  },
  methods: {
    loadNextPage: function() {
      this.currentPage += 1;
      this.loading = true;
      this.fetchLogs();
    },
    loadPreviousPage: function() {
      this.currentPage -= 1;
      this.loading = true;
      this.fetchLogs();
    },
    fetchLogs: function() {
      let _this = this;
      axios.get('/logs', {
        params: {
          limit: _this.pageSize,
          start: _this.currentPage == 1 ? 0 : (_this.currentPage -1) * this.pageSize
        }
      })
        .then(function(response){
          if (response.data.data) {
            _this.logs = response.data.data;
            _this.total = response.data.count;
          }
          _this.loading = false;
          _this.loaded = true;
        })
        .catch(function(err){
          console.log(err);
        });
    }
  }
}
</script>


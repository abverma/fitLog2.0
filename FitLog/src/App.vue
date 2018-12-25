<template>
  <div style="height: inherit">
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
      userName: '',
      appName: 'FitLog'
    }
  },
  beforeCreate: function() {
    let _this = this;
    axios.get('/currentUser')
      .then(function(response){
        let result = response.data.data;

        _this.userName = _this.capitalize(result.firstName) + ' ' + _this.capitalize(result.secondName);
      })
      .catch(function(err){
        console.log(err);
      })
  },
  methods: {
    capitalize: function(str) {
      return str.replace(str[0], str[0].toUpperCase());
    }
  }
}
</script>


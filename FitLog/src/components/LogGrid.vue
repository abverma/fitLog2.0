<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns">
          {{ key | capitalize }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in rows">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

let gridColumns = ['date', 'workout', 'sets', 'reps', 'cardio', 'abs', 'cardio', 'stretch', 'comments'];
let logs = [{ 
      'date': '1 Dec 2018',
      'workout': 'Back & Bi',
      'sets': '5',
      'reps': '10',
      'hiit': 'Yes',
      'abs': 'Yes',
      'cardio': 'No',
      'stretch': 'No',
      'comments': 'Waat lag gayeli!!!'
    }, { 
      'date': '1 Dec 2018',
      'workout': 'Back & Bi',
      'sets': '5',
      'reps': '10',
      'hiit': 'Yes',
      'abs': 'Yes',
      'cardio': 'No',
      'stretch': 'No',
      'comments': 'Waat lag gayeli!!!'
    }, { 
      'date': '1 Dec 2018',
      'workout': 'Back & Bi',
      'sets': '5',
      'reps': '10',
      'hiit': 'No',
      'abs': 'Yes',
      'cardio': 'Yes',
      'stretch': 'No',
      'comments': 'Waat lag gayeli!!!'
    }]

export default {
  components: {
    
  },
  data () {
    return {
      columns: gridColumns,
      rows: logs
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>


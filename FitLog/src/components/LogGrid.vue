<template>
  <div>
    <div class="gridHeader">
        <span>Your dail logs</span>
        <button>Delete</button>
        <button>Quick Add</button>
    </div>
    <table>
    <thead>
      <tr>
        <th v-for="key in columns" 
            v-bind:style="{width: key.width ? key.width +'vw' : '10vw' }">
          {{ key.name | capitalize }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in logs">
        <td v-for="key in columns" 
            v-html="key.render ? key.render(entry[key.name]) : entry[key.name]"
            v-on:click="selectRow(key, entry)">
            <!-- v-bind:style="{'border-right': key.action ? '1px solid #999' : 'none'}"> -->
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>

let gridColumns = [{
  width: '1',
  action: true,
  type: 'checkbox',
  render: function() {
    console.log(this.type);
    return `<input type='${this.type}'></input>`;
  }
},{
  width: '14',
  name: 'date',
  type: 'date',
  render: function(value) {
    return new Date(value).toDateString();
  }
}, {
  width: '14',
  name: 'workout'
}, {
  width: '3',
  name: 'sets'
}, {
  width: '3',
  name: 'reps'
}, {
  width: '5',
  name: 'cardio',
  type: 'boolean',
  render: function(value) {
    return value ? 'Yes' : 'No'
  }
}, {
  name: 'abs',
  type: 'boolean',
  render: function(value) {
    return value ? 'Yes' : 'No'
  }
}, {
  name: 'hiit',
  type: 'boolean',
  render: function(value) {
    return value ? 'Yes' : 'No'
  }
}, {
  width: '14',
  name: 'comments'
}];

export default {
  props: ['logs'],
  data () {
    return {
      columns: gridColumns
    }
  },
  filters: {
    capitalize: function (str) {
      if (str && str.length) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      } else {
        return '';
      }
    }
  },
  methods: {
    renderColumn: function(column, value) {
      if (!column.action) {
        return column.render ? column.render(value) : value;
      } else {
        return '';
      }
    },
    selectRow: function(column, log) {
      if (column.action && column.type == 'checkbox') {
        log.selected = !log.selected;
        console.log('Row selected: ', log._id);
      }
    }
  }
}
</script>


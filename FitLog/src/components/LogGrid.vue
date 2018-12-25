<template>
  <div>
    <div class="gridHeader">
        <span>Your dail logs</span>
        <button v-on:click="deleteRows()" v-bind:disabled="!rowsSelected">Delete</button>
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
            v-on:custom="selectRow(key, entry)">
            <!-- v-bind:style="{'border-right': key.action ? '1px solid #999' : 'none'}"> -->
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>

let BigClick = function() {
  console.log('clicked');
}

let gridColumns = [{
  width: '1',
  action: true,
  type: 'checkbox',
  BigClick: function() {
    console.log('clicked');
  },
  render: function() {
    return `<input type='${this.type}' 
                    onclick="this.parentNode.dispatchEvent(new Event('custom'));"></input>`;
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
      columns: gridColumns,
      rowsSelected: false,
      selection: null
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

      let selected = this.logs.filter(function(log){
        return log.selected;
      })

      if (selected && selected.length) {
        this.rowsSelected = true;
        this.selection = selected;
      } else {
        this.rowsSelected = false;
        this.selection = null;
      }
    },
    deleteRows: function() {
      if (this.selection && this.selection.length) {
        if (confirm('Are you suar?')) {
          console.log('You pressed OK!');
          this.$emit('deleteLog', this.selection);
          let checkboxes = document.getElementsByTagName('input');
          Object.keys(checkboxes)
            .forEach(function(key) {
              if (checkboxes[key].type == 'checkbox') {
                checkboxes[key].checked = false;
              }
            });
        } else {
          console.log('You pressed Cancel!');
        } 
      }
    }
  }
}
</script>


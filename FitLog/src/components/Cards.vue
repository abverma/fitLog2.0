<template>
<div id="cards" class="cards">
	<div v-for="(log,index) in logs" class="card">
        	<div class="cardHeader">
              <h3>{{ log.date }}</h3>
              <i class="fas fa-trash"></i>
              <i class="fas fa-pen"></i>
            </div>
            <div id="cardDetails" class="cardDetails">
              <p> {{ prepareDetail(log) }}</p>
            </div>
	</div>
</div>
</template>

<script>
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
    }];	
export default {
	data () {
		return {
			logs: logs
		}
	},
	methods: {
		prepareDetail: function(log) {
            let returnString = '';
            if (log.workout) {
              returnString += log.workout;
            }

            if (log.sets) {
              returnString += ', ' + log.sets + ' Sets'; 
            }

            if (log.reps) {
              returnString += ', ' + log.reps + ' Reps'; 
            }

            if (log.cardio) {
              returnString += ', Cardio'; 
            }

            if (returnString.length > 35) {
              returnString = returnString.substr(0, 32) + '..';
            }

            return returnString;
        }
	}
}
</script>
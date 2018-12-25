<template>
<div id="cards" class="cards">
	<div v-for="(log,index) in logs" class="card">
        	<div class="cardHeader">
              <h3>{{ new Date(log.date).toDateString() }}</h3>
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
	
export default {
  props: ['logs'],
	data () {
		return {
			
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

            if (returnString.length > 40) {
              returnString = returnString.substr(0, 37) + '..';
            }

            return returnString;
        }
	}
}
</script>
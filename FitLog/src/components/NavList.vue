<template>
	<div id="idNavList">
        <ul>
            <li v-for="item in navList">
              	<i v-bind:class="[ item.icon ]"></i> 
                <span class="text">{{ item.text }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {	
	data: function() {
	    return {
	      navList: [
	        { id: 0, text: 'Home', icon: 'fas fa-home'},
	        { id: 1, text: 'Users', icon: 'fas fa-users'},
	        { id: 2, text: 'Settings', icon: 'fas fa-cog'}
	      ]
	    }
	}
}
</script>
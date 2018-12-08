let DB = require('./mongoDb').DB;
let {mongoDBUri} = require('./config');

function count (uri, collection) {

	let database = new DB;

	database.connect(uri)
		.then(function(){
			return database.countDocuments(collection);
		})
		.then(function(count){
            console.log(count + " documents");
			database.close();
		})
		.catch(function(err){
			console.log('Error getting count of collection: ', err.message);
			if (database) {
				database.close();
			}
		})
}

function find (uri, collection, query) {

	let database = new DB;

	database.connect(uri)
		.then(function(){
			return database.find(collection, query);
		})
		.then(function(result){
            console.log(JSON.stringify(result, null, 2));
			database.close();
		})
		.catch(function(err){
			console.log('Error getting count of collection: ', err.message);
			if (database) {
				database.close();
			}
		})
}

//count(uri, 'logs');

find(mongoDBUri, 'logs', {
	"workout": "Back & Bi"
});

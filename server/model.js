var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/fitlog";

var dbConnection;
var database;


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
			  if (err) {
			  	reject(err);
			  } else {
			  	dbConnection = db;
				database = db.db('fitlog');
			  }
			});

exports.getDbConnectionAsync = function() {
	return new Promise(function(resolve, reject){

		if (dbConnection) {
			resolve(dbConnection);
		}
		else {
			MongoClient.connect(url, function(err, db) {
			  if (err) {
			  	reject(err);
			  } else {
			  	dbConnection = db;
				database = db.db('fitlog');
				//console.log(database);
			  	resolve(database);
			  }
			});
		}
	})
}

exports.closeDbConnection = function(db) {
	if (!db) {
		dbConnection.close();
	} else {
		db.close();
	}
}

exports.getDbConnection = function() {
	if (database) {
		return database;
	} else {
		consol.log('Db not ready.');
		return null;
	}

}

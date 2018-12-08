let MongoClient = require('mongodb').MongoClient;
let config = require('./config');

const DBNAME = config.mongoDBName;

function DB() {
    this.db = null;
    this.connection = null;
}

DB.prototype.connect = function(uri) {

    let _this = this;

    return new Promise(function(resolve, reject) {
        if (_this.db) {
            //Already connected
            resolve();
        } else {
            let __this = _this;

            MongoClient.connect(uri, { useNewUrlParser: true })
                .then(function(database) {
                    __this.db = database.db(DBNAME);
                    __this.connection = database;
                    resolve();
                })
                .catch(function(err) {
                    console.log('Error connecting: ' + err.message);
                    reject(err.message);
                })
        }
    });

}

DB.prototype.find = function(collection, query, limit, start, sort) {

	let _this = this;

	if (query === undefined) {
    	query = {};
    }

    return new Promise(function(resolve, reject) {
        let cursor = _this.db.collection(collection).find(query);

        if (start !== undefined && start !== null) {
        	cursor = cursor.skip(start);
        }

        if (limit !== undefined &&  limit!== null) {
        	cursor = cursor.limit(limit);
        }

        if (sort !== undefined && sort!== null) {
        	curstor = cursor.sort(sort);
        }

        cursor.toArray()
            .then(function(data) {
            	console.log(`${data.length} documents read from ${collection} collection.`);
                resolve(data);
            })
            .catch(function(err){
            	console.log(err);
            	console.log('Error reading collection.');
                reject(err);
            });
    });
}

DB.prototype.insertMany = function(collection, documents) {

        let _this = this;

        return new Promise(function(resolve, reject) {
            if (!Array.isArray(documents)) {
                documents = [documents];
            }

            _this.db.collection(collection).insertMany(documents)
                .then(function(data) {
                    console.log(`${data.insertedCount} document(s) inserted in ${collection} collection.`);
                    resolve(data.insertedCount);
                })
                .catch(function(err) {
                	console.log(err);
                	console.log('Error inserting in collection.');
                    reject(err);
                })
        });
}

DB.prototype.delete = function(collection, query) {

        let _this = this;

        return new Promise(function(resolve, reject) {

            if (Object.keys(query).length = 0) {
                reject('Delete all is not allowed.');
            } else {
                _this.db.collection(collection).deleteMany(query)
                    .then(function(result) {
                        console.log(`${result.deletedCount} documents(s) deleted from ${collection} collection.`);
                        resolve(result.deletedCount);
                    })
                    .catch(function(err) {
	                	console.log('Error deleting documents.');
                        reject(err);
                    })
            }
        });
}


DB.prototype.update = function(collection, query, payload) {

    let _this = this;

    return new Promise(function(resolve, reject) {
        _this.db.collection(collection).updateMany(query, payload)
            .then(function(data) {
                console.log(`${data.result.nModified} record(s) updated.`);
                resolve(data.result.nModified);
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error updating documents.');
                reject(err);
            })
    });
}

DB.prototype.countDocuments = function(collection, query) {

    let _this = this;

    if (query === undefined) {
    	query = {};
    }

    return new Promise(function(resolve, reject) {
    	_this.db.collection(collection).countDocuments(query)
            .then(function(count){
                resolve(count);
            })
            .catch(function(err){
            	console.log('Count documents failed: ', err.message);
                reject(err);
            });
    })
}

DB.prototype.close = function() {

	if (this.connection) {
		this.connection.close()
			.then(function(){
			})
			.catch(function(err){
				console.log("Failed to close the database: " + err.message);
			})

	}
}

exports.DB = DB;
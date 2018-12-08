let DB = require('../mongoDb').DB;
let { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'logs';


function Log(properties) {
    this.properties = properties;
    this.collection = COLLECTION_NAME;
}

Log.prototype.find = function(options) {
    let _this = this;
    let database = new DB;

    return new Promise(function(resolve, reject) {
        database.connect()
            .then(function() {
                return database.find(_this.collection, options);
            })
            .then(function(data) {
                database.close();
                resolve(data);
            })
            .catch(function(err) {
                console.log(err);
                if (database) {
                    database.close();
                }
                reject(err);
            });
    });
}

Log.prototype.count = function(options) {
    let _this = this;
    let database = new DB;

    return new Promise(function(resolve, reject) {
        database.connect()
            .then(function() {
                return database.countDocuments(_this.collection, options);
            })
            .then(function(data) {
                database.close();
                resolve(data);
            })
            .catch(function(err) {
                console.log(err);
                if (database) {
                    database.close();
                }
                reject(err);
            });
    });
}

Log.prototype.create = function(payload) {

    let _this = this;
    let database = new DB;

    return new Promise(function(resolve, reject) {
        database.connect()
            .then(function() {
                return database.insertMany(_this.collection, payload)
            })
            .then(function(data) {
                database.close();

                resolve(data);
            })
            .catch(function(err) {
                if (database) {
                    database.close();
                }
                console.log(err);
                reject(err);
            });
    });

}

Log.prototype.update = function(query, setObj) {

    let _this = this;
    let database = new DB;

    return new Promise(function(resolve, reject) {
        database.connect()
            .then(function() {
                return database.update(_this.collection, query, setObj);
            })
            .then(function(data) {
                database.close();

                resolve(data);
            })
            .catch(function(err) {
                if (database) {
                    database.close();
                }
                reject(err);
            });
    })
}


Log.prototype.remove = function(query) {

    let _this = this;
    let database = new DB;

    return new Promise(function(resolve, reject) {
        database.connect()
            .then(function() {
                return database.delete(_this.collection, query);
            })
            .then(function(data) {
                database.close();
                resolve(data);
            })
            .catch(function(err) {
                if (database) {
                    database.close();
                }
                console.log(err);
                reject(err);
            });
    });
}

exports.Log = Log;
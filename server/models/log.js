let DB = require('../mongoDb').DB;

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
};

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
};

Log.prototype.create = function(payload) {

    let _this = this;
    let database = new DB;

    return new Promise(function(resolve, reject) {
        if (!payload && !payload.length) {

            reject('Empty payload for create not allowed.');

        } else {

            database.connect()
                .then(function() {
                    return database.insertMany(_this.collection, payload);
                })
                .then(function(data) {
                    let insertedIds = data.insertedIds;
                    let tempArray = [];

                    if (insertedIds && Object.keys(insertedIds).length) {
                        Object.keys(insertedIds).forEach(function(key) {
                            tempArray.push(insertedIds[key]);
                        });

                        return database.find(_this.collection, {
                            query: {
                                _id: {
                                    $in: tempArray
                                }
                            }
                        });
                    } else {
                        resolve();
                    }

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
        }

    });

};

Log.prototype.update = function(query, setObj) {

    let _this = this;
    let database = new DB;

    return new Promise(function(resolve, reject) {
        database.connect()
            .then(function() {
                return database.update(_this.collection, query, setObj);
            })
            .then(function() {
                return database.find(_this.collection, {
                    query: query
                });
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
    });
};


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
};

exports.Log = Log;
let model = require('../model');
const {
    ObjectId
} = require('mongodb');
let qs = require('qs');
let mongoDb;

const COLLECTION_NAME = 'logs';

exports.createLogs = function(req, res) {
    let db = model.getDbConnection();
    if (db) {
        let payload = req.body;
        create(payload, COLLECTION_NAME, db)
            .then(function(data) {
                res.send({
                    success: true,
                    data: data.length,
                    message: 'Records inserted'
                });
            })
            .catch(function(err) {
                handleErrorResponse(err, res);
            })
    } else {
        console.log('Db not ready yet.');
        res.send('Db not ready yet.');
    }
}

exports.getAllLogs = function(req, res) {
    let limit = req.query['limit'];
    let start = req.query['start'];

    if (limit) {
        limit = parseInt(limit);
    }

    if (start) {
        start = parseInt(start);
    }

    let db = model.getDbConnection();
    if (db) {
        let readQuery = read(COLLECTION_NAME, {}, db, limit, start);
        let countQuery = count(COLLECTION_NAME, {}, db);

        Promise.all([readQuery, countQuery])
            .then(function(result) {
                res.send({
                    success: true,
                    data: result[0],
                    count: result[1],
                    message: 'Records fetched'
                });
            })
            .catch(function(err) {
                handleErrorResponse(err, res);
            })
    } else {
        console.log('Db not ready yet.');
        res.send('Db not ready yet.');
    }
}

exports.deleteLogs = function(req, res) {
    let db = model.getDbConnection();
    if (db) {
        let payload = req.body;
        let query = {
            _id: ObjectId(payload._id)
        }

        remove(query, COLLECTION_NAME, db)
            .then(function(data) {
                res.send({
                    success: true,
                    data: data.length,
                    message: 'Records deleted'
                });
            })
            .catch(function(err) {
                handleErrorResponse(err, res);
            })
    } else {
        console.log('Db not ready yet.');
        res.send('Db not ready yet.');
    }
}

exports.updateLog = function(req, res) {
    let db = model.getDbConnection();
    if (db) {
        let payload = req.body;
        console.log(payload);
        //let param = JSON.parse(payload.param);
        let set = Object.assign({}, payload);

        delete set._id;

        let query = {
            '_id': ObjectId(payload._id)
        }
        let setObj = {
            $set: set
        }
        update(query, setObj, COLLECTION_NAME, db)
            .then(function(data) {
                res.send({
                    success: true,
                    data: data,
                    message: 'Records updated'
                });
            })
            .catch(function(err) {
                handleErrorResponse(err, res);
            });
    } else {
        console.log('Db not ready yet.');
        res.send('Db not ready yet.');
    }
}


let read = function(collection, query, db, limit, start) {
    return new Promise(function(resolve, reject) {
        db.collection(collection).find(query).skip(start).limit(limit).sort({date: -1}).toArray()
            .then(function(data) {
                resolve(data);
            })
            .catch(function(err){
                reject(err);
            });
    });
}

let count = function(collection, query, db) {
    return new Promise(function(resolve, reject) {
        db.collection(collection).countDocuments(query)
            .then(function(count){
                resolve(count);
            })
            .catch(function(err){
                reject(err);
            });
    });
}

let create = function(records, collection, db) {
    return new Promise(function(resolve, reject) {
        if (db) {
            if (!Array.isArray(records)) {
                records = [records];
            }

            db.collection(collection).insertMany(records)
                .then(function(data){
                    let msg = data.insertedCount + ' record(s) inserted.'
                    console.log(msg);
                    resolve({
                        success: true,
                        message: msg
                    });
                })
                .catch(function(err){
                    reject(err);
                })
        } else {
            resolve();
        }
    })
}

let remove = function(query, collection, db) {
    return new Promise(function(resolve, reject) {
        if (db) {
            console.log('delete query');
            console.log(query);
            db.collection(collection).deleteMany(query)
                .then(function(result){
                    let msg = result.deletedCount + ' record(s) deleted.'
                    console.log(msg);
                    resolve({
                        success: true,
                        message: msg
                    });
                })
                .catch(function(err){
                    reject(err);
                })
        } else {
            resolve();
        }
    })
}

let update = function(query, payload, collection, db) {
    return new Promise(function(resolve, reject) {
        if (db) {
            console.log('update query');
            console.log(query);
            db.collection(collection).updateMany(query, payload, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    let msg = data.result.nModified + ' record(s) updated.'
                    console.log(msg);
                    resolve({
                        success: true,
                        message: msg
                    });
                }
            });
        } else {
            resolve();
        }
    })
}

let handleErrorResponse = function(err, res) {
    console.log(err);
    console.log('Error finding logs');
    res.send({
        success: false,
        error: err.toString(),
    });
}

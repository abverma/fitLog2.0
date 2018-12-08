const {ObjectId} = require('mongodb');
let qs = require('qs');
let DB = require('../mongoDb').DB;
let {mongoDBUri} = require('../config');

const COLLECTION_NAME = 'logs';


exports.getAllLogs = function(req, res) {

    let {limit} = req.query;
    let {start} = req.query;

    if (limit) {
        limit = parseInt(limit);
    }

    if (start) {
        start = parseInt(start);
    }

    let sort = {
        date: -1
    }

    let database = new DB;

    database.connect(mongoDBUri)
        .then(function() {
            let readQuery = database.find(COLLECTION_NAME, {}, limit, start, sort);
            let countQuery = database.countDocuments(COLLECTION_NAME);

            return Promise.all([readQuery, countQuery]);
        })
        .then(function(result) {
            database.close();

            res.send({
                success: true,
                data: result[0],
                count: result[1],
                message: 'Records fetched'
            });
        })
        .catch(function(err) {
            if (database) {
                database.close();
            }
            handleErrorResponse(err, res);
        });
}

exports.createLogs = function(req, res) {

    let database = new DB;
    let payload = req.body;

    database.connect(mongoDBUri)
        .then(function() {
            return database.insertMany(COLLECTION_NAME, payload)
        })
        .then(function(data) {
            database.close();

            res.send({
                success: true,
                data: data,
                message: 'Records inserted'
            });
        })
        .catch(function(err) {
            if (database) {
                database.close();
            }
            console.log(err);
            handleErrorResponse(err, res);
        });
}



exports.deleteLogs = function(req, res) {

    let database = new DB;
    let payload = req.body;
    let query = {
        _id: ObjectId(payload._id)
    }

    database.connect(mongoDBUri)
        .then(function() {
           return database.delete(COLLECTION_NAME, query);
        })
        .then(function(data) {
            database.close();

            res.send({
                success: true,
                data: data,
                message: 'Records deleted'
            });
        })
        .catch(function(err) {
            console.log(err);
            handleErrorResponse(err, res);
        });   
}

exports.updateLog = function(req, res) {
    let database = new DB;
    let payload = req.body;
    let set = Object.assign({}, payload);

    delete set._id;

    let query = {
        '_id': ObjectId(payload._id)
    }
    let setObj = {
        $set: set
    }

    database.connect(mongoDBUri)
        .then(function() {
            return database.update(COLLECTION_NAME, query, setObj);
        })
        .then(function(data) {
            database.close();

            res.send({
                success: true,
                data: data,
                message: 'Records updated'
            });
        })
        .catch(function(err) {
            console.log(err);
            handleErrorResponse(err, res);
        });
}

let handleErrorResponse = function(err, res) {
    res.send({
        success: false,
        error: err.message
    });
}
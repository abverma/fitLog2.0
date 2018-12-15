let { ObjectId } = require('mongodb');
let Log = require('../models/log').Log;
let log = new Log();

exports.getLogs = function(req, res) {
    let { limit } = req.query;
    let { start } = req.query;

    if (limit) {
        limit = parseInt(limit);
    }

    if (start) {
        start = parseInt(start);
    }

    let sort = {
        date: -1
    };

    let options = {
        query: {
            user_id: req.user._id
        },
        limit: limit,
        start: start,
        sort: sort
    };

    let readQuery = log.find(options);
    let countQuery = log.count();

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
        });
};

exports.createLogs = function(req, res) {
    let payload = req.body;
    payload.user_id = req.user._id;

    log
        .create(payload)
        .then(function(data) {
            res.send({
                success: true,
                data: data,
                message: 'Records created'
            });
        })
        .catch(function(err) {
            handleErrorResponse(err, res);
        });
};

exports.deleteLogs = function(req, res) {
    let { id } = req.params;
    let query = {
        _id: ObjectId(id)
    };

    log
        .remove(query)
        .then(function(data) {
            res.send({
                success: true,
                data: data,
                message: 'Records deleted'
            });
        })
        .catch(function(err) {
            handleErrorResponse(err, res);
        });
};

exports.updateLog = function(req, res) {
    let { id } = req.params;
    let payload = req.body;
    let set = Object.assign({}, payload);

    delete set._id;

    let query = {
        _id: ObjectId(id)
    };
    let setObj = {
        $set: set
    };

    log
        .update(query, setObj)
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
};

let handleErrorResponse = function(err, res) {
    console.log(err);

    res.send({
        success: false,
        error: err.message
    });
};

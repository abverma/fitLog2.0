let model = require('../model');
const {ObjectId} = require('mongodb'); 
let qs = require('qs');
let mongoDb;

exports.createLogs = function(req, res) {
	let db = model.getDbConnection();
	if (db) {
		let payload = req.body;
		create(payload, 'log', db)
			.then(function(data){
				res.send({
					success: true,
					data: data.length,
					message: 'Records inserted'
				});
			})
			.catch(function(err){
				handleErrorResponse(err, res);
			})
	} else {
		console.log('Db not ready yet.');
		res.send('Db not ready yet.');
	}
}

exports.getAllLogs = function(req, res) {
	let db = model.getDbConnection();
	if (db) {
		read('log', {}, db)
			.then(function(data){
				res.send({
					success: true,
					data: data,
					count: data.length,
					message: 'Records fetched'
				});
			})
			.catch(function(err){
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
		let id = JSON.parse(payload.id);
		let query = {
			_id: ObjectId(id)
		}

		remove(query, 'log', db)
			.then(function(data){
				res.send({
					success: true,
					data: data.length,
					message: 'Records deleted'
				});
			})
			.catch(function(err){
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
		let param = JSON.parse(payload.param);
		let set = Object.assign({}, param);

		delete set.id;

		let query = {
			_id: ObjectId(param.id)
		}
		let setObj = {
			$set: set
		}
		update(query, setObj, 'log', db)
			.then(function(data){
				res.send({
					success: true,
					data: data,
					message: 'Records updated'
				});
			})
			.catch(function(err){
				handleErrorResponse(err, res);
			});
	} else {
		console.log('Db not ready yet.');
		res.send('Db not ready yet.');
	}
}


let read = function(collection, query, db) {
	return new Promise(function(resolve, reject){
		db.collection(collection).find(query).toArray(function(err, data){
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

let create = function(records, collection, db) {
	return new Promise(function(resolve, reject){
		if (db) {
			if (!Array.isArray(records)){
				records = [records];
			}

			db.collection(collection).insertMany(records, function(err, data){
				if (err) {
					reject(err);
				} else {
					let msg = data.length + ' record(s) inserted.'
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

let remove = function(query, collection, db) {
	return new Promise(function(resolve, reject){
		if (db) {
			console.log('delete query');
			console.log(query);
			db.collection(collection).deleteMany(query, function(err, data){
				if (err) {
					reject(err);
				} else {
					let msg = data.result.n + ' record(s) deleted.'
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

let update = function(query, payload, collection, db) {
	return new Promise(function(resolve, reject){
		if (db) {
			console.log('update query');
			console.log(query);
			db.collection(collection).updateMany(query, payload, function(err, data){
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
const express = require('express');
const app = express();
const port = 3000;

let bodyParser = require('body-parser');


let logs = require('./routes/log');

let myLogger = function(req, res, next) {
	console.log(req.method, req.url);
	next();
}

app.use(myLogger);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/logs', logs.getAllLogs);
app.post('/logs', logs.createLogs);
app.delete('/logs', logs.deleteLogs);
app.put('/logs', logs.updateLog);


app.listen(port, () => console.log(`Listening on port ${port}`));
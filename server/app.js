const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

let logs = require('./routes/log');
let myLogger = function(req, res, next) {
    console.log(req.method, req.url);
    next();
};
let clientDir = path.join(__dirname, '../client/build/production/FitLog/'); //NB

app.use(myLogger);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static(clientDir));

//app.get('/', (req, res) => res.send('Hello World!'));
app.get('/', function(req, res) {
    res.sendfile(path.join(clientDir, 'index.html'));
});

app.get('/logs', logs.getLogs);
app.post('/logs', logs.createLogs);
app.delete('/logs/:id', logs.deleteLogs);
app.put('/logs/:id', logs.updateLog);


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app; //for testing
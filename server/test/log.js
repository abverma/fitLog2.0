let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let Log = require('../models/log').Log;

process.env.NODE_ENV = 'test';

let log = new Log();
chai.should();
chai.use(chaiHttp);
//Our parent block

describe('Logs', () => {
    beforeEach((done) => { //Before each test we empty the database
        log.remove({})
            .then(function() {
                done();
            });
    });
    /*
     * Test the /GET route
     */
    describe('/GET logs', () => {
        it('it should GET all the logs', (done) => {
            chai.request(server)
                .get('/logs')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.success.should.be.eql(true);
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
     * Test the /POST route
     */
    describe('/POST logs', () => {
        it('it should POST a log', (done) => {
            let log = {
                date: new Date(),
                workout: 'Shoulders',
                abs: true,
                sets: 10
            };
            chai.request(server)
                .post('/logs')
                .send(log)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.be.eql(true);
                    res.body.data.length.should.be.eql(1);
                    res.body.data[0].workout.should.be.eql('Shoulders');
                    res.body.data[0].abs.should.be.eql(true);
                    res.body.data[0].sets.should.be.eql(10);
                    done();
                });
        });

    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id log', () => {
        it('it should UPDATE a log given the id', (done) => {

            let payload = {
                date: new Date(),
                workout: 'Shoulders',
                abs: true,
                sets: 10
            };

            log.create(payload)
                .then(function(data) {

                    chai.request(server)
                        .put('/logs/' + data[0]._id)
                        .send({
                            sets: 6,
                            reps: 8
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.success.should.be.eql(true);
                            res.body.data[0].should.have.property('sets').eql(6);
                            res.body.data[0].should.have.property('reps').eql(8);
                            done();
                        });
                })
                .catch(function(err) {
                    console.log(err);
                    done();
                });

        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id log', () => {
        it('it should DELETE a log given the id', (done) => {
            let payload = {
                date: new Date(),
                workout: 'Shoulders',
                abs: true,
                sets: 10
            };

            log.create(payload)
                .then(function(data) {
                    chai.request(server)
                        .delete('/logs/' + data[0]._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.success.should.be.eql(true);
                            res.body.should.have.property('data').eql(1);
                            done();
                        });

                })
                .catch(function(err) {
                    console.log(err);
                    done();
                });
        });
    });
});
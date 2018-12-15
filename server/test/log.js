let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let Log = require('../models/log').Log;

let log = new Log();
let should = chai.should();
chai.use(chaiHttp);
//Our parent block

describe('Logs', () => {
  beforeEach(done => {
    //Before each test we empty the database
    log.remove({}).then(function() {
      done();
    });
  });

  let agent = chai.request(server).keepOpen();
  let cookie;
  /*
   *  Test POST /login
   */
  describe('/POST session', () => {
    it('it should login user and maintain session', done => {
      let user = {
        email: 'ruchika@gmail.com',
        password: '654321'
      };
      agent
        .post('/session')
        .send(user)
        .end((err, res) => {
          cookie = res.headers['set-cookie'][0];
          should.equal(err, null);
          res.should.have.status(200);
          res.should.have.cookie('connect.sid');
          done();
        });
    });
  });
  /*
   * Test the /GET route
   */
  describe('/GET logs', () => {
    it('it should GET all the logs', done => {
      chai
        .request(server)
        .get('/logs')
        .set('Cookie', cookie)
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
    it('it should POST a log', done => {
      let log = {
        date: new Date(),
        workout: 'Shoulders',
        abs: true,
        sets: 10
      };
      chai
        .request(server)
        .post('/logs')
        .set('Cookie', cookie)
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
    it('it should UPDATE a log given the id', done => {
      let payload = {
        date: new Date(),
        workout: 'Shoulders',
        abs: true,
        sets: 10
      };

      log
        .create(payload)
        .then(function(data) {
          chai
            .request(server)
            .put('/logs/' + data[0]._id)
            .set('Cookie', cookie)
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
    it('it should DELETE a log given the id', done => {
      let payload = {
        date: new Date(),
        workout: 'Shoulders',
        abs: true,
        sets: 10
      };

      log
        .create(payload)
        .then(function(data) {
          chai
            .request(server)
            .delete('/logs/' + data[0]._id)
            .set('Cookie', cookie)
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

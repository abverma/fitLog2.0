let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let DB = require('../mongoDb').DB;
let Log = require('../models/log').Log;

const COLLECTION_NAME = 'logs';

let database = new DB();

process.env.NODE_ENV = 'test';

let log = new Log();
chai.use(chaiHttp);
//Our parent block
describe('Logs', () => {
    beforeEach((done) => { //Before each test we empty the database
          log.remove({})
            .then(function(){
              done();
            });    
    });
/*
  * Test the /GET route
  */
  describe('/GET book', () => {
      it('it should GET all the logs', (done) => {
        chai.request(server)
            .get('/logs')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.length.should.be.eql(0);
                  res.body.count.should.be.eql(0);
                  res.body.success.should.be.eql(true);

              done();
            });
      });
  });

});
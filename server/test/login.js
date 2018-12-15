let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Login', () => {

    let agent = chai.request(server).keepOpen();
    let cookie;
    /*
     * Login with incorrect username
     */
    describe('/Login', () => {
        it('it should not login with wrong username', done => {
            let user = {
                email: 'ruch@gmail.com',
                password: '654321'
            };
            agent
                .post('/session')
                .send(user)
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(401);
                    done();
                });
        });
    });
    /*
     * Login with incorrect password
     */
    describe('/Login', () => {
        it('it should not login with wrong password', done => {
            let user = {
                email: 'ruchika@gmail.com',
                password: '654'
            };
            agent
                .post('/session')
                .send(user)
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(401);
                    done();
                });
        });
    });
    /*
     * Login with correct credentials
     */
    describe('/Login', () => {
        it('it should login with correct credentials', done => {
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
     * Logout 
     */
    describe('/Logout', () => {
        it('it should logout', done => {
            agent
                .post('/logout')
                .set('Cookie', cookie)
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(404);
                    should.not.exist(res.headers['connect.sid']);
                    done();
                });
        });
    });
});
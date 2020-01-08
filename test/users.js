//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    /*
     * Test the /GET route
     */
    describe('/GET Users', () => {
        it('it should GET all the Users', done => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    /*
     * Test the /post route
     */
    describe('/Post Users', () => {
        describe('/FirstName empty', () => {
            it('it should return validation error', done => {
                chai.request(server)
                    .post('/api/users', { firstName: '' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.type.should.equal('validationError');
                        done();
                    });
            });
        });
        describe('/FirstName is not empty', () => {
            it('it should add user to db', done => {
                chai.request(server)
                    .post('/api/users')
                    .send({
                        firstName: 'test'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.type.should.equal('success');
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });
});

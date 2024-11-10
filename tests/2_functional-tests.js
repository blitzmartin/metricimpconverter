const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

     test('Convert a valid input such as 10L: GET request to /api/convert', function (done) {
          chai.request(server)
               .get('/api/convert?input=10L')
               .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, 'initNum');
                    assert.equal(res.body.initNum, 10);
                    assert.property(res.body, 'initUnit');
                    assert.equal(res.body.initUnit, 'L');
                    assert.property(res.body, 'returnNum');
                    assert.property(res.body, 'returnUnit');
                    assert.equal(res.body.returnUnit, 'gal');
                    done();
               });
     });

     test('Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
          chai.request(server)
               .get('/api/convert?input=32g')
               .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'invalid unit');
                    done();
               });
     });

     test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
          chai.request(server)
               .get('/api/convert?input=3/7.2/4kg')
               .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'invalid number');
                    done();
               });
     });

     test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
          chai.request(server)
               .get('/api/convert?input=3/7.2/4kilomegagram')
               .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'invalid number and unit');
                    done();
               });
     });

     test('Convert with no number such as kg: GET request to /api/convert', function (done) {
          chai.request(server)
               .get('/api/convert?input=kg')
               .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, 'initNum');
                    assert.equal(res.body.initNum, 1); // Default to 1 if no number is provided
                    assert.property(res.body, 'initUnit');
                    assert.equal(res.body.initUnit, 'kg');
                    assert.property(res.body, 'returnNum');
                    assert.property(res.body, 'returnUnit');
                    assert.equal(res.body.returnUnit, 'lbs');
                    done();
               });
     });

});

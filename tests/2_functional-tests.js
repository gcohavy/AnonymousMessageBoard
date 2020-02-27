/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  var id1;
  
  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Post to a new board', function(done) {
        chai.request(server)
        .post('/api/threads/testcollection')
        .send({
          text: 'Test text',
          delete_password: 'password'
        })
        .end((err, res) => {          
          assert.equal(res.status, 200);
          done();
        })
      })
      
    });
    
    suite('GET', function() {
      test('Get last 10 bumped threads', function(done){
        chai.request(server)
        .get('/api/threads/testcollection')
        .end((err, res) =>{
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        })
      })
    });
    
    suite('DELETE', function() {
      test('Delete thread', function(done){
        chai.request(server)
        .delete('/api/threads/testcollection')
        .send({
          thread_id: 'testid',
          delete_password: 'incorrect password so the test thread can remain'
        })
        .end((err, res) =>{
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Incorrect password');
          done();
        })
      })
      
    });
    
    suite('PUT', function() {
      test('Update thread', function(done){
        chai.request(server)
        .put('/api/threads/testcollection')
        .end((err, res) =>{
          assert.equal(res.status, 200);
          done();
        })
      })
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('Post a new reply', function(done) {
        chai.request(server)
        .post('/api/replies/testcollection')
        .send({
          text: 'Test text',
          delete_password: 'password',
          thread_id: 'testid'
        })
        .end((err, res) => {          
          assert.equal(res.status, 200);
          done();
        })
      })      
    });
    
    suite('GET', function() {
      test('Get a single thread and replies', function(done){
        chai.request(server)
        .get('/api/replies/testcollection')
        .query({thread_id: 'testid'})
        .end((err, res) =>{
          assert.equal(res.status, 200);
          done();
        })
      })
      
    });
    
    suite('PUT', function() {
      test('Update reply', function(done){
        chai.request(server)
        .put('/api/replies/testcollection')
        .end((err, res) =>{
          assert.equal(res.status, 200);
          done();
        })
      })
      
    });
    
    suite('DELETE', function() {
      test('Delete reply', function(done){
        chai.request(server)
        .delete('/api/replies/testcollection')
        .end((err, res) =>{
          assert.equal(res.status, 200);
          done();
        })
      })
      
    });
    
  });

});

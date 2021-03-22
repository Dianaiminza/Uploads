const app = require('./index');
const supertest = require('supertest');
const request = supertest(app);
const expect = require("chai").expect;

  describe("POST /multiple", function() {
    it("it should has status code 200 if the file is uploaded", function(done) {
     supertest(app)
     .post('/multiple')
      .attach("file", "C:\\Users\\Captain\\Desktop\\Image\\testfiles\\health.jpg")
      .attach("file", "C:\\Users\\Captain\\Desktop\\Image\\testfiles\\image.png")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("POST /multiple", function() {
  it("it should has status code 200 if the files exist", function(done) {
   supertest(app)
   .post('/multiple')
      // .attach("file", "C:\\Users\\Captain\\Pictures\\Saved Pictures\\health.jpg")
      // .attach("file", "C:\\Users\\Captain\\Pictures\\Saved Pictures\\coffee.jpg")
      .attach("file", "C:\\Users\\Captain\\Desktop\\Image\\testfiles\\health.jpg")
      .attach("file", "C:\\Users\\Captain\\Desktop\\Image\\testfiles\\image.png")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});
   describe("POST /multiple", function() {
   it("it should has status code 200 if the files are of type  png,jpg,jpeg", function(done) {
    supertest(app)
    .post('/multiple')
    .attach("file", "C:\\Users\\Captain\\Desktop\\Image\\testfiles\\health.jpg")
    .attach("file", "C:\\Users\\Captain\\Desktop\\Image\\testfiles\\image.png")
      // .attach("file", "C:\Users\Captain\Documents\CV.docx")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
}); 

var expect = require("chai").expect;
var request = require("request");

describe("Add Two Numbers", function(){
    var url = "http://localhost:3000/addNumber/2/3";
    it("returns status 200 to check if api works", function(done){
        request(url, function(error, res, body){
            expect(res.statusCode).to.equal(200);
            done()
        });
    });
    
    it("request returns status 200 within the message body", function(done){
        request(url, function(error, res, body){
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done()
        });
    });
});
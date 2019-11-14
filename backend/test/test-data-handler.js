const expect  = require('chai').expect;
const Data = require('./fake-data-access.js')
const dataHandler = require('../data/dataHandler.js')
const { mockRequest, mockResponse } = require('mock-req-res')

const req = mockRequest({ query: { searchTerm: 'agile', location: 'Osterley' }})
const res = mockResponse();

describe('Testing data handler', function () { 
    describe('getCourses', function () { 
        it('should return all courses', function (done) { 
            
            dataHandler.getCourses(Data)(req, (err, result) => {
                
                if (err) {
                  res.status(500)
                  res.json({ message: err.message })
                }
                res.status(result.status)
                res.json(result.responseJson)
            })
            expect(true);     
            done();    
        });
    });
});

describe('Testing listAllCourses', function () { 
    describe('listAllCourses', function () { 
        it('should return a list of all courses with their locations', function (done) { 
            
            dataHandler.listAllCourses(Data)(req, (err, result) => {
                
                if (err) {
                  res.status(500)
                  res.json({ message: err.message })
                }
                res.status(result.status)
                res.json(result.responseJson)
            })
            expect(true);     
            done();    
        });
    });
});




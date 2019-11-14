const expect  = require('chai').expect;
const Data = require('./fake-data-access.js')
const dataHandler = require('../data/dataHandler.js')
const { mockRequest, mockResponse } = require('mock-req-res')
const dataAgileOsterley = require('./fake-data/search-agile-osterley')

//const req = mockRequest({ query: { searchTerm: 'agile', location: 'Osterley' }})
const req = mockRequest();
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
            expect(true);     ////////////
            done();    
        });
    });

    describe('search', function () { 
        it('search term = agile, location = Osterley returns correct data', function (done) { 
            const req = mockRequest({ query: { searchTerm: 'agile', location: 'Osterley' }})
            dataHandler.searchCourses(Data)(req, (err, result) => {
                if (err) {
                  res.status(500)
                  res.json({ message: err.message })
                }
                res.status(result.status)
                res.json(result.responseJson)
                expect(dataAgileOsterley).equal(result.responseJson.courses.responseJson);
            })
            done();   
        });
    });
});




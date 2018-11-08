// var assert = require('assert');
require('./../dependencies');

describe('User model', function() {
    // Within our Array group, Create a group of tests for indexOf
    describe('#find all', function() {

        //xit('should work', function (done) {});
        //describe.skip('features', function() {});
        it('should return some record', function(){
            var modelUser = global.db.User;

            modelUser
                .map()
                .findAll()
                .then((data)=>{
                    console.log('succsessful', data);
                })
                .catch((error)=>{
                    console.log('error', error)
                });
        });
    });
});
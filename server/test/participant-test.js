// var assert = require('assert');
require('./../dependencies');
require('./../database/index');

describe('Participant model', function() {
    // Within our Array group, Create a group of tests for indexOf
    describe('#insert', function() {

        //xit('should work', function (done) {});
        //describe.skip('features', function() {});
        it('should save some record', function(){
            var  modelUser = global.dbModel.User;

            modelUser
                .build({ email: 'bear-wolf1@ukr.net', password: '12345', date_create: global.moment().unix() })
                .save()
                .then((data)=>{
                    console.log('Insert case of succsessful');
                })
                .catch((error)=>{
                    console.log('insert error: '+error)
                });
        });
    });

    describe('#select', function() {
        // xit('skip of case', function (done) {});
        //describe.skip('features', function() {});
        it('should return some record', function(){
            var  modelUser = global.dbModel.User;

            modelUser
                .findAll()
                .then((data)=>{
                    console.log('Select case of succsessful');
                })
                .catch((error)=>{
                    console.log('select error: '+error)
                });
        });
    });

    describe('#update', function() {
        //xit('should work', function (done) {});
        // xit('skip of case', function (done) {});
        //describe.skip('features', function() {});
        it('should return some record', function(){
            var  modelUser = global.dbModel.User;

            modelUser
                .build({ email: 'bear@ukr.net', date_update: global.moment().unix() })
                .update({where: { id: 2 } })
                .then((data)=>{
                    console.log('Update case of succsessful');
                })
                .catch((error)=>{
                    console.log('update error: '+error)
                });
        });
    });
    describe('#remove', function() {
        //xit('should work', function (done) {});
        //describe.skip('features', function() {});
        it('should return some record', function(){
            var  modelUser = global.dbModel.User;

            modelUser
                .destroy({where: { id: 2 } })
                .then((data)=>{
                    console.log('Remove case of succsessful');
                })
                .catch((error)=>{
                    console.log('select error: '+error)
                });
        });
    });
});
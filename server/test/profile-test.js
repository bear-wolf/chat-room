// var assert = require('assert');
require('./../dependencies');
require('./../database/index');

describe('Profile model', function() {
    // Within our Array group, Create a group of tests for indexOf
    describe('#insert', function() {

        //xit('should work', function (done) {});
        //describe.skip('features', function() {});
        it('should save some record', function(){
            var  modelProfile = global.dbModel.Profile;

            modelProfile
                .build({ first_name: 'Andrew', last_name: 'Koval', middle_name: 'Sergiyovich', date_create: global.moment().unix() })
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
            var  modelProfile = global.dbModel.Profile;

            modelProfile
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
            var  modelProfile = global.dbModel.Profile;

            modelProfile
                .build({ first_name: 'Andrew_1', last_name: 'Koval_1', middle_name: 'Sergiyovich_1', date_update: global.moment().unix() })
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
            var modelProfile = global.dbModel.Profile;

            modelProfile
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
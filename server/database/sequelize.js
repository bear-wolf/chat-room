'use strict';

const Sequelize = require('sequelize');
var config =  global.config;

var dbName = config.getDataBaseName();
var dbUser = config.getUser();
var dbPassword = config.getPassword();

global.Sequelize = Sequelize; //static
global.sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

var Config = {
    database: {
        host: "localhost",
        user: "root",
        password: "root",
        database : process.env.DATABASE_NAME || 'chat-room'
    },
    date_format: 'YYYY-MM-DD HH:mm:ss',

    getDataBase: function () {
        return this.database;
    },
    getDataBaseName: function () {
        return this.database.database;
    },
    getUser: function () {
        return this.database.user;
    },
    getPassword: function () {
        return this.database.password;
    },
    getDateFormat: function () {
      return this.date_format;
    }
};

module.exports = Config;
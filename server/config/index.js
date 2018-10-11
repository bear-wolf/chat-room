var Config = {
    database: {
        host: "localhost",
        user: "root",
        password: "root",
        database : process.env.DATABASE_NAME || 'chat-room'
    },

    getDataBase: function () {
        return this.database;
    },
    getDataBaseName: function () {
        return this.database.database;
    }
};

module.exports = Config;
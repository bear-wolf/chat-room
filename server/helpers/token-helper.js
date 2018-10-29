var TOKEN_LENGTH = 32;

var Token = {
    create: function (callback) {
        global.crypto.randomBytes(TOKEN_LENGTH, function(ex, token) {
            if (ex) callback(ex);

            if (token) callback(null, token.toString('hex'));
            else callback(new Error('Problem when generating token'));
        });
    },
    extractTokenFromHeader : function(headers) {
        if (headers == null) throw new Error('Header is null');
        if (headers.authorization == null) throw new Error('Authorization header is null');

        var authorization = headers.authorization;
        var authArr = authorization.split(' ');
        if (authArr.length != 2) throw new Error('Authorization header value is not of length 2');

        // retrieve token
        var token = authArr[1];
        if (token.length != TOKEN_LENGTH * 2) throw new Error('Token length is not the expected one');

        return token;
    }
}

module.exports = Token;

const ws = require('ws');

var WebSocket = {
    wsServer: null,

    run: function(server) {
        if (!global.config.websocket) {
            return this;
        }

        const wss = new ws.Server({
            server: server,
            autoAcceptConnections: false
        });

        wss.on('connection', (ws) => {
            console.log('WebSocket is connection!');

            //Получены данные
            ws.on('message', (event) => {
                console.log('Server: onMessage:', event);
            });

            ws.on('close', () => {
                console.log('Web socket is disconnected');
            });

            setInterval(
                () => {
                    var data = `${new Date()}`;

                    console.log('send data: ', data);
                    ws.send(data)
                },
                1000
            )
        });
    },

    init: function (server) {
        var WebSocketServer = require('websocket').server;

        this.wsServer = new WebSocketServer({
            httpServer: server,
            // You should not use autoAcceptConnections for production
            // applications, as it defeats all standard cross-origin protection
            // facilities built into the protocol and the browser.  You should
            // *always* verify the connection's origin and decide whether or not
            // to accept it.
            autoAcceptConnections: false
        });

        // this.wsServer.on('request', this.onRequest);
        this.wsServer.on('request', function(request) {
            if (!originIsAllowed(request.origin)) {
                // Make sure we only accept requests from an allowed origin
                request.reject();
                console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                return;
            }

            try {
                var connection = request.accept('123', request.origin);

                console.log((new Date()) + ' Connection accepted.');
                connection.on('message', function(message) {
                    if (message.type === 'utf8') {
                        console.log('Received Message: ' + message.utf8Data);
                        connection.sendUTF(message.utf8Data);
                    }
                    else if (message.type === 'binary') {
                        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                        connection.sendBytes(message.binaryData);
                    }
                });
                connection.on('close', function(reasonCode, description) {
                    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
                });

            } catch (e) {
                console.log(e);
            }
        });
    },
    initWs: function () {
        // const WebSocket = require('ws');
        //
        // const ws = new WebSocket('wss://localhost:3210', {
        //     origin: 'localhost:3210'
        // });
        //
        // ws.on('open', function open() {
        //     console.log('connected');
        //     ws.send('Date.now()');
        // });
        //
        // ws.on('close', function close() {
        //     console.log('disconnected');
        // });
        //
        // ws.on('message', function incoming(data) {
        //     console.log(`Roundtrip time: ${Date.now() - data} ms`);
        //
        //     setTimeout(function timeout() {
        //         ws.send(Date.now());
        //     }, 500);
        // });

        // const wss = new webSocket.Server({
        //     port: 3210,
        //     perMessageDeflate: {
        //         zlibDeflateOptions: {
        //             // See zlib defaults.
        //             chunkSize: 1024,
        //             memLevel: 7,
        //             level: 3
        //         },
        //         zlibInflateOptions: {
        //             chunkSize: 10 * 1024
        //         },
        //         // Other options settable:
        //         clientNoContextTakeover: true, // Defaults to negotiated value.
        //         serverNoContextTakeover: true, // Defaults to negotiated value.
        //         serverMaxWindowBits: 10, // Defaults to negotiated value.
        //         // Below options specified as default values.
        //         concurrencyLimit: 10, // Limits zlib concurrency for perf.
        //         threshold: 1024 // Size (in bytes) below which messages
        //         // should not be compressed.
        //     }
        // });

        //const ws = new webSocket('ws://localhost:3210');

        // ws.on('open', function open() {
        //     ws.send('something');
        // });
        //
        // ws.on('message', function incoming(data) {
        //     console.log(data);
        // });


// Broadcast to all.
        wss.broadcast = function broadcast(data) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        };

        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(data) {
                // Broadcast to everyone else.
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(data);
                    }
                });
            });
        });

    }
    // onRequest:
}

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

module.exports = WebSocket;
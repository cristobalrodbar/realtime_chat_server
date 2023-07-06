const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //cliente con JWT?
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    console.log(valido, uid);
    console.log(client.handshake.headers['x-token']);

    //verificar autenticación
    if (!valido) { return client.disconnect(); }
    
    //cliente autenticado
    usuarioConectado(uid);

    console.log('cliente autenticado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});

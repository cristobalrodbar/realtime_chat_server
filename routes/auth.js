//path: api/login

const { Router, response} = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no válido').not().isEmpty().isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);


router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no válido').not().isEmpty().isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


router.get('/renew', validarJWT, renewToken);

module.exports = router;
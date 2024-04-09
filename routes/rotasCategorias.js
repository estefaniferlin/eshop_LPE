const { Router } = require('express');
const { verificaJWT } = require('../controllers/segurancaController');
const { getCategorias, addCategoria, updateCategoria, deleteCategoria, getCategoriaPorCodigo } = require('../controllers/categoriaController');

const rotasCategorias = new Router();

rotasCategorias.route('/categoria')
    .get(verificaJWT, getCategorias)
    .post(verificaJWT, addCategoria)
    .put(verificaJWT, updateCategoria)

rotasCategorias.route('/categoria/:codigo')
    .get(verificaJWT, getCategoriaPorCodigo)
    .delete(verificaJWT, deleteCategoria)

module.exports = { rotasCategorias };
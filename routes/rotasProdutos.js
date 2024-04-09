const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');

const { getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo } = require('../controllers/produtoController');

const rotasProdutos = new Router();

rotasProdutos.route('/produto')
    .get(verificaJWT, getProdutos)
    .post(verificaJWT,addProduto)
    .put(verificaJWT,updateProduto)

rotasProdutos.route('/produto/:codigo')
    .get(verificaJWT, getProdutoPorCodigo)
    .delete(verificaJWT, deleteProduto)

module.exports = { rotasProdutos };
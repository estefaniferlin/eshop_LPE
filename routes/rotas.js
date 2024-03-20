//arquivo para juntar todas as rotas

const { Router } = require('express');
const { rotasCategorias } = require('./rotasCategorias');
const { rotasProdutos } = require('./rotasProdutos');

const rotas = new Router();

rotas.use(rotasCategorias); 
rotas.use(rotasProdutos); 

module.exports = rotas;
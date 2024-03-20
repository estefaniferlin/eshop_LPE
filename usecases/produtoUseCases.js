const { pool } = require('../config');
const Produto = require('../entities/produto');

const getProdutosDB = async () => {// metodos assincrono que para em algum momento pra esperar o processamento
    try {
        const { rows } = await pool.query('SELECT * FROM produtos ORDER BY nome');
        return rows.map((produto) => new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria));

    } catch(err) {
        throw "Erro: " + err;
    }
}

const addProdutoDB = async (body) => {
    try {
        const { nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria } = body;
        const results = await pool.query(`INSERT INTO produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria`, [nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria]); // array vai conter os valores de cada um dos $ (como temos so 1 colocamos so um valor mem [])
        const produto = results.rows[0]; // pega a linha 0
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria)
    } catch (err) {
        throw "Erro: " + err;
    }
}

const updateProdutoDB = async (body) => {
    try {
        const { codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria } = body;
        const results = await pool.query(`UPDATE produtos SET nome = $2, descricao = $3, quantidade_estoque = $4, ativo = $5, valor = $6, data_cadastro = $7, categoria = $8
            WHERE codigo = $1 RETURNING codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria`, [codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria]); // array vai conter os valores de cada um dos $ na ordem que aparecem
        if(results.rowCount == 0){//verificar se foi feita uma alteração no banco
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        }
        const produto = results.rows[0]; // pega a linha 0
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria)
    } catch (err) {
        throw "Erro ao alterar: " + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM produtos
            WHERE codigo = $1`, [codigo]); 
        if(results.rowCount == 0){//verificar se foi feita uma alteração no banco
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`
        } else {
            return "Registro removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover: " + err;
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM produtos
            WHERE codigo = $1`, [codigo]); 
        if(results.rowCount == 0){//verificar se foi feita uma alteração no banco
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria)
        }
    } catch (err) {
        throw "Erro ao recuperar: " + err;
    }
}

module.exports = { getProdutosDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorCodigoDB }
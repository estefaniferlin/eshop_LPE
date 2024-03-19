const { pool } = require('../config');
const Categoria = require('../entities/categoria');

const getCategoriasDB = async () => {// metodos assincrono que para em algum momento pra esperar o processamento
    try {
        const { rows } = await pool.query('SELECT * FROM categorias ORDER BY nome');
        return rows.map((categoria) => new Categoria(categoria.codigo, categoria.nome));

    } catch(err) {
        throw "Erro: " + err;
    }
}

const addCategoriaDB = async (body) => {
    try {
        const { nome } = body;
        const results = await pool.query(`INSERT INTO categorias (nome)
            VALUES ($1) RETURNING codigo, nome`, [nome]); // array vai conter os valores de cada um dos $ (como temos so 1 colocamos so um valor mem [])
        const categoria = results.rows[0]; // pega a linha 0
        return new Categoria(categoria.codigo, categoria.nome)
    } catch (err) {
        throw "Erro: " + err;
    }
}

const updateCategoriaDB = async (body) => {
    try {
        const { codigo, nome } = body;
        const results = await pool.query(`UPDATE categorias SET nome = $2
            WHERE codigo = $1 RETURNING codigo, nome`, [codigo, nome]); // array vai conter os valores de cada um dos $ na ordem que aparecem
        if(results.rowCount == 0){//verificar se foi feita uma alteração no banco
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        }
        const categoria = results.rows[0]; // pega a linha 0
        return new Categoria(categoria.codigo, categoria.nome)
    } catch (err) {
        throw "Erro ao alterar: " + err;
    }
}

const deleteCategoriaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM categorias
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

const getCategoriaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM categorias
            WHERE codigo = $1`, [codigo]); 
        if(results.rowCount == 0){//verificar se foi feita uma alteração no banco
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const categoria = results.rows[0];
            return new Categoria(categoria.codigo, categoria.nome)
        }
    } catch (err) {
        throw "Erro ao recuperar: " + err;
    }
}

module.exports = { getCategoriasDB, addCategoriaDB, updateCategoriaDB, deleteCategoriaDB, getCategoriaPorCodigoDB }
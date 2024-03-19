const { Pool } = require('pg'); // responsavel por estabelecer a conexao com o pg (o banco)

const isProduction = process.env.NODE_ENV === 'production'; // variavel de ambiente que existe sempre quando executo uma aplicação node / quando eu usar em uma nuvem esse ambiente sera em produção

let pool = null;

if (isProduction){
    pool = new Pool({
        connectionString : process.env.DATABASE_URL , // varivael de ambinete que vou cadastrar quando hospedar o banco
        ssl : {
            rejectUnauthorized : false // para nao rejeitar requisições nao autorizadas
        }
    })
} else { // quando n estiver em produção
    pool = new Pool({
        user : 'postgres',
        host : 'localhost',
        database : 'eshoplpe',
        password: 'postgres',
        port : 5432
    })
}

module.exports = { pool }
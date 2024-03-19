const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors()); // para permitir conexoes fora da rede que eu estou

app.use(rotas);

app.listen(process.env.PORT || 3002, () => { // levantar o servidor / tenho que deixar a api preparada para pegar a porta das variaveis de amiente do servidor que vier (entao nao especificamos a porta)
    console.log('Servidor da API rodando...')
})

//para rodar dar npm run start:dev
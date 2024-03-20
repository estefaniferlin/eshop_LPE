const { getProdutosDB, addProdutoDB, updateProdutoDB,
        deleteProdutoDB, getProdutoPorCodigoDB } 
        = require('../usecases/produtoUseCases');

const getProdutos= async (request, response)=> {
    await getProdutosDB()
        .then(data => response.status(200).json(data)) // quando tiver o resutlado de getCategoriasDB ele retorna um data, e ai faremos alguma coisa
        .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os produtos: ' + err
        })); // se nao der certo retorna um erro
}

const addProduto = async (request, response)=> {
    await addProdutoDB(request.body)
        .then(data => response.status(200).json({   // retorna um objeto json com status, message e data
            status : 'success' , message : 'Produto Criado',
            objeto : data
        })) 
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

const updateProduto = async (request, response)=> {
    await updateProdutoDB(request.body)
        .then(data => response.status(200).json({   // retorna um objeto json com status, message e data
            status : 'success' , message : 'Produto alterado',
            objeto : data
        })) 
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

const deleteProduto = async (request, response)=> {
    await deleteProdutoDB(request.params.codigo) // recebe o codigo
        .then(data => response.status(200).json({   // retorna um objeto json com status, message e data
            status : 'success' , message : data
        })) 
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

const getProdutoPorCodigo = async (request, response)=> {
    await getProdutoPorCodigoDB(request.params.codigo) // recebe o codigo
        .then(data => response.status(200).json(data)) // retorna justamente o dado
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

module.exports = { getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo };
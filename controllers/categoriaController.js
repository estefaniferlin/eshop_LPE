const { getCategoriasDB, addCategoriaDB, updateCategoriaDB,
        deleteCategoriaDB, getCategoriaPorCodigoDB } 
        = require('../usecases/categoriaUseCases');

const getCategorias= async (request, response)=> {
    await getCategoriasDB()
        .then(data => response.status(200).json(data)) // quando tiver o resutlado de getCategoriasDB ele retorna um data, e ai faremos alguma coisa
        .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar as categorias: ' + err
        })); // se nao der certo retorna um erro
}

const addCategoria = async (request, response)=> {
    await addCategoriaDB(request.body)
        .then(data => response.status(200).json({   // retorna um objeto json com status, message e data
            status : 'success' , message : 'Categoria Criada',
            objeto : data
        })) 
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

const updateCategoria = async (request, response)=> {
    await updateCategoriaDB(request.body)
        .then(data => response.status(200).json({   // retorna um objeto json com status, message e data
            status : 'success' , message : 'Categoria alterada',
            objeto : data
        })) 
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

const deleteCategoria = async (request, response)=> {
    await deleteCategoriaDB(request.params.codigo) // recebe o codigo
        .then(data => response.status(200).json({   // retorna um objeto json com status, message e data
            status : 'success' , message : data
        })) 
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

const getCategoriaPorCodigo = async (request, response)=> {
    await getCategoriaPorCodigoDB(request.params.codigo) // recebe o codigo
        .then(data => response.status(200).json(data)) // retorna justamente o dado
        .catch(err => response.status(400).json({
            status : 'error',
            message :  err
        })); // se nao der certo retorna um erro
}

module.exports = { getCategorias, addCategoria, updateCategoria, deleteCategoria, getCategoriaPorCodigo };
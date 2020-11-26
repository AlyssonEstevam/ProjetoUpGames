const execSQLQuery = require('../database/connection')

class ClienteController{
    getCliente(req, res){
        let filter = ''
        if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id)
        execSQLQuery('SELECT * FROM Clientes' + filter, res)
    }

    deleteCliente(req, res){
        execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res)
    }

    postCliente(req, res){
        const nome = req.body.nome.substring(0,150)
        const cpf = req.body.cpf.substring(0,11)
        execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res)
    }

    putCliente(req, res){
        const id = parseInt(req.body.id);
        const nome = req.body.nome.substring(0,150)
        const cpf = req.body.cpf.substring(0,11)
        execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res)
    }
}

module.exports = new ClienteController()
const execSQLQuery = require('../database/connection')

class TipoUsuarioController{
    getTipoUsuario(req, res){
        execSQLQuery('SELECT * FROM Up_TipoUsuario ORDER BY Cod_SeqTipoUsuario', res)
    }
}

module.exports = new TipoUsuarioController()
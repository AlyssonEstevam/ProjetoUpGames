const execSQLQuery = require('../database/connection')

class UsuarioController{
    getUsuario(req, res){
        let filter = ''

        if(req.params.Cod_SeqUsuario) 
            filter = ' WHERE Cod_SeqUsuario=' + parseInt(req.params.Cod_SeqUsuario)

        execSQLQuery('SELECT * FROM Up_Usuarios' + filter, res)
    }

    deleteUsuario(req, res){
        execSQLQuery('DELETE FROM Up_Usuarios WHERE Cod_SeqUsuario=' + parseInt(req.params.Cod_SeqUsuario), res)
    }

    postUsuario(req, res){
        const Nom_Nome = req.body.Nom_Nome.substring(0,100),
              Nom_Login = req.body.Nom_Login.substring(0,30),
              Nom_Senha = req.body.Nom_Senha.substring(0,20),
              Cod_TipoUsuario = parseInt(req.body.Cod_TipoUsuario)

        execSQLQuery(`INSERT INTO Up_Usuarios(Nom_Nome, Nom_Login, Nom_Senha, Cod_TipoUsuario) 
                        VALUES('${Nom_Nome}', '${Nom_Login}', '${Nom_Senha}', '${Cod_TipoUsuario}')`, res)
    }

    putUsuario(req, res){
        const Cod_SeqUsuario = parseInt(req.body.Cod_SeqUsuario),
              Nom_Nome = req.body.Nom_Nome.substring(0,100),
              Nom_Login = req.body.Nom_Login.substring(0,30),
              Nom_Senha = req.body.Nom_Senha.substring(0,20),
              Cod_TipoUsuario = parseInt(req.body.Cod_TipoUsuario)

        execSQLQuery(`UPDATE Up_Usuarios SET Nom_Nome='${Nom_Nome}', 
                                         Nom_Login='${Nom_Login}', 
                                         Nom_Senha='${Nom_Senha}', 
                                         Cod_TipoUsuario='${Cod_TipoUsuario}'  
                        WHERE Cod_SeqUsuario=${Cod_SeqUsuario}`, res)
    }
}

module.exports = new UsuarioController()
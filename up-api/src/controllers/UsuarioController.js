const execSQLQuery = require('../database/connection')

class UsuarioController{
    getUsuario(req, res){
        let filtro = ''

        if(req.params.Cod_SeqUsuario) 
            filtro = ' WHERE Cod_SeqUsuario=' + parseInt(req.params.Cod_SeqUsuario)

        execSQLQuery('SELECT * FROM Up_Usuario' + filtro, res)
    }

    getUsuarioByLogin(req, res){
        let filtro = ''

        filtro = ' WHERE Nom_Login=\'' + req.params.Nom_Login.substring(0,30) + '\''

        execSQLQuery('SELECT * FROM Up_Usuario' + filtro, res)
    }

    getUsuarioFiltro(req, res){
        const Cod_Filtro = parseInt(req.body.Cod_Filtro),
              Nom_Filtro = req.body.Nom_Filtro.substring(0,100)

        let filtro = ''
        
        switch(Cod_Filtro){
            case 1:
                filtro = ' u INNER JOIN Up_TipoUsuario tu '
                         + 'ON tu.Cod_SeqTipoUsuario = u.Cod_TipoUsuario '
                         + 'WHERE u.Nom_Nome LIKE \'%' + Nom_Filtro + '%\' '
                         + 'ORDER BY u.Nom_Nome'
                break;
            case 2:
                filtro = ' u INNER JOIN Up_TipoUsuario tu '
                         + 'ON tu.Cod_SeqTipoUsuario = u.Cod_TipoUsuario '
                         + 'WHERE u.Nom_Login LIKE \'%' + Nom_Filtro + '%\' '
                         + 'ORDER BY u.Nom_Nome'
                break;
            case 3:
                filtro = ' u INNER JOIN Up_TipoUsuario tu '
                         + 'ON tu.Cod_SeqTipoUsuario = u.Cod_TipoUsuario '
                         + 'WHERE tu.Nom_TipoUsuario LIKE \'%' + Nom_Filtro + '%\' '
                         + 'ORDER BY tu.Nom_TipoUsuario'
                break;
        }

        execSQLQuery('SELECT * FROM Up_Usuario' + filtro, res)
    }

    deleteUsuario(req, res){
        execSQLQuery('DELETE FROM Up_Usuario WHERE Cod_SeqUsuario=' + parseInt(req.params.Cod_SeqUsuario), res)
    }

    postUsuario(req, res){
        const Nom_Nome = req.body.Nom_Nome.substring(0,100),
              Nom_Login = req.body.Nom_Login.substring(0,30),
              Nom_Senha = req.body.Nom_Senha.substring(0,20),
              Cod_TipoUsuario = parseInt(req.body.Cod_TipoUsuario)

        execSQLQuery(`INSERT INTO Up_Usuario(Nom_Nome, Nom_Login, Nom_Senha, Cod_TipoUsuario) 
                        VALUES('${Nom_Nome}', '${Nom_Login}', '${Nom_Senha}', '${Cod_TipoUsuario}')`, res)
    }

    putUsuario(req, res){
        const Cod_SeqUsuario = parseInt(req.body.Cod_SeqUsuario),
              Nom_Nome = req.body.Nom_Nome.substring(0,100),
              Nom_Login = req.body.Nom_Login.substring(0,30),
              Nom_Senha = req.body.Nom_Senha.substring(0,20),
              Cod_TipoUsuario = parseInt(req.body.Cod_TipoUsuario)

        execSQLQuery(`UPDATE Up_Usuario SET Nom_Nome='${Nom_Nome}', 
                                         Nom_Login='${Nom_Login}', 
                                         Nom_Senha='${Nom_Senha}', 
                                         Cod_TipoUsuario='${Cod_TipoUsuario}'  
                        WHERE Cod_SeqUsuario=${Cod_SeqUsuario}`, res)
    }
}

module.exports = new UsuarioController()
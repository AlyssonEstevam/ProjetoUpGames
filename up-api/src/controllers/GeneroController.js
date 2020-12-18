const execSQLQuery = require('../database/connection')

class GeneroController{
    getGenero(req, res){
        let filtro = ''

        if(req.params.Cod_SeqGenero) 
            filtro = ' WHERE Cod_SeqGenero=' + parseInt(req.params.Cod_SeqGenero)

        execSQLQuery('SELECT * FROM Up_Genero' + filtro, res)
    }

    deleteGenero(req, res){
        execSQLQuery('DELETE FROM Up_Genero WHERE Cod_SeqGenero=' + parseInt(req.params.Cod_SeqGenero), res)
    }

    postGenero(req, res){
        const Nom_Nome = req.body.Nom_Nome.substring(0,50)

        execSQLQuery(`INSERT INTO Up_Genero(Nom_Nome) 
                        VALUES('${Nom_Nome}')`, res)
    }

    putGenero(req, res){
        const Cod_SeqGenero = parseInt(req.body.Cod_SeqGenero),
              Nom_Nome = req.body.Nom_Nome.substring(0,50)

        execSQLQuery(`UPDATE Up_Genero SET Nom_Nome='${Nom_Nome}' 
                        WHERE Cod_SeqGenero=${Cod_SeqGenero}`, res)
    }
}

module.exports = new GeneroController()
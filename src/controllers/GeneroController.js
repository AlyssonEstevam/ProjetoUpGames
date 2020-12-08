const execSQLQuery = require('../database/connection')

class GeneroController{
    getGenero(req, res){
        let filter = ''

        if(req.params.Cod_SeqGenero) 
            filter = ' WHERE Cod_SeqGenero=' + parseInt(req.params.Cod_SeqGenero)

        execSQLQuery('SELECT * FROM Up_Generos' + filter, res)
    }

    deleteGenero(req, res){
        execSQLQuery('DELETE FROM Up_Generos WHERE Cod_SeqGenero=' + parseInt(req.params.Cod_SeqGenero), res)
    }

    postGenero(req, res){
        const Nom_Nome = req.body.Nom_Nome.substring(0,50)

        execSQLQuery(`INSERT INTO Up_Generos(Nom_Nome) 
                        VALUES('${Nom_Nome}')`, res)
    }

    putGenero(req, res){
        const Cod_SeqGenero = parseInt(req.body.Cod_SeqGenero),
              Nom_Nome = req.body.Nom_Nome.substring(0,50)

        execSQLQuery(`UPDATE Up_Generos SET Nom_Nome='${Nom_Nome}' 
                        WHERE Cod_SeqGenero=${Cod_SeqGenero}`, res)
    }
}

module.exports = new GeneroController()
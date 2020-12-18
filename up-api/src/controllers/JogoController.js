const execSQLQuery = require('../database/connection')

class JogoController{
    getJogo(req, res){
        let filtro = ''

        if(req.params.Cod_SeqJogo) 
            filtro = ' WHERE Cod_SeqJogo=' + parseInt(req.params.Cod_SeqJogo)

        execSQLQuery('SELECT * FROM Up_Jogo' + filtro, res)
    }

    deleteJogo(req, res){
        execSQLQuery('DELETE FROM Up_Jogo WHERE Cod_SeqJogo=' + parseInt(req.params.Cod_SeqJogo), res)
    }

    postJogo(req, res){
        const Nom_Nome = req.body.Nom_Nome.substring(0,100),
              Cod_Genero = parseInt(req.body.Cod_Genero),
              Vlr_Preco = parseFloat(req.body.Vlr_Preco)

        execSQLQuery(`INSERT INTO Up_Jogo(Nom_Nome, Cod_Genero, Vlr_Preco) 
                        VALUES('${Nom_Nome}', '${Cod_Genero}', '${Vlr_Preco}')`, res)
    }

    putJogo(req, res){
        const Cod_SeqJogo = parseInt(req.body.Cod_SeqJogo),
              Nom_Nome = req.body.Nom_Nome.substring(0,100),
              Cod_Genero = parseInt(req.body.Cod_Genero),
              Vlr_Preco = parseFloat(req.body.Vlr_Preco)

        execSQLQuery(`UPDATE Up_Jogo SET Nom_Nome='${Nom_Nome}', 
                                          Cod_Genero='${Cod_Genero}', 
                                          Vlr_Preco='${Vlr_Preco}'
                        WHERE Cod_SeqJogo=${Cod_SeqJogo}`, res)
    }
}

module.exports = new JogoController()
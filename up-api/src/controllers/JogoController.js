const execSQLQuery = require('../database/connection')

class JogoController{
    getJogo(req, res){
        let filtro = ''

        if(req.params.Cod_SeqJogo) 
            filtro = ' WHERE Cod_SeqJogo=' + parseInt(req.params.Cod_SeqJogo)

        execSQLQuery('SELECT * FROM Up_Jogo' + filtro, res)
    }

    getJogoFiltro(req, res){
        const Cod_Filtro = parseInt(req.query.Cod_Filtro),
              Nom_Filtro = req.query.Nom_Filtro.substring(0,100)

        let filtro = ''
        
        switch(Cod_Filtro){
            case 1:
                filtro = ' j INNER JOIN Up_Genero g '
                         + 'ON g.Cod_SeqGenero = j.Cod_Genero '
                         + 'WHERE j.Nom_Nome LIKE \'%' + Nom_Filtro + '%\' '
                         + 'ORDER BY j.Nom_Nome'
                break;
            case 2:
                filtro = ' j INNER JOIN Up_Genero g '
                         + 'ON g.Cod_SeqGenero = j.Cod_Genero '
                         + 'WHERE g.Nom_Genero LIKE \'%' + Nom_Filtro + '%\' '
                         + 'ORDER BY g.Nom_Genero'
                break;
            default:
                filtro = ' j INNER JOIN Up_Genero g '
                         + 'ON g.Cod_SeqGenero = j.Cod_Genero '
                         + 'ORDER BY j.Cod_SeqJogo'
                break;
        }

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
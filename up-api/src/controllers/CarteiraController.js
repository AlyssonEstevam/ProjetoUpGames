const execSQLQuery = require('../database/connection')

class CarteiraController{
    getCarteira(req, res){
        let filtro = ''

        if(req.params.Cod_SeqCarteira) 
            filtro = ' WHERE Cod_SeqCarteira=' + parseInt(req.params.Cod_SeqCarteira)

        execSQLQuery('SELECT * FROM Up_Carteira' + filtro, res)
    }

    getCarteiraFiltro(req, res){
        const Nom_Filtro = req.query.Nom_Filtro.substring(0,100)

        let filtro = ' WHERE Cod_Usuario=' + Nom_Filtro

        execSQLQuery('SELECT * FROM Up_Carteira' + filtro, res)
    }

    postCarteira(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`INSERT INTO Up_Carteira(Vlr_Saldo, Cod_Usuario) 
                        VALUES(0.0, ${Cod_Usuario})`, res)
    }

    putCarteira(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario),
              Ind_Operacao = req.body.Ind_Operacao.substring(0,1),
              Vlr_Valor = parseFloat(req.body.Vlr_Valor)

        if(Ind_Operacao == 'C')
            execSQLQuery(`UPDATE Up_Carteira SET Vlr_Saldo = 
                            (SELECT Vlr_Saldo + ${Vlr_Valor} FROM Up_Carteira WHERE Cod_Usuario = ${Cod_Usuario})
                            WHERE Cod_Usuario=${Cod_Usuario}`, res)
        else
            execSQLQuery(`UPDATE Up_Carteira SET Vlr_Saldo = 
                            (SELECT Vlr_Saldo - ${Vlr_Valor} FROM Up_Carteira WHERE Cod_Usuario = ${Cod_Usuario})
                            WHERE Cod_Usuario=${Cod_Usuario}`, res)
    }
}

module.exports = new CarteiraController()
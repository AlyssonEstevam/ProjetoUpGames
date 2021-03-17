const execSQLQuery = require('../database/connection')

class RealizaVendaController{
    adicionaHorizonCarrinho(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`UPDATE Up_ControleVenda SET Ind_HorizonCarrinho = 1 WHERE Cod_Usuario = '${Cod_Usuario}'`, res)
    }

    removeHorizonCarrinho(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`UPDATE Up_ControleVenda SET Ind_HorizonCarrinho = 0 WHERE Cod_Usuario = '${Cod_Usuario}'`, res)
    }

    adicionaFarCryCarrinho(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`UPDATE Up_ControleVenda SET Ind_FarCryCarrinho = 1 WHERE Cod_Usuario = '${Cod_Usuario}'`, res)
    }

    removeFarCryCarrinho(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`UPDATE Up_ControleVenda SET Ind_FarCryCarrinho = 0 WHERE Cod_Usuario = '${Cod_Usuario}'`, res)
    }

    confirmaVendaHorizon(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`UPDATE Up_ControleVenda SET Ind_HorizonConfirmaVenda = 1 WHERE Cod_Usuario = '${Cod_Usuario}'`, res)
    }

    confirmaVendaFarCry(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`UPDATE Up_ControleVenda SET Ind_FarCryConfirmaVenda = 1 WHERE Cod_Usuario = '${Cod_Usuario}'`, res)
    }

    limpaVendasUsuario(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`UPDATE Up_ControleVenda SET Ind_HorizonCarrinho = 0, 
                                                  Ind_FarCryCarrinho = 0,
                                                  Ind_HorizonConfirmaVenda = 0,
                                                  Ind_FarCryConfirmaVenda = 0 WHERE Cod_Usuario = '${Cod_Usuario}'`, res)
    }

    getVendasUsuario(req, res){
        let filtro = ''

        if(req.params.Cod_Usuario) 
            filtro = ' WHERE Cod_Usuario=' + parseInt(req.params.Cod_Usuario)

        execSQLQuery('SELECT * FROM Up_ControleVenda' + filtro, res)
    }

    postControleVendaUsuario(req, res){
        const Cod_Usuario = parseInt(req.body.Cod_Usuario)

        execSQLQuery(`INSERT INTO Up_ControleVenda (Cod_Usuario, Ind_HorizonCarrinho, Ind_FarCryCarrinho, Ind_HorizonConfirmaVenda, Ind_FarCryConfirmaVenda)
                        VALUES(${Cod_Usuario}, 0, 0, 0, 0)`, res)
    }
}

module.exports = new RealizaVendaController()
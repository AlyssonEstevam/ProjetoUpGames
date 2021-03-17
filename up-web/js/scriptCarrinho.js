var usuarioLogado;

window.onload = function(){
    var data = pegaParametrosUrl();

    usuarioLogado = data.Cod_SeqUsuario;

    $.ajax({
        method: "GET",
        url: 'http://localhost:4000/getVendasUsuario/' + usuarioLogado,
        crossDomain: true
      }).done(function(data) {
        var valor = 0;

        if(data[0].Ind_HorizonCarrinho == 1){
            var divControle = document.getElementById('lista_carrinho')

            var imgHorizon = document.createElement("IMG")

            imgHorizon.src = "../imagens/zero.jpg"
            divControle.appendChild(imgHorizon)

            valor += 50
        }

        if(data[0].Ind_FarCryCarrinho == 1){
            var divControle = document.getElementById('lista_carrinho')

            var imgFarCry = document.createElement("IMG")

            imgFarCry.src = "../imagens/far.jpg"
            divControle.appendChild(imgFarCry)

            valor += 200
        }

        var textoValorTotal = document.getElementById('valorTotal');

        textoValorTotal.innerHTML = 'Valor Total: R$ ' + valor.toFixed(2).replace('.', ',');
      }).fail(function(data) {
        if(!data.length)
          alert('Ocorreu um erro no servidor, contate o administrador.');
      });
}

function pegaParametrosUrl(){
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });

    return data;
}

function abreTelaHome(){
    console.log(usuarioLogado);

    window.location.href = 'home.html?Cod_SeqUsuario=' + usuarioLogado;
}

function abreTelaLoja(){
    window.location.href = 'loja.html?Cod_SeqUsuario=' + usuarioLogado;
}

function abreTelaBiblioteca(){
    window.location.href = 'biblioteca.html?Cod_SeqUsuario=' + usuarioLogado;
}

function abreTelaCarteira(){
    window.location.href = 'carteira.html?Cod_SeqUsuario=' + usuarioLogado;
}

function abreTelaCarrinho(){
    window.location.href = 'carrinho.html?Cod_SeqUsuario=' + usuarioLogado;
}

function confirmaVenda(){
    $.ajax({
        method: "GET",
        url: 'http://localhost:4000/getVendasUsuario/' + usuarioLogado,
        crossDomain: true
      }).done(function(data) {
        var valorTotal = 0;
        var indHorizon = data[0].Ind_HorizonCarrinho;
        var indFarCry = data[0].Ind_FarCryCarrinho;

        if(indHorizon == 0 && indFarCry == 0){
            alert('Não existe nenhum jogo em seu carrinho, retorne a loja e adicione algum.')
            abreTelaLoja()
        }else{
            if(indHorizon == 1)
                valorTotal += 50
            
            if(indFarCry == 1)
                valorTotal += 200

                $.ajax({
                    method: "GET",
                    url: 'http://localhost:4000/getCarteiraFiltro/?Nom_Filtro=' + usuarioLogado,
                    crossDomain: true
                  }).done(function(data) {
                    if(data[0].Vlr_Saldo < valorTotal){
                        alert('Você não possui saldo suficiente para adquirir os jogos do carrinho, adicione saldo na sua carteira.')
                        abreTelaCarteira()
                    }else{
                        var resposta = confirm('Confirma a aquisição dos jogos do carrinho?')

                        if(resposta){
                            var model = {
                                Cod_Usuario: usuarioLogado
                            }

                            let modelCarteira = {
                                Cod_Usuario: usuarioLogado,
                                Ind_Operacao: 'D',
                                Vlr_Valor: valorTotal
                            }

                            $.ajax({
                                method: "PUT",
                                url: 'http://localhost:4000/putCarteira',
                                data: modelCarteira,
                                dataType: "json",
                                crossDomain: true
                            }).done(function(){
                                if(indHorizon == 1){
                                    realizaVendaHorizon(model, indFarCry);
                                }else{
                                    realizaVendaFarCry(model);
                                }
                            }).fail(function() {
                                alert('Ocorreu um erro no servidor, contate o administrador: ')
                            });
                        }
                    }
                  }).fail(function(data) {
                    if(!data.length)
                      alert('Ocorreu um erro no servidor, contate o administrador.');
                  });
        }
      }).fail(function(data) {
        if(!data.length)
          alert('Ocorreu um erro no servidor, contate o administrador.');
      });
}

function realizaVendaHorizon(model, indFarCry){
    $.ajax({
        method: "POST",
        url: 'http://localhost:4000/removeHorizonCarrinho',
        data: model,
        dataType: "json",
        crossDomain: true
    }).done(function(){
        $.ajax({
            method: "POST",
            url: 'http://localhost:4000/confirmaVendaHorizon',
            data: model,
            dataType: "json",
            crossDomain: true
        }).done(function(){
            if(indFarCry == 1){
                $.ajax({
                    method: "POST",
                    url: 'http://localhost:4000/removeFarCryCarrinho',
                    data: model,
                    dataType: "json",
                    crossDomain: true
                }).done(function(){
                    $.ajax({
                        method: "POST",
                        url: 'http://localhost:4000/confirmaVendaFarCry',
                        data: model,
                        dataType: "json",
                        crossDomain: true
                    }).done(function(){
                        alert('Jogos comprados com sucesso, confira sua biblioteca!')
                        abreTelaCarrinho()
                    }).fail(function() {
                        alert('Ocorreu um erro no servidor, contate o administrador.')
                    });
                }).fail(function() {
                    alert('Ocorreu um erro no servidor, contate o administrador.')
                });
            }else{
                alert('Jogo comprado com sucesso, confira sua biblioteca!')
                abreTelaCarrinho()
            }
        }).fail(function() {
            alert('Ocorreu um erro no servidor, contate o administrador.')
        });
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador.')
    });
}

function realizaVendaFarCry(model){
    $.ajax({
        method: "POST",
        url: 'http://localhost:4000/removeFarCryCarrinho',
        data: model,
        dataType: "json",
        crossDomain: true
    }).done(function(){
        $.ajax({
            method: "POST",
            url: 'http://localhost:4000/confirmaVendaFarCry',
            data: model,
            dataType: "json",
            crossDomain: true
        }).done(function(){
            alert('Jogo comprado com sucesso, confira sua biblioteca!')
            abreTelaCarrinho()
        }).fail(function() {
            alert('Ocorreu um erro no servidor, contate o administrador.')
        });
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador.')
    });
}
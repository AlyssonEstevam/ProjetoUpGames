var usuarioLogado;

window.onload = function(){
    var data = pegaParametrosUrl();

    usuarioLogado = data.Cod_SeqUsuario;
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

function adicionaCarrinhoHorizon(){
    var resposta = confirm('Deseja adicionar o jogo Horizon: Zero Dawn ao carrinho?');

    if(resposta == true){
        model = {
            Cod_Usuario: usuarioLogado
        }

        $.ajax({
          method: "POST",
          url: 'http://localhost:4000/adicionaHorizonCarrinho',
          data: model,
          dataType: "json",
          crossDomain: true
        }).done(function(){
          alert('Jogo adicionado ao carrinho.')
        }).fail(function() {
          alert('Ocorreu um erro no servidor, contate o administrador.')
        });
    }
}

function adicionaCarrinhoFarCry(){
    var resposta = confirm('Deseja adicionar o jogo Far Cry 5 ao carrinho?');

    if(resposta == true){
        model = {
            Cod_Usuario: usuarioLogado
        }

        $.ajax({
          method: "POST",
          url: 'http://localhost:4000/adicionaFarCryCarrinho',
          data: model,
          dataType: "json",
          crossDomain: true
        }).done(function(){
          alert('Jogo adicionado ao carrinho.')
        }).fail(function() {
          alert('Ocorreu um erro no servidor, contate o administrador.')
        });
    }
}

function limpaVendasUsuario(){
    model = {
        Cod_Usuario: usuarioLogado
    }

    $.ajax({
        method: "POST",
        url: 'http://localhost:4000/limpaVendasUsuario',
        data: model,
        dataType: "json",
        crossDomain: true
      }).done(function(){
        alert('Tudo limpo!')
      }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador.')
      });
}

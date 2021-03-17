var usuarioLogado;

window.onload = function(){
    var data = pegaParametrosUrl();

    usuarioLogado = data.Cod_SeqUsuario;

    $.ajax({
        method: "GET",
        url: 'http://localhost:4000/getVendasUsuario/' + usuarioLogado,
        crossDomain: true
      }).done(function(data) {
        if(data[0].Ind_HorizonConfirmaVenda == 1){
            var divControle = document.getElementById('jogos')

            var imgHorizon = document.createElement("IMG")

            imgHorizon.src = "../imagens/zero.jpg"
            imgHorizon.setAttribute('onclick', 'exibeCaixa();')
            divControle.appendChild(imgHorizon)
        }

        if(data[0].Ind_FarCryConfirmaVenda == 1){
            var divControle = document.getElementById('jogos')

            var imgFarCry = document.createElement("IMG")

            imgFarCry.src = "../imagens/far.jpg"
            imgFarCry.setAttribute('onclick', 'exibeCaixa();')
            divControle.appendChild(imgFarCry)
        }
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

function exibeCaixa(){
    document.getElementById('caixa').style.display = 'block';
}

function fechaCaixa(){
    document.getElementById('caixa').style.display = 'none';
}
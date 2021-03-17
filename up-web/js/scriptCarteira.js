var usuarioLogado;

window.onload = function(){
    var data = pegaParametrosUrl();

    usuarioLogado = data.Cod_SeqUsuario;

    $.ajax({
        method: "GET",
        url: 'http://localhost:4000/getCarteiraFiltro/?Nom_Filtro=' + usuarioLogado,
        crossDomain: true
      }).done(function(data) {
        var textoSaldo = document.getElementById('saldo');

        textoSaldo.innerHTML = 'SALDO: R$ ' + data[0].Vlr_Saldo.toFixed(2).replace('.', ',');

        var rbBoleto = document.getElementById('boleto');
        rbBoleto.checked = true;
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

function limpaPlaceHolder(input){
    $(input).attr("placeholder", "");
}
  
function adicionaPlaceHolder(input){
    $(input).attr("placeholder", "R$ 0,00");
}

function formataValor(input){
    let valor = '';

    if($('#cvalor').val()){
        valor = parseFloat($('#cvalor').val().replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2});
        $('#cvalor').val('R$ ' + valor);
    }

    if(input)
        adicionaPlaceHolder(input);
}

function adicionaSaldo(){
    let valor = $('#cvalor').val()

    if(!valor){
        alert('Informe o valor para prosseguir!');
        document.getElementById("cvalor").focus();
        return;
    }

    valor = valor.replace('.', '')

    let model = {
        Cod_Usuario: usuarioLogado,
        Ind_Operacao: 'C',
        Vlr_Valor: valor.substring(3, valor.length).replace(',', '.')
    }

    $.ajax({
        method: "PUT",
        url: 'http://localhost:4000/putCarteira',
        data: model,
        dataType: "json",
        crossDomain: true
    }).done(function(){
        alert('Obrigado por adicionar o saldo à sua carteira!');
        abreTelaCarteira();
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador: ')
        document.getElementById("cvalor").focus();
    });
}
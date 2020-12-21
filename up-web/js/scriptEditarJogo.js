var codigoJogo;

window.onload = function(){
    let dados = pegarParametros();

    carregaComboGenero(dados.Cod_Genero);

    $('#cnome').val(decodeURI(dados.Nom_Nome));
    $('#cpreco').val(decodeURI(dados.Vlr_Preco));
    formataPreco(false);
    codigoJogo = dados.Cod_SeqJogo;
}

function formataPreco(input){
    let preco = '';

    if($('#cpreco').val()){
        preco = parseFloat($('#cpreco').val().replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2});
        $('#cpreco').val(preco);
    }

    if(input)
        adicionaPlaceHolder(input);
}

function pegarParametros(){
    var query = location.search.slice(1);
    var partes = query.split('&');
    var dados = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        dados[chave] = valor;
    });

    return(dados); 
}

function carregaComboGenero(Cod_Genero){
  $.ajax({
    method: "GET",
    url: 'http://localhost:4000/getGenero',
    crossDomain: true,
    dataType: "json"
  }).done(function(data){
    data.forEach(function(x){
      var option = document.createElement('option');
      let textnode = document.createTextNode(x.Nom_Genero);
      option.appendChild(textnode);
      option.setAttribute('value', x.Cod_SeqGenero);

      if(x.Cod_SeqGenero == Cod_Genero)
        option.setAttribute('selected', 'selected');

      document.getElementById('comboGeneros').appendChild(option);
    });
  }).fail(function() {
    alert('Ocorreu um erro no servidor, contate o administrador.');
    return;
  });
}

function limpaPlaceHolder(input){
    $(input).attr("placeholder", "");
}
  
function adicionaPlaceHolder(input){
  if(input.id == 'cnome'){
    $(input).attr("placeholder", "NOME");
  }else if(input.id == 'cpreco'){
    $(input).attr("placeholder", "PRECO");
  }
}

function realizaEdicao(){
    let nome = $('#cnome').val(),
        codigoGenero = $('#comboGeneros').val(),
        preco = $('#cpreco').val();

    if(!nome){
        alert('Informe o nome para prosseguir!');
        document.getElementById("cnome").focus();
        return;
    }

    if(codigoGenero == 0){
        alert('Informe o gênero para prosseguir!');
        return;
    }

    if(!preco){
        alert('Informe o preço para prosseguir!');
        document.getElementById("cpreco").focus();
        return;
    }

    let model = {
        Cod_SeqJogo: codigoJogo,
        Nom_Nome: nome,
        Vlr_Preco: preco.replace(',', '.'),
        Cod_Genero: codigoGenero
    }

    $.ajax({
        method: "PUT",
        url: 'http://localhost:4000/putJogo',
        data: model,
        dataType: "json",
        crossDomain: true
    }).done(function(){
        alert('Jogo editado com sucesso!');
        abreTelaBuscarJogo();
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador: ')
        document.getElementById("cnome").focus();
    });
}

function excluirJogo(){
  if(confirm("Deseja mesmo deletar o jogo?")){
    $.ajax({
      method: "DELETE",
      url: 'http://localhost:4000/deleteJogo/' + codigoJogo,
      dataType: "json",
      crossDomain: true
    }).done(function(){
      alert('Jogo deletado com sucesso.')
      abreTelaBuscarJogo()
    }).fail(function() {
      alert('Ocorreu um erro no servidor, contate o administrador')
      document.getElementById("cnome").focus();
    });
  }
}

function abreTelaBuscarJogo(){
  window.location.href = 'buscarJogoDev.html';
}

function teclaPressionada(e, input){
  if(e.keyCode == 13 && input.id == 'cnome'){
    document.getElementById("cpreco").focus();
  }else if(e.keyCode == 13 && input.id == 'cpreco'){
    realizaEdicao();
  }
}

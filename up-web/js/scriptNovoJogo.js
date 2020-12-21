window.onload = function(){
    carregaComboGenero();
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

function formataPreco(input){
    let preco = '';

    if($('#cpreco').val()){
        preco = parseFloat($('#cpreco').val().replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2});
        $('#cpreco').val(preco);
    }

    if(input)
        adicionaPlaceHolder(input);
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

function realizaCadastro(){
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
        Nom_Nome: nome,
        Vlr_Preco: preco.replace(',', '.'),
        Cod_Genero: codigoGenero
    }

    $.ajax({
        method: "POST",
        url: 'http://localhost:4000/postJogo',
        data: model,
        dataType: "json",
        crossDomain: true
    }).done(function(){
        alert('Jogo cadastrado com sucesso!');
        abreTelaBuscarJogo();
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador: ')
        document.getElementById("cnome").focus();
    });
}

function abreTelaBuscarJogo(){
  window.location.href = 'buscarJogoDev.html';
}

function teclaPressionada(e, input){
  if(e.keyCode == 13 && input.id == 'cnome'){
    document.getElementById("cpreco").focus();
  }else if(e.keyCode == 13 && input.id == 'cpreco'){
    realizaCadastro();
  }
}

function limparCampos(){
    $("#cnome").val("");
    $("#cpreco").val("");
    $("#comboGeneros").val("0");
}
  
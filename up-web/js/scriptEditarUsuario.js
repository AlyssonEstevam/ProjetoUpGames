var codigoUsuario;

window.onload = function(){
    let dados = pegarParametros();

    carregaComboTipoUsuario(dados.Cod_TipoUsuario);

    $('#cnome').val(decodeURI(dados.Nom_Nome));
    $('#clogin').val(decodeURI(dados.Nom_Login));
    codigoUsuario = dados.Cod_SeqUsuario;
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

function carregaComboTipoUsuario(Cod_TipoUsuario){
  $.ajax({
    method: "GET",
    url: 'http://localhost:4000/getTipoUsuario',
    crossDomain: true,
    dataType: "json"
  }).done(function(data){
    data.forEach(function(x){
      var option = document.createElement('option');
      let textnode = document.createTextNode(x.Nom_TipoUsuario);
      option.appendChild(textnode);
      option.setAttribute('value', x.Cod_SeqTipoUsuario);

      if(x.Cod_SeqTipoUsuario == Cod_TipoUsuario)
        option.setAttribute('selected', 'selected');

      document.getElementById('comboFiltros').appendChild(option);
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
    $(input).attr("placeholder", "NOME COMPLETO");
  }else if(input.id == 'clogin'){
    $(input).attr("placeholder", "LOGIN");
  }else if(input.id == 'csenha'){
    $(input).attr("placeholder", "SENHA");
  }else{
    $(input).attr("placeholder", "CONFIRME A SENHA");
  }
}

function realizaEdicao(){
  let nome = $('#cnome').val(),
      codigoTipoUsuario = $('#comboFiltros').val(),
      login = $('#clogin').val(),
      senha = $('#csenha').val(),
      confirmaSenha = $('#cconfirmasenha').val();

  if(!nome){
    alert('Informe o nome para prosseguir!');
    document.getElementById("cnome").focus();
    return;
  }

  if(codigoTipoUsuario == 0){
    alert('Informe o tipo de usuário para prosseguir!');
    return;
  }
  
  if(!login){
    alert('Informe o login para prosseguir!');
    document.getElementById("clogin").focus();
    return;
  }

  if((senha || confirmaSenha) && senha != confirmaSenha){
    alert('As senhas informadas não coincidem!');
    $("#csenha").val("");
    $("#cconfirmasenha").val("");
    document.getElementById("csenha").focus();
    return;
  }

  $.ajax({
    method: "GET",
    url: 'http://localhost:4000/getUsuarioByLogin/' + login,
    crossDomain: true
  }).done(function(data) {
    if(data.length && data[0].Cod_SeqUsuario != codigoUsuario){
      alert('Este login já está cadastrado.');
      $("#clogin").val("");
      document.getElementById("clogin").focus();
      return;
    }

    let model = {
      Cod_SeqUsuario: codigoUsuario,
      Nom_Nome: nome,
      Nom_Login: login,
      Nom_Senha: senha,
      Cod_TipoUsuario: codigoTipoUsuario
    }

    if(!model.Nom_Senha){
      model.Nom_Senha = '';
    }

    $.ajax({
      method: "PUT",
      url: 'http://localhost:4000/putUsuario',
      data: model,
      dataType: "json",
      crossDomain: true
    }).done(function(){
      alert('Usuário editado com sucesso!');
      abreTelaBuscarUsuario();
    }).fail(function() {
      alert('Ocorreu um erro no servidor, contate o administrador: ')
      document.getElementById("cnome").focus();
    });
  }).fail(function(data) {
    if(!data.length)
      alert('Ocorreu um erro no servidor, contate o administrador.')
      document.getElementById("cnome").focus();
  });
}

function excluirUsuario(){
  if(confirm("Deseja mesmo deletar o usuário?")){
    $.ajax({
      method: "DELETE",
      url: 'http://localhost:4000/deleteUsuario/' + codigoUsuario,
      dataType: "json",
      crossDomain: true
    }).done(function(){
      alert('Usuário deletado com sucesso.')
      abreTelaBuscarUsuario()
    }).fail(function() {
      alert('Ocorreu um erro no servidor, contate o administrador: ')
      document.getElementById("cnome").focus();
    });
  }
}

function abreTelaBuscarUsuario(){
  window.location.href = 'buscarUsuario.html';
}

function teclaPressionada(e, input){
  if(e.keyCode == 13 && input.id == 'cnome'){
    document.getElementById("clogin").focus();
  }else if(e.keyCode == 13 && input.id == 'clogin'){
    document.getElementById("csenha").focus();
  }else if(e.keyCode == 13 && input.id == 'csenha'){
    document.getElementById("cconfirmasenha").focus();
  }else if(e.keyCode == 13 && input.id == 'cconfirmasenha'){
    realizaCadastro();
  }
}

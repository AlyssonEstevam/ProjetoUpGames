window.onload = function(){
    carregaComboTipoUsuario();
}

function carregaComboTipoUsuario(){
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

function realizaCadastro(){
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

  if(!senha){
    alert('Informe a senha para prosseguir!');
    document.getElementById("csenha").focus();
    return;
  }

  if(!senha){
    alert('Informe a confirmação de senha para prosseguir!');
    document.getElementById("cconfirmasenha").focus();
    return;
  }

  if(senha != confirmaSenha){
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
    if(data.length){
      alert('Este login já está cadastrado.');
      $("#clogin").val("");
      document.getElementById("clogin").focus();
      return;
    }

    let model = {
      Nom_Nome: nome,
      Nom_Login: login,
      Nom_Senha: senha,
      Cod_TipoUsuario: codigoTipoUsuario
    }

    $.ajax({
      method: "POST",
      url: 'http://localhost:4000/postUsuario',
      data: model,
      dataType: "json",
      crossDomain: true
    }).done(function(){
      alert('Usuário cadastrado com sucesso!');
      abreTelaBuscarUsuario();
    }).fail(function() {
      alert('Ocorreu um erro no servidor, contate o administrador: ');
      document.getElementById("cnome").focus();
    });
  }).fail(function(data) {
    if(!data.length)
      alert('Ocorreu um erro no servidor, contate o administrador.');
      document.getElementById("cnome").focus();
  });
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

function limparCampos(){
    $("#cnome").val("");
    $("#clogin").val("");
    $("#csenha").val("");
    $("#cconfirmasenha").val("");
    $("#comboFiltros").val("0");
}
  
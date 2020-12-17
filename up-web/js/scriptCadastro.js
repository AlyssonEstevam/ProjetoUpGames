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
  let nome = $('#cnome').val();
  let login = $('#clogin').val();
  let senha = $('#csenha').val();
  let confirmaSenha = $('#cconfirmasenha').val();

  if(!login || !senha || !nome || !confirmaSenha){
    alert('Informe todos os campos para prosseguir!');
    return;
  }

  if(senha != confirmaSenha){
    alert('As senhas informadas não coincidem!');
    $("#csenha").val("");
    $("#cconfirmasenha").val("");
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
      return;
    }

    let model = {
      Nom_Nome: nome,
      Nom_Login: login,
      Nom_Senha: senha,
      Cod_TipoUsuario: 3
    }

    $.ajax({
      method: "POST",
      url: 'http://localhost:4000/postUsuario',
      data: model,
      dataType: "json",
      crossDomain: true
    }).done(function(){
      alert('Usuário inserido com sucesso, por favor realize o login.')
      window.location.href = '../index.html';
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador.')
    });
  }).fail(function(data) {
    if(!data.length)
      alert('Ocorreu um erro no servidor, contate o administrador.')
  });
}

function limparCampos(){
  $("#cnome").val("");
  $("#clogin").val("");
  $("#csenha").val("");
  $("#cconfirmasenha").val("");
}

function abreTelaLogin(){
  window.location.href = '../index.html';
}

function limpaPlaceHolder(input){
  $(input).attr("placeholder", "");
}

function adicionaPlaceHolder(input){
  if(input.id == 'clogin'){
    $(input).attr("placeholder", "LOGIN");
  }else{
    $(input).attr("placeholder", "SENHA");
  }
}

function realizaLogin(){
  let login = $('#clogin').val();
  let senha = $('#csenha').val();

  if(!login || !senha){
    alert('Informe o usuário e a senha!');
    return;
  }

  $.ajax({
    method: "GET",
    url: 'http://localhost:4000/getUsuarioByLogin/' + login,
    crossDomain: true
  }).done(function(data) {
    if(!data.length){
      alert('Usuário não encontrado no sistema!');
      limparCampos();
      return;
    }

    if(data[0].Nom_Senha == senha){
      if(data[0].Cod_TipoUsuario == 1){
        window.location.href = 'paginas/homeAdministrador.html';
      }else if(data[0].Cod_TipoUsuario == 2){
        window.location.href = 'paginas/homeDesenvolvedor.html';
      }else if(data[0].Cod_TipoUsuario == 3){
        window.location.href = 'paginas/home.html';
      }
    }else{
      alert('Combinação de usuário e senha incorreta!');
      limparCampos();
      return;
    }

  }).fail(function(data) {
    if(!data.length)
      alert('Ocorreu um erro no servidor, contate o administrador.');
      limparCampos();
  });
}

function limparCampos(){
  $("#clogin").val("");
  $("#csenha").val("");
}

function abreTelaCadastro(){
  window.location.href = 'paginas/cadastro.html';
}

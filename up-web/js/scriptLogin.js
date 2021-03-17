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
    document.getElementById("clogin").focus();
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
      document.getElementById("clogin").focus();
      return;
    }

    if(data[0].Nom_Senha == senha){
      if(data[0].Cod_TipoUsuario == 1){
        window.location.href = 'paginas/homeAdministrador.html';
      }else if(data[0].Cod_TipoUsuario == 2){
        window.location.href = 'paginas/homeDesenvolvedor.html';
      }else if(data[0].Cod_TipoUsuario == 3){
        window.location.href = 'paginas/home.html?Cod_SeqUsuario=' + data[0].Cod_SeqUsuario;
      }
    }else{
      alert('Combinação de usuário e senha incorreta!');
      limparCampos();
      document.getElementById("clogin").focus();
      return;
    }

  }).fail(function(data) {
    if(!data.length)
      alert('Ocorreu um erro no servidor, contate o administrador.');
      limparCampos();
      document.getElementById("clogin").focus();
  });
}

function limparCampos(){
  $("#clogin").val("");
  $("#csenha").val("");
}

function abreTelaCadastro(){
  window.location.href = 'paginas/cadastro.html';
}

function teclaPressionada(e, input){
  if(e.keyCode == 13 && input.id == 'clogin'){
    document.getElementById("csenha").focus();
  }else if(e.keyCode == 13 && input.id == 'csenha'){
    realizaLogin();
  }
}

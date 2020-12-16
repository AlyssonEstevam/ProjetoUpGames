function btnLogin(){
  let login = $('#clogin').val()
  let senha = $('#csenha').val()

  if(!login || !senha){
    alert('Informe o usuário e a senha!')
    return
  }

  $.ajax({
    method: "GET",
    url: 'http://localhost:4000/getUsuarioByLogin/' + login,
    crossDomain: true
  }).done(function(data) {
    if(!data.length){
      alert('Usuário não encontrado no sistema!')
      return
    }

    if(data[0].Nom_Senha == senha){
      window.location.href = 'paginas/home.html';
    }else{
      alert('Combinação de usuário e senha incorreta!')
      return
    }

  }).fail(function(data) {
    if(!data.length)
      alert('Ocorreu um erro no servidor, contate o administrador.')
  });
}


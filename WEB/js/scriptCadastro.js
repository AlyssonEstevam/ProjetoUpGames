function realizaCadastro(){
  let nome = $('#cnome').val()
  let login = $('#clogin').val()
  let senha = $('#csenha').val()

  if(!login || !senha || !nome){
    alert('Informe todos os campos para prosseguir!')
    return
  }

  $.ajax({
    method: "GET",
    url: 'http://localhost:4000/getUsuarioByLogin/' + login,
    crossDomain: true
  }).done(function(data) {
    if(data.length){
      alert('Este login já está cadastrado.')
      return
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


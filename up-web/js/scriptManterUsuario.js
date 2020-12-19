function abreTelaManterJogo(){
    window.location.href = 'manterJogo.html';
}

function abreTelaLogin(){
    window.location.href = '../index.html';
}

function limpaPlaceHolder(input){
    $(input).attr("placeholder", "");
}

function adicionaPlaceHolder(input){
    $(input).attr("placeholder", "DIGITE O FILTRO DE BUSCA...");
}

function teclaPressionada(e){
    if(e.keyCode == 13){
        buscarPorFiltro();
    }
}

function buscarPorFiltro(){
    $('#bodyTabela').html('');

    let model = {
        Cod_Filtro: $('#comboFiltros').val(),
        Nom_Filtro: $('#cfiltro').val()
    }

    if(!model.Nom_Filtro){
        model.Cod_Filtro = 0;
    }

    $.ajax({
        method: "GET",
        url: 'http://localhost:4000/getUsuarioFiltro',
        data: model,
        crossDomain: true,
        dataType: "json"
    }).done(function(data){
        carregaGridResultado(data);
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador.');
        return;
    });
}

function carregaGridResultado(dados){
    dados.forEach(function(x){
        var tr = document.createElement('tr');
        let td = document.createElement('td');

        let textnode = document.createTextNode(x.Cod_SeqUsuario);
        td.appendChild(textnode);
        td.setAttribute('data-codsequsuario', x.Cod_SeqUsuario);
        tr.appendChild(td);
        
        textnode = document.createTextNode(x.Nom_TipoUsuario);
        td = document.createElement('td');
        td.appendChild(textnode);
        td.setAttribute('data-codtipousuario', x.Cod_TipoUsuario);
        td.setAttribute('data-nomtipousuario', x.Nom_TipoUsuario);
        tr.appendChild(td);

        textnode = document.createTextNode(x.Nom_Nome);
        td = document.createElement('td');
        td.appendChild(textnode);
        td.setAttribute('data-nomnome', x.Nom_Nome);
        tr.appendChild(td);

        textnode = document.createTextNode(x.Nom_Login);
        td = document.createElement('td');
        td.appendChild(textnode);
        td.setAttribute('data-nomlogin', x.Nom_Login);
        tr.appendChild(td);

        tr.setAttribute('onclick', 'selecionaUsuario(this);');
        document.getElementById('bodyTabela').appendChild(tr);
    });
}

function selecionaUsuario(linha){
    var model = {
            Cod_SeqUsuario: $(linha).find('[data-codsequsuario]').attr('data-codsequsuario'),
            Cod_TipoUsuario: $(linha).find('[data-codtipousuario]').attr('data-codtipousuario'),
            Nom_TipoUsuario: $(linha).find('[data-nomtipousuario]').attr('data-nomtipousuario'),
            Nom_Nome: $(linha).find('[data-nomnome]').attr('data-nomnome'),
            Nom_Login: $(linha).find('[data-nomlogin]').attr('data-nomlogin')
        }
    
    window.location.href = 'editarUsuario.html?Cod_SeqUsuario=' + model.Cod_SeqUsuario
                           + '&Cod_TipoUsuario=' + model.Cod_TipoUsuario
                           + '&Nom_TipoUsuario=' + model.Nom_TipoUsuario
                           + '&Nom_Nome=' + model.Nom_Nome
                           + '&Nom_Login=' + model.Nom_Login;
}

function abreTelaBuscarUsuario(){
    window.location.href = 'buscarUsuario.html';
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
        url: 'http://localhost:4000/getJogoFiltro',
        data: model,
        crossDomain: true,
        dataType: "json"
    }).done(function(data){
        if(!data.length){
            alert('Nenhum jogo encontrado com o filtro informado!');
            return;
        }
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

        let textnode = document.createTextNode(x.Cod_SeqJogo);
        td.appendChild(textnode);
        td.setAttribute('data-codseqjogo', x.Cod_SeqJogo);
        tr.appendChild(td);

        textnode = document.createTextNode(x.Nom_Nome);
        td = document.createElement('td');
        td.appendChild(textnode);
        td.setAttribute('data-nomnome', x.Nom_Nome);
        tr.appendChild(td);

        textnode = document.createTextNode(x.Nom_Genero);
        td = document.createElement('td');
        td.appendChild(textnode);
        td.setAttribute('data-codgenero', x.Cod_Genero);
        tr.appendChild(td);

        textnode = document.createTextNode(x.Vlr_Preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
        td = document.createElement('td');
        td.appendChild(textnode);
        td.setAttribute('data-vlrpreco', x.Vlr_Preco);
        tr.appendChild(td);

        tr.setAttribute('onclick', 'selecionaJogo(this);');
        document.getElementById('bodyTabela').appendChild(tr);
    });
}

function selecionaJogo(linha){
    var model = {
        Cod_SeqJogo: $(linha).find('[data-codseqjogo]').attr('data-codseqjogo'),
        Nom_Nome: $(linha).find('[data-nomnome]').attr('data-nomnome'),
        Cod_Genero: $(linha).find('[data-codgenero]').attr('data-codgenero'),
        Vlr_Preco: $(linha).find('[data-vlrpreco]').attr('data-vlrpreco')
    }

    window.location.href = 'editarJogo.html?Cod_SeqJogo=' + model.Cod_SeqJogo
                            + '&Nom_Nome=' + model.Nom_Nome
                            + '&Cod_Genero=' + model.Cod_Genero
                            + '&Vlr_Preco=' + model.Vlr_Preco;
}

function abreTelaCadastrarJogo(){
    window.location.href = 'cadastrarNovoJogo.html';
}

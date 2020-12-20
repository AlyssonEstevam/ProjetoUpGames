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
        tr.appendChild(td);

        textnode = document.createTextNode(x.Nom_Genero);
        td = document.createElement('td');
        td.appendChild(textnode);
        tr.appendChild(td);

        textnode = document.createTextNode(x.Vlr_Preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
        td = document.createElement('td');
        td.appendChild(textnode);
        tr.appendChild(td);

        tr.setAttribute('onclick', 'deletaJogo(this);');
        document.getElementById('bodyTabela').appendChild(tr);
    });
}

function deletaJogo(linha){
    var codigoJogo = $(linha).find('[data-codseqjogo]').attr('data-codseqjogo');

    if(confirm("Deseja mesmo deletar o jogo selecionado?")){
        $.ajax({
          method: "DELETE",
          url: 'http://localhost:4000/deleteJogo/' + codigoJogo,
          dataType: "json",
          crossDomain: true
        }).done(function(){
          alert('Jogo deletado com sucesso.')
          $('#bodyTabela').html('');
        }).fail(function() {
          alert('Ocorreu um erro no servidor, contate o administrador.');
        });
      }
}

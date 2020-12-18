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
    let model = {
        Cod_Filtro: $('#comboFiltros').val(),
        Nom_Filtro: $('#cfiltro').val()
    }

    $.ajax({
        method: "GET",
        url: 'http://localhost:4000/getUsuarioFiltro',
        data: model,
        dataType: "json",
        crossDomain: true
    }).done(function(data){
        console.log(data);
    }).fail(function() {
        alert('Ocorreu um erro no servidor, contate o administrador.');
        return;
    });
}
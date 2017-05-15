$( document ).ready(function(){
  $(".button-collapse").sideNav();
});

var cliente = function (nome, email, cep){
    this.nome = nome;
    this.email = email;
    this.cep = cep;

      this.getJson = function(){
        var cliente = this;
        return JSON.stringify(cliente);
      }
};


$('#document').ready(function(){
  $('#btnEnviar').click(function(){
      var cliente = new cliente($('#txtNome').val(), $('#txtEmail').val(), $('#txtCep').val());
      $.ajax({
        url: '/cadastrar',
        type: 'POST',
        dataType: 'text',
        contentType: 'application/json',
        data: cliente.getJson(),
        success: function(){
          console.log('Foi');
        }
      });
  });
});

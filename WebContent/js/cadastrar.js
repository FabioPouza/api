$( document ).ready(function(){
  $(".button-collapse").sideNav();
});

function Cliente(nome, email, cep){
    this.nome = nome;
    this.email = email;
    this.cep = cep;

      this.getJson = function(){
        var cliente = this;
        return JSON.stringify(cliente);
      }
};


$('#document').ready(function(){
  $('#btnEnviar').click(function(e){
      var cliente = new Cliente($('#txtNome').val(), $('#txtEmail').val(), $('#txtCep').val());
      var mydata = cliente.getJson();
      e.preventDefault();
      $.ajax({
        url: '/api/cadastrar',
        type: "POST",
        dataType: 'text',
        contentType: 'application/json',
        data: mydata,
        success: function(){
            console.log('teste');
        }
      });
  });
});

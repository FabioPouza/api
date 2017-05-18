$(document).ready(function(){
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


$(document).ready(function(){
  $('#txtCep').mask('00000-000');
  $('#btnEnviar').click(function(e){
      var cliente = new Cliente($('#txtNome').val(), $('#txtEmail').val(), $('#txtCep').cleanVal());
      var mydata = cliente.getJson();
      e.preventDefault();
      $.ajax({
        url: '/api/cadastrar',
        type: "POST",
        dataType: 'text',
        contentType: 'application/json',
        data: mydata,
        success: function(){
        Materialize.toast('Cadastrado com sucesso!', 3000, 'rounded');
        Apagar();
        }
      });
  });
  $('#btnApagar').click(function(){
    Apagar();
  });
});

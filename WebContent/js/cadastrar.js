$(document).ready(function () {
  $(".button-collapse").sideNav();

  function Cliente(nome, email, cep) {
    this.nome = nome;
    this.email = email;
    this.cep = cep;

    this.getJson = function () {
      var cliente = this;
      return JSON.stringify(cliente);
    }
  };



  $('#txtCep').mask('00000-000');

  $('#btnEnviar').click(function (e) {
    var nome = $('#txtNome').val();
    var email = $('#txtEmail').val();
    var cep = $('#txtCep').cleanVal();
    var erros = [nomeValidator.isValid(nome), emailValidator.isValid(email), cepValidator.isValid(cep)];
    if (erros[0].length == 0 && erros[1] == 0 && erros[2] == 0) {
      var cliente = new Cliente(nome, email, cep);
      var mydata = cliente.getJson();
      e.preventDefault();
      $.ajax({
        url: '/api/cadastrar',
        type: "POST",
        dataType: 'text',
        contentType: 'application/json',
        data: mydata,
        success: function () {
          Materialize.toast('Cadastrado com sucesso!', 3000, 'rounded');
          apagar();
        }
      });
    }
    else {
      Materialize.toast('Preencha os campos corretamente', 3000, 'rounded erros');
    }
  });
  $('#btnApagar').click(function () {
    apagar();
  });
});

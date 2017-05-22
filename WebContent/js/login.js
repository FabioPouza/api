$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

function apagar() {
  var form = $('#ModSenha');
  form.each(function () {
    this.reset();
  });
}

$('#btnModEnviar').click(function () {
  $('.modal').modal('close');
});




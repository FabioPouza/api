$( document ).ready(function(){
  $(".button-collapse").sideNav();
});

$('#btnEnviar').click(function(){
  Materialize.toast('Cadastrado com sucesso', 3000, 'rounded');
});

$('#cadastro').on("submit" ,function(e){
  e.preventDefault();
    $.ajax({
      url: 'cadastrar.html',
      cache: false,
      type: "POST",
      success: function(){
      }
    })
});

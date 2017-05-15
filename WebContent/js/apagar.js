var form = $('#cadastro');
$('#btnApagar').click(function(){
    form.each(function(){
      this.reset();
    });
});

export var clienteValidator = new StringValidator({
   required: true, minValue: 3, maxValue: 45, regex: { isWhiteList: false, expression: /[^a-zA-Z]/ },
   verbose: true, errorMessages: { isPreenchido: 'Preencha o campo!' }
 });

 //var erros = clienteValidator.isValid(nome);

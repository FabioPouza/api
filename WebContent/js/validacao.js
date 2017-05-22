var nomeValidator = new StringValidator({
   required: true, minValue: 3, maxValue: 45, regex: { isWhiteList: false, expression: /[^a-zA-Z]/ },
   verbose: true, errorMessages: { isPreenchido: 'Preencha o campo!' }
 });

var emailValidator = new StringValidator({
   required: true, minValue: 5, maxValue: 45, regex: { isWhiteList: true, expression: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ },
   verbose: true, errorMessages: { isPreenchido: 'Preencha o campo!' }
 });

 var cepValidator = new StringValidator({
   required: true, minValue: 5, maxValue: 45, regex: { isWhiteList: false, expression: /^\\d{5}[-]\\d{3}$/ },
   verbose: true, errorMessages: { isPreenchido: 'Preencha o campo!' }
 });
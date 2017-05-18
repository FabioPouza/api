'use strict';

/**
 * Validator de String.
 *
 * Uso:
 *
 * ```js
 * var userValidator = new StringValidator({
 *   required: true, minValue: 10, maxValue: 256, regex: { isWhiteList: false, expression: /[^a-zA-Z]/ },
 *   verbose: true, errorMessages: { isPreenchido: 'Preencha o campo!' }
 * });
 * ```
 *
 * @param {Object} [options]
 * @param {Boolean} [options.required=true] Se o campo é obrigatório ou não.
 * @param {Boolean} [options.breakOnFirstError=true] Se o validador deve desconsiderar os erros além do
 * primeiro (na ordem isPreenchido, matchesMinValue, matchesMaxValue, matchesRegex, validatorFunction).
 * @param {Number} [options.minValue=0] O valor mínimo para o campo (0 significa nenhum).
 * @param {Number} [options.maxValue=0] O valor máximo para o campo (0 significa nenhum).
 * @param {Object} [options.regex] Objeto que descreve a RegExp que será usada para validar o campo. Pode-se usar
 * também uma RegExp direto.
 * @param {Boolean} [options.regex.isWhiteList=true] Se for true, significa que o valor é inválido se RegExp#test
 * retornar false.
 * @param {RegExp} [options.regex.expression=new RegExp()] A RegExp.
 * @param {Function} [options.validatorFunction=function() { return true }] Uma função própria para chamar
 * adicionalmente à validação. Recebe o valor para validar como parâmetro, e deve retornar de acordo
 * com o options.verbose.
 * @param {Boolean} [options.verbose=false] Define se o validador retorna mensagem de erro ou só Boolean.
 * @param {Object} [options.errorMessages] Objeto que contém as mensagens de erro de cada tipo de validação.
 * @param {String} [options.errorMessages.isPreenchido="Erro no isPreenchido"] Mensagem para quando
 * StringValidator#isPreenchido deveria retorna false.
 * @param {String} [options.errorMessages.matchesMinValue="Erro no matchesMinValue"] Mensagem para quando
 * StringValidator#matchesMinValue deveria retornar false.
 * @param {String} [options.errorMessages.matchesMaxValue="Erro no matchesMaxValue"] Mensagem para quando
 * StringValidator#matchesMaxValue deveria retornar false.
 * @param {String} [options.errorMessages.matchesRegex="Erro no matchesRegex"] Mensagem para quando
 * StringValidator#matchesRegex deveria retornar false.
 */
function StringValidator(options) {
    var opts = this.options = Object.create(options || {});
    if (opts.required !== false) {
        opts.required = true;
    }
    if (opts.breakOnFirstError !== false) {
        opts.breakOnFirstError = true;
    }
    opts.minValue = opts.minValue || 0;
    opts.maxValue = opts.maxValue || 0;
    if (isRegExp(opts.regex)) {
        opts.regex = { expression: opts.regex };
    }
    else {
        opts.regex = Object.create(opts.regex || {});
    }
    if (opts.regex.isWhiteList !== false) {
        opts.regex.isWhiteList = true;
    }
    opts.regex.expression = opts.regex.expression || new RegExp();
    opts.validatorFunction = opts.validatorFunction || function () { return true; };
    opts.verbose = opts.verbose || false;
    opts.errorMessages = Object.create(opts.errorMessages || {});
    opts.errorMessages.isPreenchido = opts.errorMessages.isPreenchido || "Erro no isPreenchido";
    opts.errorMessages.matchesMinValue = opts.errorMessages.matchesMinValue || "Erro no matchesMinValue";
    opts.errorMessages.matchesMaxValue = opts.errorMessages.matchesMaxValue || "Erro no matchesMaxValue";
    opts.errorMessages.matchesRegex = opts.errorMessages.matchesRegex || "Erro no matchesRegex";
    Object.freeze(opts);
}

StringValidator.prototype.isPreenchido = function (s) {
    var valid = true;
    if (this.options.required) {
        if (!s || s.trim() === "") {
            valid = false;
        }
    }
    return this._handleReturn(valid, 'isPreenchido');
};

StringValidator.prototype.matchesMinValue = function (s) {
    var valid = true;
    if (s && this.options.minValue > 0 && s.length < this.options.minValue) {
        valid = false;
    }
    return this._handleReturn(valid, 'matchesMinValue');
};

StringValidator.prototype.matchesMaxValue = function (s) {
    var valid = true;
    if (s && this.options.maxValue > 0 && s.length > this.options.maxValue) {
        valid = false;
    }
    return this._handleReturn(valid, 'matchesMaxValue');
};

StringValidator.prototype.matchesRegex = function (s) {
    var valid = false;
    if (this.options.regex.isWhiteList) {
        valid = this.options.regex.expression.test(s);
    }
    else {
        valid = !this.options.regex.expression.test(s);
    }
    return this._handleReturn(valid, 'matchesRegex');
};

StringValidator.prototype.isValid = function (s) {
    if (this.options.verbose) {
        return this._parseReturns(
            this.isPreenchido(s),
            this.matchesMinValue(s),
            this.matchesMaxValue(s),
            this.matchesRegex(s),
            this.options.validatorFunction(s)
        );
    }
    else {
        return this.isPreenchido(s) && this.matchesMinValue(s) && this.matchesMaxValue(s) &&
            this.matchesRegex(s) && this.options.validatorFunction(s);
    }

};

StringValidator.prototype._parseReturns = function () {
    var errors = [];
    var args = Array.apply(null, arguments);
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (typeof arg === 'string' && arg !== "") {
            errors.push(arg);
            if (this.options.breakOnFirstError) {
                break;
            }
        }
    }
    return errors;
};

StringValidator.prototype._handleReturn = function (success, callersName) {
    return this.options.verbose && success ?
        "" : this.options.verbose ?
            this.options.errorMessages[callersName] :
            success;
};

function isRegExp(param) {
    if (param) {
        return RegExp === param.constructor;
    }
    return false;
}

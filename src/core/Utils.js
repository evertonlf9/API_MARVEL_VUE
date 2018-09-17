/**
 * Created by everton.ferreira on 09/10/2017.
 */
import CryptoMD5 from 'crypto-md5';

"use strict";
var Utils = (function () {

  return {

    loadPage: (_this, status) => {
      _this.$parent.loading = status;

      if(status){
        $('body').attr('style', 'overflow: hidden;');
        return;
      }

      $('body').removeAttr('style');
    },

    getUrlApi: function(){
      return 'https://gateway.marvel.com/v1/public/';
    },

    GenerateHash: function(){

      var publicKey = '6d373fd4ab2cf19d34126b379bfcaa25';
      var privateKey =  '10342adde8b813d874884ddec95e44ec8f5fdbbd';

      var ts = new Date().getTime();
      var hash = CryptoMD5(ts + privateKey + publicKey, 'hex');

      return {
        ts: ts,
        apikey: publicKey,
        hash: hash.toString()
      }
    },

    setTokenCache: function(token){
      window.sessionStorage.setItem( 'keyToken', btoa(token));
    },

    getToken: function(){

      if(window.sessionStorage.getItem('keyToken'))
        return atob(window.sessionStorage.getItem('keyToken'));
      else return null;

    },

    getWindowLocation: function (path) {
      var location = window.location;
      var origin = location.origin ? location.origin + "/" + path : location.protocol + "//" + location.host + "/" + path;
      return origin;
    },
    /**
     * Check if Input is a Valid JSON
     * @param _text                 {String}        Input Text
     * @returns                     {Boolean}
     */
    IsValidJson: function (_text) {
      return _text && (/^[\],:{}\s]*$/.test(_text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
    },

    /**
     * Build URL Using Params
     * @param _url                  {String}        Base URL
     * @param _params               {String}        URL Params
     * @returns                     {String}        Formatted URL
     */
    BuildUrl: function (_url, _params) {
      if (_params === undefined || _params === null)
        return _url;

      if (_params)
        return _url + '?' + Object.keys(_params).map(function(key) {
            return key + '=' + _params[key]
          }).join('&');
      // Object.keys(params).map(key => key + '=' + params[key]).join('&');
      else
        return _url;
    },

    /**
     * Check if Input is a Valid Date
     * @param _date                 {String}        Date in String Format
     * @param _inputFormat          {String=}       Input Date Format (Default is DD/MM/YYYY)
     * @return                      {Boolean}
     */
    IsValidDate: function (_date, _inputFormat) {
      var base = moment(_date, _inputFormat || 'DD/MM/YYYY').format('MM/DD/YYYY'),
        time = new Date(base).getTime(),
        finiteFn = Number.isFinite || isFinite;

      return finiteFn(time);
    },

    /**
     * Check if date is a valid range
     * @param _start                {String}        Start Date in String Format
     * @param _end                  {String}        End Date in String Format
     * @param _inputFormat          {String=}       Input Date Format (Default is DD/MM/YYYY)
     * @param lte                   {Boolean=}      Lower Than Equal
     * @return                      {Boolean}
     */
    IsValidPeriod: function (_start, _end, _inputFormat, lte) {
      var base1 = moment(_start, _inputFormat || 'DD/MM/YYYY').format('MM/DD/YYYY'),
        date1 = new Date(base1),
        base2 = moment(_end, _inputFormat || 'DD/MM/YYYY').format('MM/DD/YYYY'),
        date2 = new Date(base2);

      if (lte) return date1 <= date2;
      else return date1 < date2;
    },

    /**
     * @function Guid for id
     * @name Guid
     * @param
     * @returns {int}
     * @memberOf Utils
     */
    Guid: function __Guid() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });
      return uuid;
    },

    /**
     * Return specific url params
     * @returns                     {string}
     */
    GetUrlParams: function (_params) {
      return decodeURIComponent((new RegExp('[?|&]' + _params + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
    },

    /**
     * @function Get basic url site
     * @name GetWindowLocation
     * @param
     * @returns {object}
     * @memberOf Utils
     */
    GetWindowLocation: function __windowLocation(path) {
      var location = window.location;
      var origin = location.origin ? location.origin + "/" + path : location.protocol + "//" + location.host + "/" + path;
      return origin;
    },

    DowloadFile: function (data, name) {
      var byteArray = new Uint8Array(data);

      var isIE = (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent));

      if (isIE)
        window.navigator.msSaveOrOpenBlob(new Blob([byteArray]), name);
      else {
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
        a.download = name;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },

    /**
     * Rhenan Dinardi - 15/09/2017
     * Faz o handler de notifica��es de erro para o Selo de Estacionamento
     * @param _error                 {Object}        Objeto de erro da requisi��o
     * @param toastr          {Directive}           Elemento da notifica��o
     */
    HandleError: function (_error, toastr) {

      //custom error do fluentValidation, retorna lista de erros
      if (_error && _error.status === 400) {

        var stringMsg = '';
        for (var i = 0; i < _error.data.length; i++) {

          stringMsg = stringMsg + _error.data[i].errorMessage + ' ' + '\n';
        }
        toastr.warning(stringMsg);
        return stringMsg;
      }
      //erro padrao da requisi�ao
      else if (_error && _error.status === 500) {

        toastr.error(_error.data.Message);
      }
    },

    /**
     * N�o permite espa�os como primeiro caractere
     * @param input             {string}
     * @returns                 {string}
     */
    NoSpace: function (input) {
      return (!input || input[0].charCodeAt(0) === 32) ? "" : input;
    },


    /**
     * Fun��o que permite campo receber apenas numero
     * param _el             {Object}            elemento
     * param e               {Object}            event window
     */
    OnlyNumber: function (_el, e) {
      //Inserindo o keyCode da tecla na variavel tecla
      var tecla = (window.event) ? event.keyCode : e.which;

      //Verificando se � um numero
      return ((tecla > 47 && tecla < 58)) ? !(tecla == 48 && _el.value.length == 0) : (tecla == 8 || tecla == 0);
    },

    /**
     * Fun��o que permite campo receber apenas string
     * param _el             {Object}            elemento
     * param e               {Object}            event window
     */
    OnlyString: function (_el, e) {

      //Inserindo express�o na variavel
      var reg = /[a-zA-Z�-��-�]/;

      var char = e.keyCode || e.which;

      //Verificando se o keyCode � igual a 32 e se a quantidade � maior do que 0
      if ((char === 8 || char === 9 || char === 46 || (char >= 32 && char <= 40)) && _el.value.length > 0) return false;

      //Verificando se a express�o � valida
      return !(reg.test(String.fromCharCode(char)));
    },

    /**
     * Converte todas as primeiras letras em mai�scula
     * @param {String} text                     Texto a ser convertido
     */
    Capitalize: function (text) {
      return text.toLowerCase().replace(/\b\w/g, function (t) {
        return t.toUpperCase();
      });
    },

    SetLoggerUser: function (_name, _vision, _usu_id){
      var user = { name: _name, vision: _vision, usu_id : _usu_id }
      window.sessionStorage.user = btoa(JSON.stringify(user));
    },

    /**
     * Criptografa a senha do usuário
     * @param dados: senha do usuário
     * @returns {string}: senha criptografada
     * @constructor
     */
    EncriptaSenha: function __EncriptaSenha(dados){

      var criptografia = "";
      var l, i, caracter;
      var j = 0;
      caracter = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";

      for (i = 0; i < dados.length; i++){
        j++;
        l = ( this.Asc(dados.substr(i,1) ) + (this.Asc(caracter.substr(j,1))) );
        if ( j == 50 ){
          j = 1;
        }//if
        if (l > 255){
          l -= 256;
        }//if
        criptografia += (this.Chr(l));
      }//for
      return criptografia;
    },//EncriptaSenha

  /**
   * Descriptografa a senha do usuário
   * @param dados: senha do usuário
   * @returns {string}: senha criptografada
   * @constructor
   */
  Descripta: function (dados){

    var criptografia="";
    var l, i, caracter;
    var j = 0;

    caracter = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";

    for (i = 0; i < dados.length; i++){
      j++;
      l = (this.Asc(dados.substr(i,1))-(this.Asc(caracter.substr(j,1))) );

      if ( j == 50 ){
        j = 1;
      }//if

      if ( l < 0 ){
        l += 256;
      }//if
      criptografia += (this.Chr(l));
    }//for
    return criptografia;
  },//Descripta

    Asc: function __Asc(String){
    return String.charCodeAt(0);
  },//Asc

  Chr: function __Chr(AsciiNum){
    return String.fromCharCode(AsciiNum);
  }//Chr

  }
})();

export default Utils



/**
 * Created by everton.ferreira on 09/10/2017.
 */
import  Utils from '@/core/Utils'
import CacheHandler from '@/core/http/CacheHandler'
//console.log(Cache);

const BaseHeaders = [
  ["Content-Type", "application/json"]
];

var BASE_URL = "";

export default class BaseRepository{

  constructor(CacheHandler){ }

  /**
   * Set Headers in XHR
   * @param XHR                   {Function}      XGR Instance
   * @param _headers              {Array}         Request Headers
   * @param _customHeaders        {Boolean=}      If true, Doesn't concat Request Headers with Base Headers
   * @returns                     {Function}      XHR Instance
   */
  static SetHeaders(XHR, _headers, _customHeaders) {

    if (Array.isArray(_headers)) {
      if (!_customHeaders) _headers = _headers.concat(BaseHeaders);
      _headers.forEach(function (e) {
        if (Array.isArray(e) && e.length == 2) {
          XHR.setRequestHeader(e[0], e[1]);
        }
      });
    }
    return XHR;
  }

  /**
   * Create a GET Request
   * @param _path                 {String}        Request Path
   * @param _params               {Object}        Request URI Params
   * @param _callback             {Function}      Callback Function
   * @param _headers              {Array=}        Request Headers
   * @param _customHeaders        {Boolean=}      If true, Doesn't concat Request Headers with Base Headers
   * @param _fromCache            {Boolean=}      If true, Try to get Data from Cache
   * @param _cacheType            {Number=}       Cache Type, Default is 0. 0 - Object, 1 - Local Storage and 2 - Session Storage
   * @callback
   */
  static Get (_path, _params, _callback, _headers, _customHeaders, _fromCache, _cacheType){

    var self = this,
      url = Utils.BuildUrl(BASE_URL + _path, _params),
      cachedData,
      baseXHRRequest;
    const key = Utils.getToken();

    baseXHRRequest = function __baseXHRRequest() {
      var XHR = new XMLHttpRequest();
      XHR.open('GET', url, true);
      XHR = self.SetHeaders(XHR, _headers, _customHeaders);

      if (_headers) {
        XHR.setRequestHeader("PageSize", _headers.PageSize);
        XHR.setRequestHeader("CurrentPage", _headers.CurrentPage);
      }

      // if(key){
      //   XHR.setRequestHeader("token", key);
      // }

      XHR.onreadystatechange = self.OnReadyStateChange(_callback, url);
      XHR.send();

    };

    if (_fromCache) {
      cachedData = this.Cache.GetItem(url, _cacheType);

      if (cachedData) {
        _callback(null, cachedData);
        return;
      }
      baseXHRRequest();
    }else {
        baseXHRRequest();
    }
  }

  static Post (_path, _params, _data, _callback, _headers, _customHeaders) {

    var self = this,
      url = Utils.BuildUrl(BASE_URL + _path, _params),
      baseXHRRequest;

    baseXHRRequest = function () {

      var XHR = new XMLHttpRequest();
      XHR.open('POST', url, true);
      XHR = self.SetHeaders(XHR, _headers, _customHeaders);
      XHR.setRequestHeader("Content-Type", "application/json");
      XHR.onreadystatechange = self.OnReadyStateChange(_callback);
      XHR.send(JSON.stringify(_data));
    };

    baseXHRRequest();
  }

  static SetUp (_baseResource) {
    BASE_URL = _baseResource ? ('/' +  _baseResource) : "";
  };

  /**
   * XHR Request Ready State Callback
   * @param _callback             {Function}      Callback Function
   * @param _cacheKey             {String=}       Request URL
   * @callback
   */
  static OnReadyStateChange(_callback, _cacheKey) {

    var self = this;

    return function () {
      var baseResult = {};
      if (this.readyState == 4) {
        baseResult = {
          status: this.status,
          headers: self.FormatResponseHeaders(this.getAllResponseHeaders()),
          rawHeaders: this.getAllResponseHeaders(),
          data: self.FormatResponseText(this.responseText),
          rawData: this.responseText
        };

        if (String(this.status).match(/200|201|204|304/)) {
          CacheHandler.SetItem(_cacheKey, baseResult);
          _callback(null, baseResult);
        }
        else {
          _callback(baseResult);
        }//else
      }//if
    };//function
  }

  /**
   * Format Response Headers
   * @param _rawHeaders           {String}        XHR Raw Response Headers
   * @returns                     {Object}        Object Mapped Response Headers
   */
  static FormatResponseHeaders(_rawHeaders) {
    var headers = _rawHeaders.replace(/\n/g, ","),
      arrH = headers.split(','),
      subArr = [],
      headersOj = {};

    arrH.forEach(function (e) {
      subArr = e.split(': ');
      if (subArr.length == 2) headersOj[subArr[0]] = subArr[1];
    });

    return headersOj;
  }

  /**
   * Format the Response Text from Request
   * @param text              {String}        Input Text
   * @returns                 {String}        Formatted Text (JSON if is valid)
   */
  static FormatResponseText(text) {
    if (Utils.IsValidJson(text)) {
      return JSON.parse(text);
    } else {
      return text;
    }
  }
}

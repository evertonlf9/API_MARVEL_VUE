/**
 * Created by everton.ferreira on 09/10/2017.
 */
import  Utils from '@/core/Utils'

const Config = {
  KEEP_ON_CACHE: false,
  CACHE_TYPE_OBJECT: 0,
  CACHE_TYPE_LOCAL: 0,
  CACHE_TYPE_SESSION: 0
};

export default class CacheHandler{

  constructor(){}

    /**
     * Set Data to Cache
     * @param _key          {String}        Cache Key
     * @param _value        {Mixed}         Cache Data
     * @param _type         {Number=}       Cache Type, Default is 0. 0 - Object, 1 - Local Storage and 2 - Session Storage
     */
  static StorageSetItem (_key, _value, _type) {

      if (!_type || _type == Config.CACHE_TYPE_OBJECT || !this.HasBrowserSupport()) {
        Data[_key] = _value;
      } else if (_type == Config.CACHE_TYPE_LOCAL) {
        localStorage.setItem(_key, _value);
      } else if (_type == Config.CACHE_TYPE_SESSION) {
        sessionStorage.setItem(_key, _value);
      }
  }

    /**
     * Get Data From Cache
     * @param _key          {String}        Cache Key
     * @returns             {Mixed}         Cache Data
     * @param _type         {Number=}       Cache Type, Default is 0. 0 - Object, 1 - Local Storage and 2 - Session Storage
     */
  static StorageGetItem(_key, _type) {
      if (!_type || _type == Config.CACHE_TYPE_OBJECT || !this.HasBrowserSupport()) {
        return Data[_key];
      } else if (_type == Config.CACHE_TYPE_LOCAL) {
        return localStorage.getItem(_key);
      } else if (_type == Config.CACHE_TYPE_SESSION) {
        return sessionStorage.getItem(_key);
      }
  }

  /**
   * Check Browser Compatibility
   * @returns                 {Boolean}
   */
  static HasBrowserSupport() {
    return window.Storage && window.localStorage && window.sessionStorage;
  }

  /**
   * Set Data to Cache
   * @param _key          {String}        Cache Key
   * @param _value        {Mixed}         Cache Data
   * @param _type         {Number=}       Cache Type, Default is 0. 0 - Object, 1 - Local Storage and 2 - Session Storage
   */
  static SetItem(_key, _value, _type) {

      if (Config.KEEP_ON_CACHE) {
        if (typeof _value === 'object') _value = JSON.stringify(_value);
        this.StorageSetItem(_key, _value, _type);
      }
  }

  /**
   * Get Data From Cache
   * @param _key          {String}        Cache Key
   * @returns             {Mixed}         Cache Data
   * @param _type         {Number=}       Cache Type, Default is 0. 0 - Object, 1 - Local Storage and 2 - Session Storage
   */
  static GetItem(_key, _type) {

      if (Config.KEEP_ON_CACHE) {
        var _value = this.StorageGetItem(_key, _type);
        if (Utils.IsValidJson(_value)) _value = JSON.parse(_value);
        return _value;
      } else {
        return undefined;
      }
  }
}

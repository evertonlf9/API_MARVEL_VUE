/**
 * Created by everton.ferreira on 09/10/2017.
 */
import BaseRepository from '@/core/http/BaseRepository'

class http {

  constructor(){}

  static  SetUp (){
    BaseRepository.SetUp('');
  }

  static  get(url, params, headers, callback){
    BaseRepository.Get(url, params, callback, headers);
  }

  static getCustom(url,params, callback, headers, customHeaders, fromCache, cacheType){
    BaseRepository.GetCustom(url, params, callback,  headers, customHeaders, fromCache, cacheType);
  }

  static  post(url,params, data, callback){
    BaseRepository.Post(url,params, data, callback);
  }

  static postCustom(url,params, data, callback, headers, customHeaders){
    BaseRepository.PostCustom(url,params, data, callback, headers, customHeaders);
  }
}

export default http;

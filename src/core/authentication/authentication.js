/**
 * Created by everton.ferreira on 09/10/2017.
 */
import Utils from '@/core/Utils'
import http from '@/core/http/http'

export default class Authentication {

  Autorize(to, from, next) {

    if (to.path != from.path) {
      const key = Utils.getToken();

      if (!key) {
        next({path: '/'});
        return;
      } else if (to.path == '/' && key) {
        next({path: '/home'});
        return;
      }
      next();
    }
  }
}


import Vue from 'vue'
import Router from 'vue-router'
import Authentication from '@/core/authentication/authentication'

import Utils from '@/core/Utils'

//Rotas
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Cadastro from '@/components/cadastro/Cadastro'
import Pesquisa from '@/components/pesquisa/Pesquisa'

Vue.use(Router);

var authentication = new Authentication();

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      beforeEnter: function(to, from, next){
        const key = Utils.getToken();
        if(to.path == '/' && key){
          next({ path: '/characters' });
          return;
        }else{
          next();
        }
      }
    },
    {
      path: '*',
      redirect:'/'
    },
    {
      path: '/characters',
      name: 'Home',
      component: Home,
      beforeEnter: authentication.Autorize
    },
    {
      path: '/cadastro/:id',
      name: 'Cadastro',
      component: Cadastro,
      beforeEnter: authentication.Autorize
    },
    {
      path: '/lista',
      name: 'Lista',
      component: Pesquisa,
      beforeEnter: authentication.Autorize
    }
  ]
});

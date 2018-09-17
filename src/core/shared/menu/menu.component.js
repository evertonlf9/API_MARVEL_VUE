import Router from 'vue-router'
import Utils from '../../Utils'
import imgLogo from '../../../assets/images/logo.png';

export default {
  name: 'Menu',
  props: ['data'],
  data () {
    return {
      isShowMenu: true,
      logo: imgLogo
    }
  },
  methods: {
    loggof: function(){
        window.sessionStorage.clear();
        this.$router.push('/');
    },
    redirectTo: function(path){
      this.$router.push(path);
    }
  }
}

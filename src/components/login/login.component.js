import Utils from '@/core/Utils'
import image from '../../assets/images/marvel.jpg'

export default {
  data () {
    return {
      email: "",
      password: "",
      img: image
    }
  },
  methods: {

    login: function(){
          Utils.setTokenCache(this.email);
          this.$router.push('/characters');
    }
  }
}

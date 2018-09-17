import http from '@/core/http/http';
import Utils from '@/core/Utils';
import MenuNav from '../../core/shared/menu/Menu';
import FooterCustom from '../../core/shared/footer/Footer';
import image from '../../assets/images/marvel.jpg';

// import translate from 'google-translate-api';

export default{
  data () {
    return {
      character: [],
      picture: image
    }
  },
  created(){
    this.getListCharacter(this.$route.params.id);
  },
  methods: {
    getListCharacter(id){
      const self = this;
      var params = Utils.GenerateHash();
      var url = Utils.getUrlApi() + "characters/" + id;
      self.$parent.loading = true;
      http.get( url, params, null, function(err, res){
        self.$parent.loading = false;
        if(err) return;
        if(res.status == 200) {
          self.character = res.data.data.results[0];
          self.apiTranslate(self.character.description);
        }
      })
    },

    getImageCharacter(character){
      if(character.thumbnail)
        return character.thumbnail.path + '.' + character.thumbnail.extension;

      return '';
    },

    apiTranslate(text){

      return text;

      // translate( text, {from: 'en', to: 'pt-br'}).then(res => {
      //   console.log(res.text);
      //   //=> Ik spreek Nederlands!
      //   console.log(res.from.text.autoCorrected);
      //   //=> true
      //   console.log(res.from.text.value);
      //   //=> I [speak] Dutch!
      //   console.log(res.from.text.didYouMean);
      //   //=> false
      // }).catch(err => {
      //   console.error(err);
      // });
    }
  },
  components:{ MenuNav, FooterCustom }

}

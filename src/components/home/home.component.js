import http from '@/core/http/http';
import Utils from '@/core/Utils';
import MenuNav from '@/core/shared/menu/Menu';
import Paginate from '@/core/shared/paginate/Paginate'
import FooterCustom from '@/core/shared/footer/Footer';

export default{
  data () {
    return {
      listCharacters: null,
      character: [],
      limits: [5, 10, 50, 100],
      configs: {
        filter: '',
        limitSelected: 100,
        orderby: 'name'
      },
      paginate: {
        PageSize: 100,
        CurrentPage: 0,
        totalItens: 200
      }
    }
  },
  created(){
    this.getListCharacters();
  },
  computed: {
    list() {
      const filter = this.configs.filter;
      if(this.listCharacters)
        return  this.listCharacters.filter(character => character.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
      return '';
    }
  },
  methods: {
    getImageCharacter(character){
      if(character.thumbnail)
        return character.thumbnail.path + '.' + character.thumbnail.extension;

      return '';
    },

    moreInfoCharacter(character){
      console.log(character);
      this.$router.push('/cadastro/' + character.id);
    },

    orderByCharacters(type){
      this.configs.orderby = type;
      this.getListCharacters();
    },

    getListCharacters(){

      const self = this;
      const params = Utils.GenerateHash();
      this.listCharacters = [];
      // params.offset = this.paginate.CurrentPage;
      params.limit = this.configs.limitSelected;
      params.orderBy = this.configs.orderby;

      let url = Utils.getUrlApi() + "characters";

      if(this.configs.filter){
        params.nameStartsWith = this.configs.filter;
      }

      Utils.loadPage(this, true);
      http.get( url, params, null, function(err, res){
        Utils.loadPage(self, false);
        if(err) return;
        if(res.status == 200) {
          self.listCharacters = res.data.data.results;
          self.paginate.totalItens = res.data.data.total;
        }
      })
    }
  },
  components:{ MenuNav, Paginate, FooterCustom }
}

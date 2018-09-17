/**
 * Created by everton.ferreira on 06/10/2017.
 */
import MenuNav from '@/core/shared/menu/Menu'
import Paginate from '@/core/shared/paginate/Paginate'
import http from '@/core/http/http'

export default{

  data () {
    return {
      show: true,
      modalSize: 'modal-full',
      list: [],
      paginate: {
        PageSize: 10,
        CurrentPage: 0,
        totalItens: 200
      }
    }
  },
  components:{ MenuNav, Paginate },
  methods: {
    search: function(){
      const self = this;
      const toastr = this.$toastr;
      this.$parent.loading = true;

      http.get('http://localhost:3000/api/users', null, this.paginate, function (err, res) {
        self.$parent.loading = false;

        if(err){
          toastr('error', "Erro ao efetuar a pesquisa", "Error");
          return;
        }

        if (res.data.success) {
          self.list = res.data.result;
        } else {
          toastr('error', res.data.message);
        }
      });

    },
    geterverType: function(){

      const self = this;
      const toastr = this.$toastr;
      this.$parent.loading = true;

      http.get('http://localhost:3000/api/getServerType', null, null, function (err, res) {
        self.$parent.loading = false;

        if(err){
          toastr('error', "Erro ao buscar tipo de serveridores", "Error");
          return;
        }

        if (res.data.success) {
          console.log(res.data.result);
        } else {
          toastr('error', res.data.message);
        }
      });

    },
    myOpenFunc: function(){
      console.log('hello');
    },
    openModal: function(Modal){
      var modal = this.$refs[Modal];
      //modal.$el.style.display = 'block';
      modal.open();
    },
    cancelModal:function(Modal){
      var modal = this.$refs[Modal];
      //modal.$el.style.display = 'none';
      modal.close();
    },
    closeModal:function(Modal){
      this.cancelModal(Modal);
    }
  },
  created(){
    this.search();
    this.geterverType();
  }
}

/**
 * Created by everton.ferreira on 17/10/2017.
 */
import Utils from '@/core/Utils'

export default {
  name: 'Pager',
  props: [ 'component', 'arrpagesize', 'callback'],
  data () {
    return {
      totalitens: 0,
      page_size: 10,
      current_page: 0,
      limit_item__page: 0,
      page_nav: 0,
      list_page: [],
      count: 0
    }
  },
  watch:{
    totalItens: function(){
      this.totalitens = this.component.totalItens || 0;
      this.current_page = 0;

      this.page_nav = this.getPageCount() - this.limit_item__page;
      this.forLoop(this.lowerLimit(), this.page_nav, this.getPageCount());
    },
    page_size: function(){
      this.component.PageSize = this.page_size;
      this.change_total_page();
    },
    current_page: function(){
      this.component.CurrentPage = this.current_page;
    }
  },
  created() {
    this.totalitens = this.component.totalItens;
    this.page_size = this.component.PageSize;
    this.limit_item__page = this.component.PageSize;
    this.current_page = this.component.CurrentPage;
    this.page_nav = 0;
    this.forLoop(this.lowerLimit(), this.page_nav, this.getPageCount());
  },
  computed: {
    filteredItems() {

      this.resultCount = this.list_page.length;
      this.current = 0;
      this.totalPages = (this.totalitens / this.page_size);

      if (this.current_page >= this.totalPages) {
        this.current = this.totalPages - 1
      }

      var index = this.current * this.page_size;
      return this.list_page.slice(index, index + this.page_size);

    }
  },
  methods: {

    change_total_page: function(){
      this.current_page = 0;
      this.page_nav = 0;
      this.forLoop(this.lowerLimit(), this.page_nav, this.getPageCount());
      this.callback && this.callback();
    },

    forLoop: function __forLoop(input, start, end) {

      input = new Array(end - start);
      for (var i = 0; start < end; start++, i++) {
        input[i] = start;
      }//for
      this.list_page = input;

    },

    setPage: function(page){

      if (page > this.getPageCount()) {
        return;
      }//if
      this.current_page = page;
      this.callback();

    },

    setLastPage: function(){
      if(!this.isLastPage()) {
        this.current_page = this.getPageCount() - 1;
        this.page_nav = this.getStartItem();
        this.forLoop(this.lowerLimit(), this.page_nav, this.getPageCount());
        this.callback();
      }
    },

    getStartItem: function(){
      var limit = this.getPageCount() - this.limit_item__page;
      if(limit < 0) limit = 0;

      return limit;
    },

    nextPage: function(){

      if (this.isLastPage()) {
        return;
      }//if

      this.current_page++;
      this.callback({ page: this.page_size, size: this.current_page });

      if(this.current_page == this.list_page[this.limit_item__page]){
        this.page_nav++;
        this.forLoop(this.lowerLimit(), this.page_nav, this.getPageCount());
      }//if

    },

    prevPage: function(){
      if (this.isFirstPage()) {
        return;
      }//if

      if(this.current_page == this.list_page[0] && this.current_page > 0){
        this.page_nav--;
        this.forLoop(this.lowerLimit(), this.page_nav, this.getPageCount());
      }//if

      this.current_page--;
      this.callback();

    },

    setFastPage: function __setFastPage() {
      this.current_page = this.getPageCount() - 1;
    },

    setFirstPage: function __setFirstPage() {
      if(!this.isFirstPage()) {
        this.current_page = 0;
        this.page_nav = 0;
        this.forLoop(this.lowerLimit(), this.page_nav, this.getPageCount());
        this.callback();
      }
    },

    isFirstPage: function () {
      return this.current_page == 0;
    },

    isLastPage: function () {
      return this.current_page == this.getPageCount() - 1;
    },

    getPageCount: function () {
      return Math.ceil(parseInt(this.totalitens) / parseInt(this.page_size));
    },

    lowerLimit: function() {

      var pageCountLimitPerPageDiff = this.getPageCount() - this.limit_item__page;

      if (pageCountLimitPerPageDiff < 0) {
        return 0;
      }//if

      if (this.current_page > pageCountLimitPerPageDiff + 1) {
        return pageCountLimitPerPageDiff;
      }//if

      return Math.max((this.current_page - (Math.ceil(this.limit_item__page / 2) - 1)), 0);
    }
  }
}

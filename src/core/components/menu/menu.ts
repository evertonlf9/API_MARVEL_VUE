import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MenuComponent extends Vue {
  currentPage = 'Home';

  created () {
    this.currentPage = this.$route.name || ''
  }

  public handlerKeyPressNextPage (e: any, page: string): void {
    if (e.keyCode === 13) {
      this.handlerClickNextPage(page)
    }
  }

  public handlerClickNextPage (page: any): void {
    this.$router.push('/' + page.key.toLowerCase())
    this.currentPage = page.key
  }
}

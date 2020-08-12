import { Component, Vue } from 'vue-property-decorator'
import Http from '../../core/services/repository'

@Component
export default class Details extends Vue {
  loading = false;
  data: any = null;
  id = '';
  type = '';
  created (): void {
    this.id = this.$router.currentRoute.params.id
    this.type = this.$router.currentRoute.params.type
    this.getData({ type: this.type, offset: 0, limit: 10, id: this.id })
  }

  getData (params: Record<string, any>): void {
    this.loading = true
    Http.get(params).then((result: any) => {
      const { data } = result
      this.loading = false
      this.data = data.results[0]
    },
    () => {
      this.data = []
      this.loading = false
    })
  }

  getTitleCard (): string {
    if (!this.data) return ''
    return (this.data.type === 'story' && this.data.originalIssue && this.data.originalIssue.name) || this.data.name || this.data.title || this.data.fullName
  }

  getDescription (): string {
    if (!this.data) return ''
    return this.data.description || (this.data.type === 'story' && this.data.title) || 'Not description.'
  }

  getImageCard (): string {
    if (!this.data) return ''
    return this.data.thumbnail && `${this.data.thumbnail.path}.${this.data.thumbnail.extension}`
  }

  handlerClickClearSearch (): void {
    this.getData({ type: this.type, offset: 0, limit: 10, id: this.id })
  }

  handlerKeyPressClearSearch (e: any): void {
    if (e.keyCode === 13 && !this.loading) {
      this.handlerClickClearSearch()
    }
  }

  handlerClick (item: any): void {
    const params = item.resourceURI.split('/public')
    this.$router.push(`/details${params[1]}`)
    window.location.reload()
  }
}

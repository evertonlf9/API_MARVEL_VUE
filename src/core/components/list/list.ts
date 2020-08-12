import { Component, Prop, Vue } from 'vue-property-decorator'
import Http from '../../services/repository'

@Component
export default class List extends Vue {
  @Prop() private type!: string;

  loading = false;
  data = null;
  total = 0;
  currenPage = 1;
  paginate: any = {};
  name = '';

  created (): void {
    this.getData({ type: this.type, offset: 0, limit: 10, name: '' })
  }

  getData (params: Record<string, any>): void {
    this.paginate = params
    this.loading = true
    Http.get(params).then((result: any) => {
      const { data } = result
      this.loading = false
      this.data = data.results
      this.total = data.total
    },
    () => {
      this.data = []
      this.loading = false
    })
  }

  onSearch (value: any): void {
    console.log(value)
  }

  getTitleCard (item: any): string {
    return (item.type === 'story' && item.originalIssue && item.originalIssue.name) || item.name || item.title || item.fullName
  }

  getDescription (item: any): string {
    return item.description || (item.type === 'story' && item.title) || 'Not description.'
  }

  getImageCard (item: any): string {
    return `${item.thumbnail.path}.${item.thumbnail.extension}`
  }

  handleChangePagination (offset: number, limit: number): void {
    offset = offset - 1
    this.getData({ ...this.paginate, offset, limit })
  }

  handleChangeSize (current: number, limit: number): void {
    this.getData({ ...this.paginate, limit, offset: 0 })
  }

  handlerClickClearSearch (): void {
    this.name = ''
    this.getData({
      ...this.paginate,
      limit: 10,
      offset: 0,
      name: ''
    })
  }

  handlerKeyPressClearSearch (e: any): void {
    if (e.keyCode === 13 && !this.loading) {
      this.handlerClickClearSearch()
    }
  }

  handlerClickSearch (): void {
    this.getData({ ...this.paginate, name: this.name })
  }

  handlerKeyPressSearch (e: any): void {
    if (e.keyCode === 13 && !this.loading) {
      this.handlerClickSearch()
    }
  }

  handlerKeyPress (e: any): void {
    if (e.keyCode === 13 && !this.loading) {
      this.handlerClickSearch()
    }
  }

  handlerKeyPressMore (item: Record<string, any>, e: any): void {
    if (e.keyCode === 13 && !this.loading) {
      this.handlerClickMore(item)
    }
  }

  handlerClickMore (item: any): void {
    this.$router.push(`/details/${this.paginate.type}/${item.id}`)
  }
}

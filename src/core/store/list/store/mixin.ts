import { mapGetters, mapActions } from 'vuex'
import ListModule, { MODULE_NAME } from './index'

const ListMixin = {
  namespaced: ListModule.namespaced,
  computed: { ...mapGetters(MODULE_NAME, Object.keys(ListModule.getters)) },
  methods: { ...mapActions(MODULE_NAME, Object.keys(ListModule.actions)) }
}

export default ListMixin

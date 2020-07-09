import es from '~/locales/es.json'

export const state = () => ({
  categories: es.categorias
})

export const getters = {
  get (state) {
    return state.categories
  }
}

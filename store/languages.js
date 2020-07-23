export const state = () => ({
  languages: [
    {
      slug: 'es',
      title: 'Español'
    },
    {
      slug: 'ay',
      title: 'Aymara'
    },
    {
      slug: 'qu',
      title: 'Quechua'
    },
    {
      slug: 'gu',
      title: 'Guaraní'
    }
  ]
})

export const getters = {
  get (state) {
    return state.languages
  }
}

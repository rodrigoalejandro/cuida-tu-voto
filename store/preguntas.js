import es from '~/locales/es.json'
import ay from '~/locales/ay.json'
import qu from '~/locales/qu.json'
import gu from '~/locales/gu.json'

export const state = () => ({
  preguntas: {
    es: es.preguntas,
    ay: ay.preguntas,
    qu: qu.preguntas,
    gu: gu.preguntas
  }
})

export const getters = {
  get: state => (lang = 'es') => {
    return state.preguntas[lang]
  }
}

import es from '~/locales/es.json'
import ay from '~/locales/ay.json'
import qu from '~/locales/qu.json'
import gu from '~/locales/gu.json'

export const state = () => ({
  protocolos: {
    es: es.protocolos,
    ay: ay.protocolos,
    qu: qu.protocolos,
    gu: gu.protocolos
  }
})

export const getters = {
  get: state => (lang = 'es') => {
    return state.protocolos[lang]
  }
}

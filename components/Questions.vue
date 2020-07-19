<template>
  <div :class="`${section}--container`">
    <div :class="{ 'Token--fixed': stick }">
      <Social />
      <div class="container grid-lg Category">
        <h2 class="Category--title">
          {{ $t(`${section}.titulo`) }}
        </h2>
      </div>
    </div>
    <div class="container grid-lg Category">
      <div class="has-icon-right Category--search">
        <input
          v-model="search"
          class="form-input input-lg"
          type="search"
          placeholder="Escribe una palabra clave..."
        >
        <span class="form-icon">🔍</span>
      </div>
      <div class="Questions">
        <div
          v-for="(item, key) in items"
          :key="key"
          class="accordion BtnMore"
        >
          <input :id="key" type="radio" name="accordion-radio" hidden>
          <label
            class="accordion-header c-hand btn btn-info"
            :for="key"
            @click="toggle(key)"
          >
            {{ $t(`${section}.items.${key}.titulo`) }} <i class="icon icon-arrow-right mr-1" />
          </label>
          <div class="accordion-body">
            <div class="Response">
              <i18n
                tag="div"
                :path="`${section}.items.${key}.descripcion`"
              >
                <div class="separador" />
                <a v-if="item.link" :href="item.link.url" target="_blank">{{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.link.texto`) }}</a>
                <a v-if="item.link2" :href="item.link2.url" target="_blank">{{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.link2.texto`) }}</a>
                <a v-if="item.link3" :href="item.link3.url" target="_blank">{{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.link3.texto`) }}</a>
                <a v-if="item.link4" :href="item.link4.url" target="_blank">{{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.link4.texto`) }}</a>
                <a v-if="item.link5" :href="item.link5.url" target="_blank">{{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.link5.texto`) }}</a>
              </i18n>
            </div>
          </div>
        </div>
      </div>
      <FooterMenu />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      default: 'preguntas'
    }
  },
  head () {
    this.setMeta()
    return {
      title: this.meta.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta.description },
        { hid: 'url', name: 'url', content: this.meta.url },
        { property: 'og:title', content: this.meta.title },
        { property: 'og:description', content: this.meta.description },
        { property: 'og:url', content: this.meta.url },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: process.env.baseUrl },
        { name: 'twitter:image:alt', content: this.meta.title },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  data () {
    return {
      meta: {
        title: '',
        description: '',
        image: '',
        url: ''
      },
      stick: false,
      search: null,
      title: ''
    }
  },
  computed: {
    items () {
      const items = this.$store.getters[`${this.section}/get`](this.$i18n.locale).items
      if (this.search) {
        const search = this.search.toUpperCase()
        const result = {}
        for (const key in items) {
          if (items[key] && (items[key].titulo.toUpperCase().includes(search) || items[key].descripcion.toUpperCase().includes(search))) {
            result[key] = items[key]
          }
        }
        return result
      }
      return items
    }
  },
  created () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    toggle (key) {
      if (document.getElementById(key).checked) {
        setTimeout(() => {
          document.getElementById(key).checked = false
        }, 1)
      }
    },
    handleScroll () {
      this.stick = window.scrollY > 40
    },
    setMeta () {
      this.meta.title = this.$t('titulo')
      this.meta.description = this.$t(`${this.section}.titulo`)
      this.meta.url = process.env.baseUrl + this.$route.fullPath
    }
  }
}
</script>

<style lang="scss">
@import '../pages/pages.scss';

.Category--search {
  width: 70%;
  margin: 25px auto 25px auto;

  .form-input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding-left: 5px;
  }
  .form-icon {
    font-size: 1rem;
    margin: -5px 10px 0 0;
  }
}

.Response {
  background-color: #ededed;
  padding: 15px 20px;
  font-size: .8rem;
}

@media (max-width: 640px) {
  .preguntas--container {
    .Token--fixed {

      & + .container {
        padding-top: 120px;
      }
    }
  }
  .protocolos--container {
    .Token--fixed {

      & + .container {
        padding-top: 150px;
      }
    }
  }
}
</style>

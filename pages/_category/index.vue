<template>
  <div>
    <div :class="{ 'Token--fixed': stick }">
      <Social :show="false" />
      <div class="container grid-lg Category">
        <h2 class="Category--title">
          {{ $t(`categorias.${section}.titulo`) }}
        </h2>
        <p class="Category--subtitle">
          {{ $t('elegir') }}
        </p>
      </div>
    </div>
    <div v-if="category" class="container grid-lg">
      <div class="Category">
        <div class="columns">
          <div
            v-for="(item, key) in category.items"
            :key="key"
            class="column-category"
          >
            <nuxt-link :to="localePath(`/${section}/${item.enlace}`)">
              <div class="card">
                <div class="card-image">
                  <img
                    :src="item.imagenUrl"
                    :alt="item.imagen"
                  >
                </div>
                <div class="btn btn-primary">
                  {{ $t(`categorias.${section}.items.${key}.titulo`) }}
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="BtnMore">
          <nuxt-link
            :to="localePath(`/${category.botonMas.enlace}`)"
            class="btn btn-info"
          >
            {{ $t(`categorias.${section}.botonMas.titulo`) }}
          </nuxt-link>
        </div>
      </div>
      <FooterMenu />
    </div>
  </div>
</template>

<script>
export default {
  head () {
    this.setMeta()
    return {
      title: this.meta.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta.description },
        { hid: 'image', name: 'image', content: this.meta.image },
        { hid: 'url', name: 'url', content: this.meta.url },
        { property: 'og:title', content: this.meta.title },
        { property: 'og:description', content: this.meta.description },
        { property: 'og:image', content: this.meta.image },
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
      section: this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    }
  },
  computed: {
    category () {
      let categoria = null
      if (this.$store.getters['categories/get'][this.section]) {
        categoria = JSON.parse(JSON.stringify(this.$store.getters['categories/get'][this.section]))
        for (const key in categoria.items) {
          categoria.items[key].imagenUrl = require(`~/assets/images/categorias/${categoria.items[key].imagen}`)
        }
      }

      return categoria
    }
  },
  created () {
    if (!this.$store.getters['categories/get'][this.section]) {
      this.$nuxt.error({ statusCode: 404 })
    }
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
    setMeta () {
      this.meta.title = this.$t('titulo')
      this.meta.description = this.$t(`categorias.${this.section}.titulo`)
      this.meta.url = process.env.baseUrl + this.$route.fullPath
      if (this.category) {
        this.meta.image = process.env.baseUrl + this.category.items.item1.imagenUrl
      }
    },
    handleScroll () {
      this.stick = window.scrollY > 40
    }
  }
}
</script>

<style lang="scss">
@import '../pages.scss';
</style>

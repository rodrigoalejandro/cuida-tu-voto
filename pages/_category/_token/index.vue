<template>
  <div class="Token--container">
    <div :class="{ 'Token--fixed': stick }">
      <Social :title="$t(`categorias.${section}.items.${token.key}.titulo`)" :back="`/${section}`" />
      <div class="container grid-lg Category">
        <h2 class="Category--title">
          {{ $t(`categorias.${section}.items.${token.key}.titulo`) }}
        </h2>
        <p
          v-for="(item, key) in token.fichas"
          v-show="key === currentToken"
          :key="key"
          class="Category--subtitle"
        >
          <span class="avatar avatar-lg info">
            {{ key.replace('item', '') }}
          </span>
          {{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.titulo`) }}
        </p>
        <div class="carousel-nav">
          <label
            v-for="(item, key) in token.fichas"
            :key="key"
            :for="key"
            :class="{ active: currentToken == key }"
            class="nav-item text-hide c-hand"
            @click="setToken(key)"
          >
            {{ key }}
          </label>
        </div>
      </div>
    </div>
    <div class="container grid-lg" :class="{ [classFixed]: !!classFixed }">
      <div class="Category--wraper">
        <div class="carousel">
          <div class="carousel-container">
            <div
              v-for="(item, key) in token.fichas"
              :key="key"
              class="carousel-item Token animate__animated"
              :class="{ [item.animateIn]: !!item.animateIn, [item.animateOut]: !!item.animateOut, up: key === currentToken, down: key !== currentToken }"
            >
              <div class="card">
                <div class="card-body">
                  <div class="Token--column" :class="{ 'Token--reverse': isPair(key) }">
                    <div class="Token--imagen">
                      <figure>
                        <img :src="item.imagenUrl" :alt="item.titulo">
                      </figure>
                    </div>
                    <div class="Token--descripcion">
                      <div class="scroll">
                        <i18n
                          tag="div"
                          :path="`categorias.${section}.items.${token.key}.fichas.${key}.descripcion`"
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
              </div>
            </div>
          </div>
          <div class="carousel-buttons">
            <button
              class="item-prev btn btn-info btn-lg"
              :disabled="currentToken === token.first"
              @click="prev(currentToken)"
            >
              <i class="icon icon-arrow-left" /> Anterior
            </button>
            <button
              class="item-next btn btn-info btn-lg"
              :disabled="currentToken === token.last"
              @click="next(currentToken)"
            >
              Siguiente <i class="icon icon-arrow-right" />
            </button>
          </div>
        </div>
      </div>
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
      currentToken: '',
      classFixed: '',
      section: this.$route.path.split('/')[this.$route.path.split('/').length - 2],
      subsection: this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    }
  },
  computed: {
    token () {
      const items = JSON.parse(JSON.stringify(this.$store.getters['categories/get'][this.section].items))
      for (const key in items) {
        if (items[key].enlace === this.subsection) {
          const keys = Object.keys(items[key].fichas)
          for (const k in items[key].fichas) {
            items[key].fichas[k].animateIn = ''
            items[key].fichas[k].animateOut = ''
            items[key].fichas[k].imagenUrl = require(`~/assets/images/categorias/${items[key].fichas[k].imagen}`)
          }
          return {
            key,
            first: keys[0],
            last: keys[keys.length - 1],
            ...items[key],
            length: keys.length
          }
        }
      }
      return {}
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
  mounted () {
    if (process.browser) {
      if (window.localStorage.getItem('token') && window.localStorage.getItem('lang')) {
        if (this.$i18n.locale !== window.localStorage.getItem('lang')) {
          this.currentToken = window.localStorage.getItem('token')
          window.localStorage.setItem('lang', this.$i18n.locale)
        } else {
          this.currentToken = 'item1'
        }
      } else {
        this.currentToken = 'item1'
      }
    }
  },
  methods: {
    handleScroll () {
      this.stick = window.scrollY > 40
    },
    getIndex (key) {
      const number = parseInt(key.replace('item', ''))
      return this.token.length - number
    },
    isPair (key) {
      const number = parseInt(key.replace('item', ''))
      return number % 2 === 0
    },
    setToken (key) {
      window.localStorage.setItem('lang', this.$i18n.locale)
      window.localStorage.setItem('token', key)
      this.currentToken = key
    },
    prev (key) {
      let number = parseInt(key.replace('item', ''))
      number--
      if (number === 0) {
        number = Object.keys(this.token.fichas).length - 1
      }
      const item = `item${number}`
      this.token.fichas[key].animateOut = ''
      this.token.fichas[key].animateIn = ''
      this.token.fichas[item].animateIn = 'animate__slideInLeft'
      this.setToken(item)
    },
    next (key) {
      let number = parseInt(key.replace('item', ''))
      number++
      if (number > Object.keys(this.token.fichas).length) {
        number = 1
      }
      const item = `item${number}`
      this.token.fichas[key].animateOut = ''
      this.token.fichas[key].animateIn = ''
      this.token.fichas[item].animateIn = 'animate__slideInRight'
      this.setToken(item)
    },
    setMeta () {
      this.meta.title = this.$t('titulo')
      this.meta.description = this.$t(`categorias.${this.section}.items.${this.token.key}.fichas.item1.titulo`)
      this.meta.image = process.env.baseUrl + this.token.fichas.item1.imagenUrl
      this.meta.url = process.env.baseUrl + this.$route.fullPath
    }
  }
}
</script>

<style lang="scss">
@import '../../pages.scss';

.carousel-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.Token {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &.up {
    opacity: 1;
    z-index: 1;
    /* transition: all 1s ease; */
  }

  &.down {
    opacity: 0;
    transition: all .5s ease;
  }

  .card {
    background-color: #ededed;
    margin: 0 0 10px;
  }
}
.Token--container {
  .Category--subtitle {
    margin-bottom: 0;

    .avatar {
      line-height: 2.5rem;
      margin-right: 5px;
    }
  }
}
.Token--column {
  display: flex;
  height: 100%;
}
.Token--reverse {
  flex-direction: row-reverse;
}
.Token--imagen {
  height: 100%;
  width: 50%;
  padding: 0 10px 0 0;

  figure {
    max-height: 100%;
    height: 268px;
    margin: 0;
    border: 2px solid #777;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    max-height: 220px;
  }
}
.Token--descripcion {
  width: 50%;
  padding: 0 10px;
  font-size: .8rem;

  .scroll {
    overflow-y: auto;
    height: 268px;
  }
}
.carousel {
  padding: 0 50px;
  margin-bottom: 20px;
}
.carousel-buttons {
  display: flex;
  justify-content: stretch;

  .btn {
    flex-grow: 1;
    font-size: .75rem;

    .icon {
      margin-top: -1px;
      display: inline-block;
    }
  }
}

.carousel-nav {
  display: flex;
  justify-content: center;
  width: 10rem;
  margin: 0 auto -10px;

  .nav-item {
    color: lighten($info-color, 35%);
    display: block;
    flex: 1 0 auto;
    height: 1.6rem;
    margin: .2rem;
    max-width: 2.5rem;
    position: relative;

    &.active {
      color: $info-color;
    }

    &::before {
      background: currentColor;
      content: "";
      display: block;
      height: .1rem;
      position: absolute;
      top: .5rem;
      width: 100%;
    }
  }
}

@media (max-width: 640px) {
  .carousel {
    padding: 0 5px;
  }
  .carousel-container {
    height: 420px;
  }
  .Token--column {
    flex-direction: column;
  }
  .Token--imagen {
    height: 150px;
    width: 100%;

    img {
      max-height: 100%;
    }

    figure {
      max-width: 250px;
      margin: 0 auto;
      padding: 15px;
    }
  }
  .Token--descripcion {
    margin-top: 15px;
    width: 100%;
    font-size: .75rem;

    .scroll {
      height: 220px;
    }
  }
}
</style>

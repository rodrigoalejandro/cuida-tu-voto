<template>
  <div class="Token--container">
    <Social :title="$t(`categorias.${section}.items.${token.key}.titulo`)" :back="`/${section}`" />
    <div class="container grid-lg Category">
      <h2 class="Category--title">
        {{ $t(`categorias.${section}.items.${token.key}.titulo`) }}
      </h2>
      <div class="Category--wraper">
        <div class="loading loading-lg" />
        <div class="carousel" :class="{ visible }">
          <input
            v-for="(item, key) in token.fichas"
            :id="key"
            :key="key"
            class="carousel-locator"
            type="radio"
            name="carousel-radio"
            :checked="key === 'item1'"
            hidden=""
          >

          <div class="carousel-container">
            <div
              v-for="(item, key) in token.fichas"
              :key="key"
              class="carousel-item Token"
            >
              <label
                class="item-prev btn btn-info btn-lg"
                :for="prev(key)"
                :disabled="key === token.first"
                @click="setToken(prev(key))"
              >
                <i class="icon icon-arrow-left" />
              </label>
              <label
                class="item-next btn btn-info btn-lg"
                :for="next(key)"
                :disabled="key === token.last"
                @click="setToken(next(key))"
              >
                <i class="icon icon-arrow-right" />
              </label>
              <p class="Category--subtitle">
                <span class="avatar avatar-lg info">
                  {{ key.replace('item', '') }}
                </span>
                {{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.titulo`) }}
              </p>
              <div class="card">
                <div class="card-body">
                  <div class="columns" :class="{ 'Tolen--reverse': isPair(key) }">
                    <div class="column col-xs-12 col-sm-6 Token--imagen">
                      <figure>
                        <img class="img-responsive rounded" :src="require(`~/assets/images/categorias/${item.imagen}`)" :alt="item.titulo">
                      </figure>
                    </div>
                    <div class="column col-xs-12 col-sm-6 Token--descripcion">
                      <div class="scroll" v-html="$t(`categorias.${section}.items.${token.key}.fichas.${key}.descripcion`)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-nav">
            <label
              v-for="(item, key) in token.fichas"
              :key="key"
              class="nav-item text-hide c-hand"
              :for="key"
            >
              {{ key }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      section: this.$route.path.split('/')[this.$route.path.split('/').length - 2],
      subsection: this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    }
  },
  computed: {
    token () {
      const items = this.$store.getters['categories/get'][this.section].items
      for (const key in items) {
        if (items[key].enlace === this.subsection) {
          const keys = Object.keys(items[key].fichas)
          return {
            key,
            first: keys[0],
            last: keys[keys.length - 1],
            ...items[key]
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
  },
  mounted () {
    if (process.browser) {
      if (window.localStorage.getItem('token') && window.localStorage.getItem('lang')) {
        if (this.$i18n.locale !== window.localStorage.getItem('lang')) {
          const token = window.localStorage.getItem('token')
          if (document.getElementById(token)) {
            document.getElementById(token).checked = true
            window.localStorage.setItem('lang', this.$i18n.locale)
          }
        }
      }
    }
    setTimeout(() => (this.visible = true), 1000)
  },
  methods: {
    isPair (key) {
      const number = parseInt(key.replace('item', ''))
      return number % 2 === 0
    },
    setToken (key) {
      window.localStorage.setItem('lang', this.$i18n.locale)
      window.localStorage.setItem('token', key)
    },
    prev (key) {
      let number = parseInt(key.replace('item', ''))
      number--
      if (number === 0) {
        number = Object.keys(this.token.fichas).length - 1
      }
      return `item${number}`
    },
    next (key) {
      let number = parseInt(key.replace('item', ''))
      number++
      if (number > Object.keys(this.token.fichas).length) {
        number = 1
      }
      return `item${number}`
    }
  }
}
</script>

<style lang="scss">
@import '../../pages.scss';

.Tolen--reverse {
  flex-direction: row-reverse;
}

.Category--subtitle {
  .avatar {
    line-height: 2.5rem;
    margin-right: 5px;
  }
}

.scroll {
  overflow-y: auto;
  height: 317px;
}

.Token--descripcion {
  font-size: .8rem;
  line-height: 1.5rem;
}

.Token--imagen {
  height: 100%;

  figure {
    max-height: 100%;
    height: 100%;
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

.Token {
  .card {
    height: 350px;
    background-color: #ededed;

    .columns {
      height: 100%;
    }
  }
}

.Category {
  .carousel {
    opacity: 0;
    transition: opacity .3s ease;

    &.visible {
      transition: opacity .3s ease;
      opacity: 1;
    }
  }

  .carousel-container {
    height: 451px;
  }

  .carousel-item {
    padding: 0 65px;
  }

  .carousel .carousel-container {
    .item-prev, .item-next {
      background-color: $info;
      opacity: 1;
      border-radius: 50%;
      width: 52px;
      height: 52px;
      margin-top: 15px;

      .icon {
        margin: 0 0 -5px -5px;
      }

      &[disabled] {
        background-color: lighten($info, 25%);
      }
    }

    .item-prev {
      left: 0;
    }
    .item-next {
      right: 0;
    }
  }

  .carousel .carousel-locator:nth-of-type(1):checked ~ .carousel-nav .nav-item:nth-of-type(1),
  .carousel .carousel-locator:nth-of-type(2):checked ~ .carousel-nav .nav-item:nth-of-type(2),
  .carousel .carousel-locator:nth-of-type(3):checked ~ .carousel-nav .nav-item:nth-of-type(3),
  .carousel .carousel-locator:nth-of-type(4):checked ~ .carousel-nav .nav-item:nth-of-type(4),
  .carousel .carousel-locator:nth-of-type(5):checked ~ .carousel-nav .nav-item:nth-of-type(5),
  .carousel .carousel-locator:nth-of-type(6):checked ~ .carousel-nav .nav-item:nth-of-type(6),
  .carousel .carousel-locator:nth-of-type(7):checked ~ .carousel-nav .nav-item:nth-of-type(7),
  .carousel .carousel-locator:nth-of-type(8):checked ~ .carousel-nav .nav-item:nth-of-type(8) {
    color: $info;
  }
  .carousel .carousel-nav .nav-item {
    color: lighten($info, 35%);
  }
}

.Category--wraper {
  position: relative;

  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
  }
}

@media (max-width: 640px) {
  .Category {
    .carousel {
      margin-bottom: 20px;
    }

    .carousel-container {
      height: 668px;
    }

    .carousel-item {
      padding: 0 10px;
    }
    .Token--imagen {
      height: 220px;

      figure {
        overflow: hidden;
        padding: 10px;
      }
    }
    .Token--descripcion {
      height: auto;
      font-size: .75rem;
      line-height: 1.1rem;

      .scroll {
        padding: 10px 0;
      }
    }
    .Token .card {
      height: auto;
      margin-bottom: 20px;
    }

    .carousel .carousel-container {
      .item-prev, .item-next {
        width: 46px;
        height: 46px;
        opacity: .6;

        .icon {
          font-size: .9rem;
          margin: 0 0 -3px -8px;
        }
      }
    }
  }
}
</style>

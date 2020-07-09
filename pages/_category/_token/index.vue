<template>
  <div class="Token--container">
    <Social />
    <div class="container grid-lg Category">
      <h2 class="Category--title">
        {{ $t(`categorias.${section}.items.${token.key}.titulo`) }}
      </h2>
      <!-- {{ item }} -->

      <div class="carousel">
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
            <label class="item-prev btn btn-info btn-lg" :for="prev(key)"><i class="icon icon-arrow-left" /></label>
            <label class="item-next btn btn-info btn-lg" :for="next(key)"><i class="icon icon-arrow-right" /></label>
            <p class="Category--subtitle">
              <span class="avatar avatar-lg info">
                {{ key.replace('item', '') }}
              </span>
              {{ $t(`categorias.${section}.items.${token.key}.fichas.${key}.titulo`) }}
            </p>
            <div class="card">
              <div class="card-body">
                <div class="columns">
                  <div class="column col-xs-12 col-sm-6 Token--imagen">
                    <figure>
                      <img class="img-responsive rounded" :src="require(`~/assets/images/categorias/${item.imagen}`)" :alt="item.titulo">
                    </figure>
                  </div>
                  <div class="column col-xs-12 col-sm-6 Token--descripcion" v-html="$t(`categorias.${section}.items.${token.key}.fichas.${key}.descripcion`)" />
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
</template>

<script>
export default {
  data () {
    return {
      section: this.$route.path.split('/')[this.$route.path.split('/').length - 2],
      subsection: this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    }
  },
  computed: {
    token () {
      const items = this.$store.getters['categories/get'][this.section].items
      for (const key in items) {
        if (items[key].enlace === this.subsection) {
          return {
            key,
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
  methods: {
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

.Category--subtitle {
  .avatar {
    line-height: 2.5rem;
    margin-right: 5px;
  }
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

</style>

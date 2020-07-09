<template>
  <div>
    <Social />
    <div class="container grid-lg">
      <div class="Category">
        <h2 class="Category--title">
          {{ $t(`categorias.${section}.titulo`) }}
        </h2>
        <p class="Category--subtitle">
          {{ $t('elegir') }}
        </p>
        <div class="columns">
          <div
            v-for="(item, key) in category.items"
            :key="key"
            class="column col-xs-6 col-sm-3"
          >
            <div class="card">
              <div class="card-image">
                <img
                  :src="require(`../../assets/images/categorias/${item.imagen}`)"
                  :alt="item.imagen"
                  class="img-responsive"
                >
              </div>
              <nuxt-link
                :to="localePath(`/${section}/${item.enlace}`)"
                class="btn btn-primary"
              >
                {{ $t(`categorias.${section}.items.${key}.titulo`) }}
              </nuxt-link>
            </div>
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
  data () {
    return {
      section: this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    }
  },
  computed: {
    category () {
      return this.$store.getters['categories/get'][this.section]
    }
  },
  created () {
    if (!this.$store.getters['categories/get'][this.section]) {
      this.$nuxt.error({ statusCode: 404 })
    }
  }
}
</script>

<style lang="scss">
@import '../pages.scss';
</style>

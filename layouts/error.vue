<template>
  <div class="app-error container grid-lg">
    <div>
      <h2>{{ error.statusCode }}</h2>
      <h3 v-if="error.statusCode === 403" v-text="$t('error.403')" />
      <h3 v-else-if="error.statusCode === 404" v-text="$t('error.404')" />
      <h3 v-else v-text="$t('error.500')" />
      <nuxt-link
        :to="localePath('/')"
        class="btn btn-info"
      >
        🏠 {{ $t('error.home') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/_variables.scss';

.app-error {
  padding: 40px 0;
  text-align: center;
  background-color: rgba(255, 255, 255, .8);
  margin-top: 30px;

  h2 {
    font-size: 10rem;
    line-height: 8rem;
    margin: 10px 0;
    // font-family: 'Poppins';
    color: $primary;
  }

  h3 {
    margin: 0 0 30px 0;
    font-size: 1.6rem;
    color: $info;
  }
}
</style>

<template>
  <div class="FooterMenu">
    <nuxt-link
      v-if="this.$route.path.split('/')[this.$route.path.split('/').length - 1] !== 'protocolos'"
      :to="localePath('/protocolos')"
      class="btn btn-link"
    >
      {{ $t('protocolos.titulo') }}
      <img src="~/assets/images/bioseguridad.png" alt="bioseguridad">
    </nuxt-link>
    <span v-else>&nbsp;</span>
    <nuxt-link
      v-if="this.$route.path.split('/')[this.$route.path.split('/').length - 1] !== 'preguntas'"
      :to="localePath('/preguntas')"
      class="btn btn-link"
    >
      {{ $t('preguntas.titulo') }}
      <figure class="avatar avatar-sm info">
        ?
      </figure>
    </nuxt-link>
    <span v-else>&nbsp;</span>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';

.FooterMenu {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;

  .btn {
    font-size: .8rem;
    padding: 0;

    img {
      width: 24px;
      margin-bottom: -7px;
    }

    .avatar {
      background-color: $primary;
      line-height: 1.2rem;
      font-weight: bold;
      font-size: .8rem;
    }
  }
}
@media (max-width: 640px) {
  .FooterMenu {
    margin-bottom: 20px;

    .btn {
      font-size: .7rem;
      line-height: .8rem;
      white-space: normal;
      height: auto;

      &:first-child {
        text-align: left;
      }

      &:last-child {
        text-align: right;

        .avatar {
          text-align: center;
        }
      }
    }
  }
}
</style>

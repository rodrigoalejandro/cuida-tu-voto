<template>
  <div class="FooterMenu">
    <nuxt-link
      :to="localePath('/protocolos')"
      class="btn btn-link"
    >
      {{ $t('protocolos.titulo') }}
      <img src="~/assets/images/bioseguridad.png" alt="bioseguridad">
    </nuxt-link>
    <nuxt-link
      :to="localePath('/preguntas')"
      class="btn btn-link"
    >
      {{ $t('preguntas.titulo') }}
      <figure class="avatar avatar-sm info">
        ?
      </figure>
    </nuxt-link>
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
</style>

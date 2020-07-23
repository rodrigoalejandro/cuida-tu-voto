<template>
  <div>
    <Social :shared="false" />
    <div class="container grid-lg Category">
      <h2 class="Category--title">
        {{ $t('acerca-de.titulo') }}
      </h2>
      <i18n
        tag="div"
        class="AcercaDe--text"
        :path="'acerca-de.descripcion'"
      >
        <div class="separador" />
      </i18n>
      <ul class="AcercaDe--social">
        <li>
          <a :href="`https://www.facebook.com/${$t('acerca-de.redes.facebook')}`" target="_blank">
            <img src="~/assets/images/social/facebook.png" alt="facebook"> /{{ $t('acerca-de.redes.facebook') }}
          </a>
        </li>
        <li>
          <a :href="`https://www.twitter.com/${$t('acerca-de.redes.twitter')}`" target="_blank">
            <img src="~/assets/images/social/twitter.png" alt="twitter"> @{{ $t('acerca-de.redes.twitter') }}
          </a>
        </li>
        <li>
          <a :href="`mailto:${$t('acerca-de.redes.email')}`" target="_blank">
            <i class="icon icon-mail" /> {{ $t('acerca-de.redes.email') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import './pages.scss';

.AcercaDe--text {
  margin-top: 2rem;
  padding: 0 20px;
  text-align: center;
  font-size: .9rem;
  line-height: 1.5rem;

  .separador {
    margin-bottom: .8rem;
  }
}

.AcercaDe--social {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0 30px 0;

  li {
    display: inline-block;
    margin: 0 15px;

    a {
      display: flex;
      align-items: center;
    }
    img {
      width: 24px;
      margin-right: 3px;
    }

    .icon {
      font-size: 1.2rem;
      margin-right: 3px;
    }
  }
}

@media (max-width: 640px) {
  .AcercaDe--social {
    display: block;

    li {
      display: block;
      margin-bottom: 10px;

      a {
        justify-content: center;
      }
    }
  }
}
</style>

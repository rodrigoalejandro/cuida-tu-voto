<template>
  <div class="Social">
    <nuxt-link
      :to="localePath('/')"
      class="btn btn-link"
    >
      🏠 {{ $t('inicio') }}
    </nuxt-link>
    <ul class="Social-list">
      <li><a href=""><img src="~/assets/images/social/facebook.png" alt="facebook"></a></li>
      <li><a href=""><img src="~/assets/images/social/twitter.png" alt="twitter"></a></li>
      <li><a href=""><img src="~/assets/images/social/telegram.png" alt="telegram"></a></li>
      <li><a href=""><img src="~/assets/images/social/whatsapp.png" alt="whatsapp"></a></li>
    </ul>
  </div>
</template>

<style lang="scss">
.Social {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;

  & > .btn {
    margin-top: 5px;
    font-size: .8rem;
  }
}
.Social-list {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: inline-block;

    a {
      display: block;
      width: 24px;
      height: 24px;
      margin: 0 4px;

      img {
        width: 100%;
      }
    }

    &:last-child {
      a {
        margin-right: 0;
      }
    }
  }
}
</style>

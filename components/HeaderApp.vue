<template>
  <header class="Header">
    <div class="Logo">
      &nbsp;
    </div>
    <nuxt-link :to="localePath('/')">
      <h1>{{ $t('titulo') }}</h1>
    </nuxt-link>
        <div class="Logo">
      &nbsp;
    </div>
    <!-- <Lang /> -->
  </header>
</template>

<style lang="scss">
.Header {
  background-color: #011021;
  display: flex;
  justify-content: space-between;

  h1 {
    text-align: center;
    margin: 0;
    color: white;
    font-size: 1.6rem;
    padding: 15px;
  }
}
.Logo {
  width: 150px;
}

@media (max-width: 640px) {
  .Header {
    height: 40px;
  }
  .Logo {
    display: none;
  }
  .Header {
    h1 {
      font-size: .9rem;
      padding: 8px 10px;
      line-height: 24px;
    }
  }
}
</style>

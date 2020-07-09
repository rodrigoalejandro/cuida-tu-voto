<template>
  <header class="Header">
    <div class="Logo">
      &nbsp;
    </div>
    <h1>{{ $t('titulo') }}</h1>
    <Lang />
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
</style>

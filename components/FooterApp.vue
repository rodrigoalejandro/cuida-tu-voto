<template>
  <footer class="Footer">
    <span>{{ new Date().getFullYear() }}</span>
  </footer>
</template>

<style lang="scss">
.Footer {
  padding: 0px 15px;
  text-align: center;
  background-color: #f0f0f0;
  line-height: 32px;
  margin-top: -32px;

  span {
    font-size: .6rem;
    color: #999;
  }
}
</style>

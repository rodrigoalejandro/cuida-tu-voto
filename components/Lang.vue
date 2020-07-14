<template>
  <div class="Lang">
    <div class="dropdown dropdown-right">
      <a
        href=""
        class="btn btn-link dropdown-toggle"
        tabindex="0"
        @click.prevent
      >
        {{ lang }} <i class="icon icon-caret" />
      </a>
      <ul class="menu">
        <li
          v-for="item in languages"
          :key="item.slug"
          class="menu-item"
        >
          <nuxt-link :to="switchLocalePath(item.slug)">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      languages: 'languages/get'
    }),
    lang () {
      if (Array.isArray(this.languages)) {
        for (const item of this.languages) {
          if (item.slug === this.$i18n.locale) {
            return item.title
          }
        }
      }
      return 'Español'
    }
  }
}
</script>

<style lang="scss">
.Lang {
  width: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .dropdown {
    .dropdown-toggle {
      color: #f7d1d5;
      font-size: .9rem;
    }
  }
}
@media (max-width: 640px) {
  .Lang {
    width: auto;

    .dropdown {
      .dropdown-toggle {
        color: #f7d1d5;
        font-size: .8rem;
      }
    }
  }
}
</style>

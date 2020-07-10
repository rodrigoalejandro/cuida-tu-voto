<template>
  <div>
    <Social :title="$t(`${section}.titulo`)" />
    <div class="container grid-lg Category">
      <h2 class="Category--title">
        {{ $t(`${section}.titulo`) }}
      </h2>
      <div class="has-icon-right Category--search">
        <input
          v-model="search"
          class="form-input input-lg"
          type="search"
          placeholder="Escribe una palabra clave..."
        >
        <span class="form-icon">🔍</span>
      </div>
      <div class="Questions">
        <div
          v-for="(item, key) in items"
          :key="key"
          class="accordion BtnMore"
        >
          <input :id="key" type="radio" name="accordion-radio" hidden>
          <label
            class="accordion-header c-hand btn btn-info"
            :for="key"
            @click="toggle(key)"
          >
            {{ $t(`${section}.items.${key}.titulo`) }} <i class="icon icon-arrow-right mr-1" />
          </label>
          <div class="accordion-body">
            <div class="Response">
              {{ $t(`${section}.items.${key}.descripcion`) }}
            </div>
          </div>
        </div>
      </div>
      <FooterMenu />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      default: 'preguntas'
    }
  },
  data () {
    return {
      search: null,
      title: ''
    }
  },
  computed: {
    items () {
      const items = this.$store.getters[`${this.section}/get`](this.$i18n.locale).items
      if (this.search) {
        const search = this.search.toUpperCase()
        const result = {}
        for (const key in items) {
          if (items[key] && (items[key].titulo.toUpperCase().includes(search) || items[key].descripcion.toUpperCase().includes(search))) {
            result[key] = items[key]
          }
        }
        return result
      }
      return items
    }
  },
  methods: {
    toggle (key) {
      if (document.getElementById(key).checked) {
        setTimeout(() => {
          document.getElementById(key).checked = false
        }, 1)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../pages/pages.scss';

.Category--search {
  width: 70%;
  margin: 25px auto 25px auto;

  .form-input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding-left: 5px;
  }
  .form-icon {
    font-size: 1rem;
    margin: -5px 10px 0 0;
  }
}

.Response {
  background-color: #ededed;
  padding: 15px 20px;
  font-size: .8rem;
}
</style>

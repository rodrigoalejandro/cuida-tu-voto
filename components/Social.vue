<template>
  <div class="Social">
    <nuxt-link
      v-if="show && back !== '/'"
      :to="localePath(back)"
      class="btn btn-link"
    >
      <i class="icon icon-back" /> {{ $t('inicio') }}
    </nuxt-link>
    <a v-else-if="show" class="btn btn-link" href="javascript:window.history.back()">
      <i class="icon icon-back" /> {{ $t('inicio') }}
    </a>
    <span v-else>&nbsp;</span>
    <ul v-if="render" class="Social-list">
      <li v-for="item in networks" :key="item">
        <ShareNetwork
          :network="item"
          :url="url"
          :title="title"
          :description="description"
        >
          <img :src="require(`~/assets/images/social/${item}.png`)" :alt="item">
        </ShareNetwork>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    back: {
      type: String,
      default: '/'
    }
  },
  data () {
    return {
      networks: [
        'facebook',
        'twitter',
        'telegram',
        'whatsapp'
      ],
      render: false,
      url: null
    }
  },
  created () {
    if (process.browser) {
      this.url = window.location.href
      this.render = true
    }
  }
}
</script>

<style lang="scss">
.Social {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;

  & > .btn {
    margin-top: 10px;
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
@media (max-width: 640px) {
  .Social {
    padding: 0 15px 0 0;
  }
}
</style>

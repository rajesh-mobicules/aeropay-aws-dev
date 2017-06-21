<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <!-- <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar(!sidebar.opened)">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
        </div> -->
        <div class="nav-left">
          <a class="nav-item hero-brand" href="/">
            <img src="~assets/AP.png" :alt="pkginfo.description">
            
              <!-- <div class="is-hidden-mobile">
                <span class="aeropay">AEROPAY</span>
              </div> -->
            
          </a>
        </div>
        <div class="nav-right is-flex">
          <router-link v-if="!checkAuth" to="/login" class="nav-item">Login</router-link>
          <a v-if="checkAuth" @click="logoutClick" class="nav-item">Logout</a>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip'
import { mapGetters, mapActions } from 'vuex'

export default {

  components: {
    Tooltip
  },

  props: {
    show: Boolean
  },

  computed: mapGetters({
    pkginfo: 'pkg',
    sidebar: 'sidebar',
    checkAuth: 'checkAuth'
  }),

  methods: {
    ...mapActions([
      'toggleSidebar',
      'logout'
    ]),
    logoutClick () {
      this.isLoading = true
      this.logout()
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }

  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}

.hero-brand {
  .aeropay {
    color: #5fc8d8;
    font-family: "futura-pt";
    font-size: 13px;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 2px;
    font-weight: 500;
    font-style: normal;
    line-height: 1em;
  }
}
</style>

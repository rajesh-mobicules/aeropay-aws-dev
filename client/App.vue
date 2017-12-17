<template>
  <div id="app" class="bg">
    <nprogress-container></nprogress-container>
    <template v-if="!inLab">
      <navbar v-show="navbar.show"></navbar>
      <sidebar :show="sidebar.opened && !sidebar.hidden"></sidebar>
    </template>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain, FooterBar } from 'components/layout'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    FooterBar,
    NprogressContainer
  },
  data () {
    return {
      inLab: false
    }
  },
  beforeMount () {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        if (isMobile) this.toggleSidebar(false)
      }
    }
    // setApiClient(this.$store)
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)
  },
  computed: {...mapGetters({
    sidebar: 'sidebar',
    navbar: 'navbar',
    userVerified: 'userVerified',
    c: 'companyVerified'
  })
    // inLab () {
    //   return this.$route.path.startsWith('labs')
    // }
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/labs/analytics') {
        this.inLab = true
      } else {
        this.inLab = false
      }
    }
  },
  methods: mapActions([
    'toggleDevice',
    'toggleSidebar',
    'toggleNavbar'
  ])
}
</script>

<style lang="scss">
@import '~animate.css';
@font-face {
  font-family: "adineue";
  src: url('./assets/adineuePRO-Regular.otf');
}
#app {
  font-family: "adineue", serif;
  text-transform: lowercase;
}

body {
  font-family: "adineue", serif;
}
* {
  font-family: "adineue", serif;
}
::-webkit-input-placeholder { font-family: "adineue", serif; }
::-moz-placeholder { font-family: "adineue", serif; } /* firefox 19+ */
:-ms-input-placeholder { font-family: "adineue", serif;} /* ie */
input:-moz-placeholder { font-family: "adineue", serif; }

.animated {
  animation-duration: .377s;
}

$aeroBlue: #5fc8d8;
// $primary: $aeroBlue;
.bg {
  background-color:#f5f5f5;
}
@import '~bulma';

@import '~wysiwyg.css/wysiwyg.sass';

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

html {
  background-color: whitesmoke;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>

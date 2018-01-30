<template>
  <div id="app" class="bg">
    <nprogress-container></nprogress-container>
    <template v-if="!inLab">
      <navbar v-show="navbar.show"></navbar>
      <sidebar :show="sidebar.opened && !sidebar.hidden && !loadingApi"></sidebar>
    </template>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain, FooterBar } from 'components/layout'
import { mapGetters, mapActions } from 'vuex'
import Vue from "vue"
import * as VueGoogleMaps from "vue2-google-maps"
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB7f0tvwKTYOMkvvQiXszu59G22njKjtZg",
    libraries: "places"
  }
});
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
    c: 'companyVerified',
    inLab: 'inLab',
    loadingApi: 'loadingApi'
  })
    // inLab () {
    //   return this.$route.path.startsWith('labs')
    // }
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
/*@font-face {*/
  /*font-family: "adineue";*/
  /*src: url('./assets/adineuePRO-Regular.otf');*/
/*}*/
@font-face {
font-family: "AdinueProLite";
src: url('./assets/AdinueProLite.otf');
}
#app {
  font-family: "AdinueProLite", serif; font-size: 18px; color: #444444;
  text-transform: lowercase;
  letter-spacing: 0.05px;
}

body {
  font-family: "AdinueProLite", serif; font-size: 18px; color: #444444;
}
* {
  font-family: "AdinueProLite", serif; font-size: 18px; color: #444444;
}
::-webkit-input-placeholder { font-family: "AdinueProLite", serif; font-size: 18px; color: #444444; }
::-moz-placeholder { font-family: "AdinueProLite", serif; font-size: 18px; color: #444444; } /* firefox 19+ */
:-ms-input-placeholder { font-family: "AdinueProLite", serif; font-size: 18px; color: #444444;} /* ie */
input:-moz-placeholder { font-family: "AdinueProLite", serif; font-size: 18px; color: #444444; }

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
.sweet-modal .sweet-title > h2
{
    font-weight: 900 !important;
    text-align: center;
    text-transform: capitalize;
}

#delete-modal .button.is-danger{
  background-color: rgb(63, 63, 63);
  width: 100%;
}

#delete-modal .sweet-action-close

{
  background-color: grey;
  color: white;
  border:3px solid white;
      position: absolute;
      top: -30px;
    right: -25px;
}

#delete-modal .sweet-content
{
  padding:0px;
}

#delete-modal .sweet-modal
{
  overflow:inherit;
}

#delete-modal  .sweet-content-content p
{
padding: 20px
}

#delete-modal .sweet-action-close svg
{
  color:white;
}

.sweet-modal-overlay
{
  background: rgba(0, 0, 0, 0.4) !important;
}

</style>

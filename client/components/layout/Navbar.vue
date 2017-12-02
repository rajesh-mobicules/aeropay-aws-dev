<template>
  <nav class="navbar app-navbar" role="navigation" aria-label="main navigation" style="position: fixed;" >
    <div class="navbar-brand">
      <a class="navbar-item"  href="/">
        <img src="~assets/AP.png" alt="Aero Payments">
      </a>
      <p v-if="checkAuth" class="navbar-item">
          revenue<span class="aero-number">&nbsp;$6200</span>
          &nbsp;&nbsp;&nbsp;transactions <span class="aero-number">&nbsp;49</span>
           &nbsp;&nbsp;&nbsp;this month<span class="aero-number">&nbsp;$5000</span>
        </p>
    </div>

    <div id="navMenu" class="navbar-menu">
      <div class="navbar-end">

        <router-link v-if="!checkAuth" to="/login" class="navbar-item">login</router-link>
        <a v-if="checkAuth" @click="logoutClick" class="navbar-item">logout</a>
      </div>
    </div>
  </nav>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
  },

  props: {
    show: Boolean
  },

  computed: mapGetters({
    pkginfo: "pkg",
    sidebar: "sidebar",
    checkAuth: "checkAuth"
  }),

  methods: {
    ...mapActions(["toggleSidebar", "logout"]),
    logoutClick() {
      this.logout();
      this.$router.push('login');
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "~bulma/sass/utilities/variables";
@import "~bulma";
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
.tooltip .tooltiptext {
  visibility: hidden;
  width: 400px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
.navbar-total {
  margin-right: 300px;
}
.aero-number {
  color: $primary;
  font-size: 25px;
}
</style>

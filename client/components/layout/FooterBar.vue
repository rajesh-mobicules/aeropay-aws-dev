<template>
  <footer class="footer" :class="{'shiftLeft': !sidebar.opened}">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          AERO PAYMENTS, LLC. ALL RIGHTS RESERVED 2017
        </p>
        <p>
          MADE IN CHICAGO, ILLINOIS USA
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {

    data () {
      return this.$store.state.pkg
    },
    computed: {
      ...mapGetters(['sidebar'])
    }
  }
</script>

<style lang="scss">
  // @import '~bulma/sass/utilities/mixins';

  .footer {
    margin-left: 180px;
    // margin-top: 80px;
    font-size: 15px;
    // background-color: #f5f5f5;
    // @include mobile() {
    //   margin-left: 0;
    // }
  }
  .shiftLeft {
    margin-left: 60px;
  }
</style>

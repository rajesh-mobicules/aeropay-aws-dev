<template>
  <footer class="footer">
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
  export default {

    data () {
      return this.$store.state.pkg
    }

  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/mixins';

  .footer {
    margin-left: 180px;

    @include mobile() {
      margin-left: 0;
    }
    

  }
</style>

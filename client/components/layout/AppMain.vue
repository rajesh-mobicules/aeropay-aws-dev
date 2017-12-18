<template>
  <section :class="mainClassName">
    <div class="container is-fluid is-marginless app-content bg">
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  components: {
  },
  computed: {
    ...mapGetters(['inLab']),
    mainClassName() {
      if (!this.inLab) {
        return 'app-main'
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';
@import '~bulma/sass/utilities/mixins';

.app-main {
  padding-top: 50px;
  margin-left: 180px;
  transform: translate3d(0, 0, 0);

  @include mobile() {
    margin-left: 0;
  }

}

.app-content {
  padding: 20px;
}

</style>

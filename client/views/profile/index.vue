<template>
  <div>
    <div class="card">
      <div class="card-content">
        <p class="title p-name">
          {{merchant.firstName}} {{merchant.lastName}}
        </p>
        <span class="sub">
          <i class="fa fa-envelope-o"></i>
          {{merchant.email}}
        </span>
        <span :class="statusClass">
          {{merchant.status}}
        </span>
      </div>
      <footer class="card-footer">
        <router-link to="/profile/basic" class="card-footer-item">
          <span>
            Basic Info
          </span>
        </router-link>
        <router-link to="/profile/locations" class="card-footer-item">
          <span>
            Locations
          </span>
        </router-link>
        <router-link to="/profile/billing" class="card-footer-item">
          <span>
            Billing
          </span>
        </router-link>
      </footer>
      <div class="under-score" :style="{left: offset}"></div>
    </div>
    <br>
    <router-view :merchant="merchant"></router-view>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getProfile } from 'utils/aero_functions'
  export default {
    data () {
      return {
        merchant: {
        }
      }
    },
    beforeMount () {
      getProfile(this.idToken)
        .then(merchant => {
          // console.log(merchant)
          this.merchant = merchant
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      updateProfile () {
        console.log(this.newEmail, this.newBank)
      }
    },
    computed: {
      ...mapGetters(['email', 'idToken']),
      offset () {
        // console.log(this.$route.name)
        if (this.$route.name === 'Locations') return '33.3%'
        if (this.$route.name === 'Billing') return '66.7%'
        else return '0%'
      },
      statusClass () {
        if (this.merchant.status === 'verified') {
          return {
            sub: true,
            'verified': true
          }
        } else {
          return {
            sub: true,
            'not-verified': true
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma';
  .card {
    margin: 0px;
    padding: 0px;
  }
  .p-name {
    display: block;
    margin: 10px 0px 30px 0px;
  }
  .sub {
    display: inline-block;
    margin: 0 20px 0 0;
    color: #8393aa;
  }
  .fa {
    margin-top: 4px;
  }
  .card-footer-item {
    color: #3e4e67;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }
  .router-link-exact-active {
    color: #3e4e67;
  }
  .under-score {
    position: relative;
    height: 3px;
    transition: left .5s cubic-bezier(.23,1,.32,1);
    background-color: $primary;
    width: 33.3%;
  }
  .verified {
    color: $primary;
  }
  .not-verfied {
    color: $danger;
  }

  

</style>

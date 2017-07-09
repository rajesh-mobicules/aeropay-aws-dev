<template>
  <div>
    <div class="card">
      <div class="card-content">
        <p class="title p-name">
          {{merchant.firstName + " " + merchant.lastName}}
        </p>
        <span class="sub">
          <i class="fa fa-envelope-o"></i>
          {{merchant.email}}
        </span>
        <span class="sub">
          {{merchant.status}}
        </span>
      </div>
      <footer class="card-footer">
        <router-link to="/profile/basic" class="card-footer-item">
          <span>
            Basic
          </span>
        </router-link>
        <router-link to="/profile/locations" class="card-footer-item">
          <span to="/profile/locations">
            Locations
          </span>
        </router-link>
        <router-link to="/profile/billing" class="card-footer-item">
          <span>
            Billing
          </span>
        </router-link>
      </footer>
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
        merchant: {}
      }
    },
    beforeMount () {
      getProfile(this.idToken)
        .then(merchant => {
          console.log(merchant)
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
      ...mapGetters(['email', 'idToken'])
    }
  }
</script>

<style lang="scss" scoped>
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
</style>

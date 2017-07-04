<template>
  <div>
    <div class="card">
      <div class="card-content">
        <p class="title">
          Name
        </p>
        <p class="subtitle">
          {{email}}
        </p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            Basic
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            Locations
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            Billing
          </span>
        </p>
      </footer>
    </div>
    <br>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Authorized representative
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          NAME
        </div>
      </div>
    </div>
    <br>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Contact Inforamtion
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p>EMAIL {{email}}</p>
          <p>ADDRESS 1</p>
          <p>ADDRESS 2</p>
          <p>CITY</p>
          <p>STATE</p>
          <p>ZIP</p>
        </div>
      </div>
    </div>
    <br>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Organization
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          COMPANY
        </div>
      </div>
    </div>
    <br>

    <div class="has-text-centered">
      <router-link to="/iav" class="button is-primary" >Change or Add Bank Account</router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        newEmail: '',
        newBank: ''
      }
    },
    mounted () {
      this.newEmail = this.email
    },
    methods: {
      updateProfile () {
        console.log(this.newEmail, this.newBank)
      }
    },
    computed: {
      ...mapGetters(['email'])
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    margin: 0px;
    padding: 0px;

  }
</style>

<template>
  <div>
    <div id="iavContainer"></div>
    <div class="has-text-centered">
      <router-link to="/profile" v-show="showIavProfileButton" class="button is-primary">Go To Profile</router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { refreshIav, dwollaIav } from 'utils/aero_functions'
  export default {
    name: 'iav-page',
    mounted () {
      this.SET_IAV_BUTTON(false)
      refreshIav(this.idToken)
        .then(iavToken => {
          dwollaIav(iavToken, this.SET_FUNDING_SOURCE, this.SET_IAV_BUTTON, this.idToken)
        })
        .catch(err => {
          console.log(err)
          dwollaIav(err, this.SET_FUNDING_SOURCE, this.SET_IAV_BUTTON, this.idToken)
        })
    },
    methods: {
      ...mapMutations([
        'SET_FUNDING_SOURCE',
        'SET_IAV_BUTTON'
      ])
    },
    computed: {
      ...mapGetters(['showIavProfileButton', 'idToken', 'fundingSource'])
    }
  }
</script>

<style scoped>
  /* Implement Dwolla's styles */
  .dwolla-iav-text-box,
  .dwolla-iav-button,
  .dwolla-iav-header,
  .dwolla-iav-text,
  .dwolla-iav-link,
  .dwolla-iav-error,
  .dwolla-iav-label {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 300;
  }

  .dwolla-iav-header {
      font-weight: 300;
      margin-bottom: 2.5rem;
  }

  .dwolla-iav-text-box {
      box-shadow: none;
      border: 1px solid #ddd;
      border-left: 0;
      border-right: 0;
      border-top: 0;
      border-radius: 0;
  }

  .dwolla-iav-text-box:focus {
      border-color: #1e88e5;
  }

  .dwolla-iav-link {
      color: #1e88e5;
      cursor: pointer;
  }

  .dwolla-iav-link:hover {
      color: #1565c0;
  }

  .dwolla-iav-button {
      background: #1e88e5;
      color: white;
      border-radius: 3px;
  }

  .dwolla-iav-button:hover {
      background: #4D8CD4;
      cursor: pointer;
  }

  .dwolla-iav-button:active {
      background: #1565c0;
  }

  .dwolla-iav-check-image {
      background: #1e88e5;
  }

  .dwolla-iav-radio-hover {
      background-color: #fff;
  }

  .dwolla-iav-radio-selected {
      background-color: #1e88e5;
  }
  .form-legend--center {
    color:  red;
    font-size: 100px;
  }
  .dwolla-iav-header {
    color: red;
    font-size: 100;
  }
</style>

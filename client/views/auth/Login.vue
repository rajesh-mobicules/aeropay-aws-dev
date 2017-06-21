<template>
  <div class='app-login'>
    <div class="has-text-centered">
      <img src="~assets/AeroPay.png" alt="aeroPay" class="aeroImg">
      <p class="portal">Merchant Portal</p>
    </div>
    <div class='columns'>
      <div class="box column is-6 is-offset-3">
        <form @submit.prevent="loginClick">
          <div class="field">
            <label class="label">Username</label>
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="text"
              placeholder="example@gmail.com" v-model="data.body.email"
              @blur="evaluateUser"
              :class="{ 'is-danger' : hasUsernameWarning }"
              >
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
              <span class="icon is-small is-right" v-show="data.body.email">
                <i class="fa fa-check"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="hasUsernameWarning">You must enter a username</p>
            <label class="label">Password</label>
            <p class="control has-icons-left">
              <input class="input" type="password"
              placeholder="password" v-model="data.body.password"
              @blur="evaluatePass"
              :class="{ 'is-danger' : hasPassWarning }"
              >
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="hasPassWarning">You must enter a password</p>
            <br>
          </div>
          <p class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="data.rememberMe">
              Remember me
            </label>
          </p>
          <br>
          <input type="submit" v-show="false" class="submit">
          <p class="has-text-centered">
            <a class="signin-button button is-primary" id="submit" type="submit" value="Sign in"
               @click="loginClick" :disabled="disabled"
               :class = "{'is-loading' : isLoading}"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
    <br>
    <br>
    <div class="columns">
      <div class="box has-text-centered column is-6 is-offset-3">
        New to AeroPay? <router-link to="/register">Create an Account Here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { awsAuthenticate } from '../../utils/aws_functions'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      data: {
        body: {
          email: '',
          password: ''
        },
        rememberMe: false
      },
      error: null,
      isLoading: false,
      hasUsernameWarning: false,
      hasPassWarning: false
    }
  },
  beforeMount () {
    this.toggleSidebar(false)
  },
  methods: {
    ...mapActions(['cognitoLogin', 'toggleSidebar']),
    loginClick () {
      if (!this.disabled) {
        this.isLoading = true
        this.cognitoLogin(this.data.body)
          .then(() => {
            this.isLoading = false
            this.$router.push({ path: '/profile' })
          })
          .catch(err => {
            this.err = err
            this.isLoading = false
          })
      }
    },
    evaluateUser () {
      this.hasUsernameWarning = this.data.body.username === ''
    },
    evaluatePass () {
      this.hasPassWarning = this.data.body.password === ''
    }
  },
  computed: {
    disabled () {
      return this.data.body.username === '' || this.data.body.password === ''
    }
  }
  // filters: {
  //   json: function (value) {
  //     console.log(value)
  //     return value
  //   }
  // }

}
</script>

<style lang="scss" scoped>
  .app-login {
    margin-top: 30px;
    margin-left: -100px;
  }
  .is-title {
    text-transform: capitalize;
  }
  .aeroImg {
    height: 45px;
    width: 300px;
    margin-bottom: 10px;
  }
  .portal {
    // font-family: "futura-pt";
    font-family: "Gotham";
    font-size: 32px;
    margin-bottom: 20px;
  }
  #submit {
    width: 200px;
  }
</style>

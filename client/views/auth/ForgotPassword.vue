<template>
  <div class='app-forgot-password'>
    <div class="has-text-centered">
      <img src="~assets/AeroPay.png" alt="aeroPay" class="aeroImg">
    </div>
    <div class='columns'>
      <div class="box column is-4 is-offset-4">
        <form @submit.prevent="submitClick">
          <div class="field email-input">
            <label class="label">
              Enter your email address and we will send you a link to reset your password.
            </label>
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="text"
              placeholder="example@gmail.com" v-model="email"
              >
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
              <span class="icon is-small is-right" v-show="email">
                <i class="fa fa-check"></i>
              </span>
            </p>
            <br>
          </div>
          <p class="help is-danger error has-text-centered" v-show="hasErr">{{errMessage}}</p>
          <br>
          <input type="submit" v-show="false" class="submit">
          <p class="has-text-centered">
            <a class="submit-button button is-primary" id="submit" type="submit" value="Sign in"
               @click="submitClick" :disabled="disabled"
               :class = "{'is-loading' : isLoading}"
            >
            Sent password reset email
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { forgotPassword } from '../../utils/aws_functions'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      hasErr: null,
      errMessage: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions([]),
    submitClick () {
      if (!this.disabled) {
        this.isLoading = true
        forgotPassword(this.email)
        .then(data => {
          this.isLoading = false
          console.log(data)
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
      }
    },
    handleErr (err) {
      this.hasErr = true
      this.errMessage = err.message
    }
  },
  computed: {
    disabled () {
      return this.email === '';
    }
  }

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
    height: 234px;
    width: 234px;
    margin-bottom: 0px;
    margin-top: -60px;
  }
  .portal {
    // font-family: "futura-pt";
    font-family: "Gotham";
    font-size: 32px;
    margin-bottom: 20px;
  }
  #submit {
    display: block;
  }
  .error {
    font-size: 20px;
  }
    input {
  font-family: "AdinueProLite", serif; font-size: 18px; color: #444444;
}
</style>

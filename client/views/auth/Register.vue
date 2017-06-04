<template>
<div id="register-app" class="content">
  <h1 class="title is-bold">Register Your AeroPayments Account</h1>
  <br>
  <br>
    <div class="columns is-vcentered">
    <form @submit.prevent="onSubmit" class="box column is-6 is-offset-3" @keydown="clearErrors($event.target.name)" v-if="!registerSuccess">
      <div class="field">
        <label class="label">Name *</label>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input class="input" type="text" name="fname" placeholder="First Name" v-model="form.fname" autoComplete="on">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="text" name="lname" placeholder="Last Name" v-model="form.lname">
            </p>
          </div>
        </div>
      </div>
      <div class="field">
        <label for="email" class="label">Email Address *</label>
        <p class="control">
          <input type="email" id="email" name="email" class="input" v-model="form.email" required>
        </p>
        <span class="help is-danger" v-if="errors.email">Email address is already taken</span>
      </div>
      <div class="field">
        <label class="label">Address *</label>
        <input type="text" class="input" name="address" v-model="form.address">
        <p>Address 1</p>
        <br>
        <input type="text" class="input" name="address2" v-model="form.address2">
        <p>Address 2</p>
        <br>
        <input type="text" class="input" name="city" v-model="form.city">
        <p>City</p>
        <br>
        <input type="text" class="input" name="state" v-model="form.state">
        <p>State</p>
        <br>
        <input type="text" class="input" name="zipcode" v-model="form.zipcode">
        <p>Zip Code</p>
        <br>
        <input type="text" class="input" name="country" v-model="form.country">
        <p>Country</p>
        <br>
      </div>
      <div class="field">
        <label class="label">Date of Birth *</label>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input type="text" class="input" name="Month" v-model="form.Month">
            </p>
            <span>MM</span>
          </div>
          <div class="field">
            <p class="control">
              <input type="text" class="input" name="Day" v-model="form.Day">
            </p>
            <span>DD</span>
          </div>
          <div class="field">
            <p class="control">
              <input type="text" class="input" name="Year" v-model="form.Year">
            </p>
            <span>YYYY</span>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Last Four Digits of Social Security *</label>
        <div class="control">
          <input type="text" class="input" name="social-security" v-model="form['social-security']">
        </div>
      </div>
      <div class="field">
        <label class="label">Phone Number *</label>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input type="text" class="input" name="phone-area-code" v-model="form['phone-area-code']">
            </p>
            <span>(###)</span>
          </div>
          <div class="field">
            <p class="control">
              <input type="text" class="input" name="phone-local-prefix" v-model="form['phone-local-prefix']">
            </p>
            <span>###</span>
          </div>
          <div class="field">
            <p class="control">
              <input type="text" class="input" name="phone-local-suffix" v-model="form['phone-local-suffix']">
            </p>
            <span>####</span>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Business Type *</label>
        <p class="control">
          <span class="select">
            <select name="businessType" v-model="form['businessType']" required>
              <option v-for="type in bizTypes" :key="type">{{ type }}</option>
            </select>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Business Classification *</label>
        <p class="control">
          <span class="select">
            <select name="select-business-classification-field" required v-model="form['select-business-classification-field']">
              <option v-for="cla in bizClassification" :key="cla">{{ cla }}</option>
            </select>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Business Name *</label>
        <p class="control">
          <input type="text" name="business-name" class="input" v-model="form['business-name']">
        </p>
      </div>
      <div class="field">
        <label class="label">EIN *</label>
        <p class="control">
          <input type="text" name="ein" class="input" v-model="form.ein">
        </p>
      </div>
      <div class="field">
        <label class="label">Doing Business As?</label>
        <p class="control">
          <input type="text" name="dba" class="input" v-model="form.dba" >
        </p>
      </div>
      <div class="control">
        <label for="password" class="label">Password *</label>
        <p class="control">
          <input type="password" id="password" name="password" class="input" v-model="form.password" required>
        </p>
        <span class="help is-danger" v-if="errors.password">Password must be at least 8 characters long.</span>
      </div>
      <div class="control">
        <label for="password_confirmation" class="label">Confim Password *</label>
        <input type="password" id="password_confirmation" name="password_confirmation" class="input" v-model="form.password_confirmation" required>
        <span class="help is-danger" v-if="errors.password_confirmation">Password and confirmation do not match!</span>
      </div>
      <br>
      <br>
      <div class="field">
        <p class="control">
          <label class="checkbox">
            <input type="checkbox" name="authorized" v-model="form.authorized">
            I hereby authorize and accept the Aero Pay Terms of Service and Privacy Policy agreements. I acknowledge this feature is powered by Dwolla and accept their Terms of Service and Privacy Policy agreements.
          </label>
        </p>
      </div>
      <br>
      <br>
      <input type="submit" v-show="false" class="submit">
      <p class="has-text-centered">
        <a class="button is-primary" id="submit"
          :disabled="disabled"
          :class = "{'is-loading' : isLoading}"
          @click="onSubmit"
        >
          Create
        </a>
      </p>
    </form>
    <div class="box column is-6 is-offset-3" v-if="registerSuccess">
      <p>You have successfully registered!</p>
      <br>
      <p>Your usename is: <b>{{form.email}}</b></p>
      <br>
      <br>
      <!-- <div v-html="registerReply"></div> -->
      <div class="has-text-centered">
      <router-link to="/iav" class="button is-primary"> Set up your bank account </router-link>
      </div>
    </div>
  </div>
  <br>
  <br>
  <div class="columns">
    <div class="box has-text-centered column is-6 is-offset-3" v-if="!registerSuccess">
      Already have an account? <router-link to="/login"> Sign in </router-link>
    </div>
  </div>
</div>
</template>

<script>
  import { Form } from '../../utils/Form'
  import { awsRegister } from '../../utils/aws_functions'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'register-app',
    data () {
      return {
        form: new Form({
          email: '',
          password: '',
          password_confirmation: '',
          fname: '',
          lname: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          Year: '',
          Month: '',
          Day: '',
          'social-security': '',
          'phone-area-code': '',
          'phone-local-prefix': '',
          'phone-local-suffix': '',
          'businessType': '',
          'select-business-classification-field': '',
          'business-name': '',
          ein: '',
          dba: '',
          authorized: false
        }),
        bizTypes: ['corporation', 'llc', 'partnership', 'soleproprietorship'],
        bizClassification: ['Gourmet foods', 'Distilleries', 'Breweries', 'Alcoholic beverage drinking places', 'Beer, wine, and liquor store', 'Wineries', 'Tobacco', 'Restaurant', 'Supplement store', 'Pharmacy and drugstore', 'Coffee and tea', 'Catering services', 'Specialty and miscellaneous food store'],
        errors: {
          email: false,
          password_confirmation: false,
          password: false
        },
        isLoading: false,
        registerSuccess: false,
        registerReply: ''
      }
    },
    methods: {
      ...mapActions(['loginAndRegMerchant']),
      ...mapMutations(['SET_IAV']),
      onSubmit () {
        if (this.form.password !== this.form.password_confirmation) {
          this.errors.password_confirmation = true
        } else {
          this.isLoading = true
          this.form.submit(awsRegister)
            .then(response => {
              this.onSuccess(response)
            })
            .catch(error => {
              this.onFail(error)
            })
        }
      },
      resolveData (data) {
        this.isLoading = false
        this.registerSuccess = true
        console.log(data.iavToken)
        this.SET_IAV(data.iavToken)
      },
      onSuccess (response) {
        console.log(response)
        this.loginAndRegMerchant(this.form)
          .then(data => {
            this.resolveData(data)
          })
          .catch(err => {
            this.isLoading = false
            console.log(err)
          })
      },
      onFail (error) {
        if (error.code === 'UsernameExistsException') {
          // this.errors.email = true
          // regMerchant()
          this.loginAndRegMerchant(this.form)
            .then(res => {
              this.resolveData(res)
            })
            .catch(err => {
              this.isLoading = false
              console.log(err)
            })
        } else if (error.code === 'InvalidPasswordException') {
          this.errors.password = true
          this.isLoading = false
        } else {
          console.log(error.code)
          this.isLoading = false
        }
      },
      clearErrors (field) {
        if (field === 'password') this.errors['password_confirmation'] = false
        this.errors[field] = false
      }
    },
    computed: {
      disabled () {
        return this.errors.email || this.errors.password_confirmation || this.errors.password
      }
    }
  }
</script>

<style lang="scss" scoped>
#register-app {
  margin-top: 40px
}
.title {
  text-align: center;
}
#submit {
  width: 200px
}

</style>

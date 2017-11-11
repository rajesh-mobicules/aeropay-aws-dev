<template>
<div class="register-app content">
  <div class="has-text-centered">
    <img src="~assets/AeroPay.png" alt="aeroPay" class="aeroImg">
    <!-- <p class="portal">Register</p> -->
  </div>
  <div class="columns is-vcentered">
    <form @submit.prevent="onSubmit" class="box column is-6 is-offset-3" @keydown="clearErrors($event.target.name)" v-if="!registerSuccess">
      <div class="field">
        <label class="label">Name</label>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input class="input" type="text" name="fname" placeholder="First Name" v-model="form.fname" autoComplete="on">
              <span class="help is-danger" v-if="errors.fname !== null">{{errors.fname}}</span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="text" name="lname" placeholder="Last Name" v-model="form.lname">
              <span class="help is-danger" v-if="errors.lname !== null">{{errors.lname}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="field">
        <label for="email" class="label">Email Address</label>
        <p class="control">
          <input type="email" id="email" name="email" class="input" v-model="form.email" >
        </p>
        <span class="help is-danger" v-if="errors.email !== null">{{errors.email}}</span>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <input type="text" class="input" name="address" v-model="form.address" >
        <p>Address 1</p>
        <span class="help is-danger" v-if="errors.address !== null">{{errors.address}}</span>
        <input type="text" class="input" name="address2" v-model="form.address2">
        <p>Address 2 <span class="extra-info">(optional)</span></p>
        <input type="text" class="input" name="city" v-model="form.city">
        <p>City</p>
        <span class="help is-danger" v-if="errors.city !== null">{{errors.city}}</span>
      </div>
        <!-- <input type="text" class="input" name="state" v-model="form.state"> -->
      <div class="field is-grouped">

        <div class="control ">
          <span class="select">
            <select name="state" v-model="form.state" @click="clearErrors('state')">
              <option v-for="s in states" :key="s">{{ s }}</option>
            </select>
            <span>State</span>
            <span class="help is-danger" v-if="errors.state !== null">{{errors.state}}</span>
          </span>
        </div>
        <br>
        <div class="control">
          <cleave class="input" :options="{ blocks: [5], numericOnly: true }" name="zipcode" v-model="form.zipcode"></cleave>
          <span>Zip Code</span>
          <span class="help is-danger" v-if="errors.zipcode !== null">{{errors.zipcode}}</span>
        </div>
        <br>

        <br>
      </div>
      <div class="field">
        <div class="control">
          <!-- <input type="text" class="input" name="country" v-model="form.country" > -->
          <span class="select">
            <select name="country" v-model="form.country" @click="clearErrors('country')">
              <option v-for="c in countryNames" :key="c">{{ c }}</option>
            </select>
          </span>
          <p>Country</p>
          <span class="help is-danger" v-if="errors.country !== null">{{errors.country}}</span>
        </div>
      </div>
      <div class="field">
        <label class="label">Date of Birth</label>
        <span class="help is-danger" v-if="errors.DOB !== null">{{errors.DOB}}</span>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <cleave class="input" :options="{ blocks: [2], numericOnly: true }" name="Month" v-model="form.Month"></cleave>
            </p>
            <span>MM</span>
          </div>
          <div class="field">
            <p class="control">
              <!-- <input type="text" class="input" name="Day" v-model="form.Day"> -->
              <cleave class="input" :options="{ blocks: [2], numericOnly: true }" name="Day" v-model="form.Day"></cleave>
            </p>
            <span>DD</span>
          </div>
          <div class="field">
            <p class="control">
              <!-- <input type="text" class="input" name="Year" v-model="form.Year"> -->
              <cleave class="input" :options="{ blocks: [4], numericOnly: true }" name="Year" v-model="form.Year"></cleave>
            </p>
            <span>YYYY</span>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Last Four Digits of Social Security</label>
        <div class="control">
          <!-- <input type="text" class="input" name="social-security" v-model="form['social-security']"> -->
          <cleave class="input" :options="{ blocks: [4], numericOnly: true }" name="social-security" v-model="form['social-security']"></cleave>
          <span class="help is-danger" v-if="errors['social-security'] !== null">{{errors['social-security']}}</span>
        </div>
      </div>
      <div class="field">
        <label class="label">Phone Number</label>
        <span class="help is-danger" v-if="errors.phone !== null">{{errors.phone}}</span>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <cleave class="input" :options="{ blocks: [3], numericOnly: true }" name="phone-area-code" v-model="form['phone-area-code']"></cleave>
            </p>
            <span>###</span>
          </div>
          <div class="field">
            <p class="control">
              <!-- <input type="text" class="input" name="phone-local-prefix" v-model="form['phone-local-prefix']"> -->
              <cleave class="input" :options="{ blocks: [3], numericOnly: true }" name="phone-local-prefix" v-model="form['phone-local-prefix']"></cleave>
            </p>
            <span>###</span>
          </div>
          <div class="field">
            <p class="control">
              <!-- <input type="text" class="input" name="phone-local-suffix" v-model="form['phone-local-suffix']"> -->
              <cleave class="input" :options="{ blocks: [4], numericOnly: true }" name="phone-local-suffix" v-model="form['phone-local-suffix']"></cleave>
            </p>
            <span>####</span>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Business Type</label>
        <p class="control">
          <span class="select">
            <select name="businessType" v-model="form['businessType']" @click="clearErrors('businessType')">
              <option v-for="type in bizTypes" :key="type">{{ type }}</option>
            </select>
            <span class="help is-danger" v-if="errors.businessType !== null">{{errors.businessType}}</span>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Business Classification</label>
        <p class="control">
          <span class="select">
            <select name="select-business-classification-field" v-model="form['select-business-classification-field']" @click="clearErrors('select-business-classification-field')">
              <option v-for="cla in buizClassifications.buizClassNames" :key="cla">{{ cla }}</option>
            </select>
            <span class="help is-danger" v-if="errors['select-business-classification-field'] !== null">{{errors['select-business-classification-field']}}</span>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Industry Classification</label>
        <p class="control">
          <span class="select">
            <select name="select-industry-classification-field" v-model="form['select-industry-classification-field']" @click="clearErrors('select-industry-classification-field')">
              <option v-for="cla in industryClassifications" :key="cla">{{ cla }}</option>
            </select>
            <span class="help is-danger" v-if="errors['select-industry-classification-field'] !== null">{{errors['select-industry-classification-field']}}</span>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Business Name <span class="extra-info">(official name as listed with state)</span></label>
        <p class="control">
          <input type="text" name="business-name" class="input" v-model="form['business-name']">
          <span class="help is-danger" v-if="errors['business-name'] !== null">{{errors['business-name']}}</span>
        </p>
      </div>
      <div class="field">
        <label class="label">EIN</label>
        <p class="control">
          <!-- <input type="text" name="ein" class="input" v-model="form.ein"> -->
          <cleave class="input" :options="{ delimiter: '-', blocks: [2, 7], numericOnly: true }" name="ein" v-model="form.ein"></cleave>
          <span class="help is-danger" v-if="errors.ein !== null">{{errors.ein}}</span>
        </p>
        <span>Ex. 12-3456789</span>
      </div>
      <div class="field">
        <label class="label">Doing Business As</label>
        <p class="control">
          <input type="text" name="dba" class="input" v-model="form.dba" >
          <span class="help is-danger" v-if="errors.dba !== null">{{errors.dba}}</span>
        </p>
      </div>
      <div class="field">
        <label for="password" class="label">Password
          <div class="tooltip"> ?
            <span class="tooltiptext">{{passwordErrorMessage}}</span>
          </div>
        </label>
        <p class="control">
          <input type="password" id="password" name="password" class="input" v-model="form.password" >
        </p>
        <span class="help is-danger" v-if="errors.password !== null">{{errors.password}}</span>
      </div>
      <div class="field">
        <label for="passwordConfirmation" class="label">Confim Password</label>
        <p class="control">
          <input type="password" id="passwordConfirmation" name="passwordConfirmation" class="input" v-model="form.passwordConfirmation" >
        </p>
        <span class="help is-danger" v-if="errors.passwordConfirmation !== null">{{errors.passwordConfirmation}}</span>
      </div>
      <br>
      <br>
      <div class="field">
        <p class="control">
          <label class="checkbox">
            <input type="checkbox" name="authorized" v-model="form.authorized" @click="clearErrors('authorized')">
            <span>I hereby authorize and accept the Aero Payments Terms of Service and Privacy Policy agreements. I acknowledge this feature is powered by Dwolla and accept their Terms of Service and Privacy Policy agreements.</span>
            <p><br><b>For more details, please refer to:</b></p>
            <p>
              <a href="https://www.aeropayments.com/terms-of-service">Aero Payments Terms of Service</a>
            </p>
            <p>
              <a href="https://www.aeropayments.com/privacy-policy">Aero Payments Privacy Policy</a>
            </p>
            <p>
              <a href="https://www.dwolla.com/legal/tos/">Dwolla Legal TOS</a>
            </p>
            <p>
              <a href="https://www.dwolla.com/legal/privacy/">Dwolla Privarcy Policy</a>
            </p>
          </label>
          <span class="help is-danger" v-if="errors.authorized !== null">{{errors.authorized}}</span>
        </p>
      </div>
      <br>
      <br>
      <span class="help is-danger" v-if="disabled && errors.overall === null">You have entered invalid values!</span>
      <span class="help is-danger" v-if="disabled && errors.overall !== null">{{errors.overall}}</span>
      <input type="submit" v-if="false">
      <p class="has-text-centered">
        <a class="button is-primary" id="submit"
          :disabled="disabled"
          :class = "{'is-loading' : isLoading}"
          @click="onSubmit"
        >Create</a>
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
  import { mapActions } from 'vuex'
  import Cleave from 'vue-cleave'
  import statesHash from 'utils/states_hash.json'
  import buizClaz from 'utils/APIv2BusinessClassificationIds.json'
  var countries = require('country-list')()

  export default {
    name: 'register-app',
    components: {
      Cleave
    },
    data () {
      return {
        form: new Form({
          email: '',
          password: '',
          passwordConfirmation: '',
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
          'select-industry-classification-field': '',
          'business-name': '',
          ein: '',
          dba: '',
          authorized: false
        }),
        bizTypes: ['corporation', 'llc', 'partnership', 'soleproprietorship'],
        bizClassification: ['Gourmet foods', 'Distilleries', 'Breweries', 'Alcoholic beverage drinking places', 'Beer, wine, and liquor store', 'Wineries', 'Tobacco', 'Restaurant', 'Supplement store', 'Pharmacy and drugstore', 'Coffee and tea', 'Catering services', 'Specialty and miscellaneous food store'],
        errors: {
          email: null,
          passwordConfirmation: null,
          password: null,
          zipcode: null,
          ein: null,
          DOB: null,
          'social-security': null,
          phone: null,
          city: null,
          address: null,
          state: null,
          country: null,
          businessType: null,
          'select-business-classification-field': null,
          'select-industry-classification-field': null,
          'business-name': null,
          authorized: null,
          dba: null,
          fname: null,
          lname: null,
          overall: null
        },
        formHasError: false,
        isLoading: false,
        registerSuccess: false,
        registerReply: '',
        passwordErrorMessage: 'Passwords must be at least 8 characters long, containg 1 capital letter and 1 number'
      }
    },
    beforeMount () {
      this.toggleSidebar(false)
    },
    methods: {
      ...mapActions(['loginAndRegMerchant', 'toggleSidebar']),
      onSubmit () {
        this.validateForm()
        if (!this.disabled) {
          this.isLoading = true
          const industryName = this.form['select-industry-classification-field']
          this.form['select-industry-classification-field'] = this.buizClassifications.industryDict[industryName]
          // console.log(this.form.data())
          awsRegister(this.form.data())
            .then(response => {
              this.onSuccess(response)
            })
            .catch(err => {
              this.onFail(err)
            })
        }
      },
      resolveData (data) {
        this.isLoading = false
        this.registerSuccess = true
      },
      onSuccess (response) {
        // console.log(response)
        this.loginAndRegMerchant(this.form)
          .then(data => {
            this.resolveData(data)
          })
          .catch(err => {
            this.handleError(err)
          })
      },
      handleError (err) {
        this.isLoading = false
        this.errors.overall = err.error
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
              this.handleError(err)
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
        // console.log(field)
        this.errors.overall = null
        if (field === 'Month' || field === 'Year' || field === 'Year') {
          this.errors.DOB = null
        } else if (field === 'phone-area-code' || field === 'phone-local-prefix' || field === 'phone-local-suffix') {
          this.errors.phone = null
        } else {
          this.errors[field] = null
        }
        // if (field === 'password') this.errors['passwordConfirmation'] = false
        // this.errors[field] = false
      },
      validateForm () {
        // const { email, password, passwordConfirmation, zipcode, Year, Month, Day } = this.form
        const {zipcode, ein, email, Month, Year, Day, password, passwordConfirmation, fname, lname, address, city, state, country, businessType, authorized, dba} = this.form
        if (zipcode.length !== 5) {
          this.errors.zipcode = 'Zipcode must has five digits!'
        }
        if (ein.length !== 10) {
          this.errors.ein = 'EIN number is not correct!'
        }
        if (ein === '12-3456789') {
          this.errors.ein = 'EIN cannot be 12-3456789!'
        }
        if (!this.validateEmail(email)) {
          this.errors.email = 'Email address is not valid!'
        }
        if (Month > 12 || Month < 1 || Day < 1 || Day > 31 || Year < 1900 || Year > 2017) {
          this.errors.DOB = 'DOB is not valid!'
        }
        if (this.form['social-security'].length !== 4) {
          this.errors['social-security'] = 'You must enter your last 4 digits of social security number!'
        }
        if (password.length < 8) {
          this.errors.password = this.passwordErrorMessage
        }
        if (passwordConfirmation !== password) {
          this.errors.passwordConfirmation = 'Passwords are not the same!'
        }
        if (this.form['phone-area-code'].length !== 3 || this.form['phone-local-prefix'].length !== 3 || this.form['phone-local-suffix'].length !== 4) {
          this.errors.phone = 'Phone number is not correct!'
        }
        if (fname.length < 1) this.errors.fname = 'Please enter your frist name!'
        if (lname.length < 1) this.errors.lname = 'Please enter your last name'
        if (address.length < 1) this.errors.address = 'please enter your address'
        if (city.length < 1) this.errors.city = 'please enter the city name'
        if (state.length < 1) this.errors.state = 'please chose a state'
        if (country.length < 1) this.errors.country = 'Please enter your country name'
        if (businessType.length < 1) this.errors.businessType = 'Please select your business type'
        if (businessType.length < 1) this.errors.businessType = 'Please select your business type'
        // console.log(authorized)
        if (this.form['select-business-classification-field'].length < 1) {
          this.errors['select-business-classification-field'] = 'Please select your business classification field'
        }
        if (this.form['business-name'].length < 1) {
          this.errors['business-name'] = 'Please enter your business name'
        }
        if (dba.length < 1) {
          this.errors.dba = 'Please enter this field'
        }
        if (!authorized) {
          this.errors.authorized = 'Please confirm that you authrize Aeropay terms of service'
        }
      },
      validateEmail (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      }
    },
    computed: {
      disabled () {
        for (let key in this.errors) {
          if (this.errors[key] !== null) return true
        }
        return false
      },
      states () {
        const ss = []
        for (let s in statesHash) {
          ss.push(s)
        }
        // console.log(ss)
        return ss
      },
      countryNames () {
        const cs = []
        cs.push('United States')
        const names = countries.getNames()
        for (let c in countries.getNames()) {
          if (c !== 'United States') {
            cs.push(names[c])
          }
        }
        return cs
      },
      buizClassifications () {
        const bs = []
        const is = {}
        const industryDict = {}
        const buizClazFic = buizClaz['_embedded']['business-classifications']

        for (let i = 0; i < buizClazFic.length; i++) {
          // console.log(buizClazFic[i])
          let name = buizClazFic[i]['name']
          bs.push(name)
          let indusClazFic = buizClazFic[i]['_embedded']['industry-classifications']
          // console.log(indusClazFic)
          for (let j = 0; j < indusClazFic.length; j++) {
            // console.log(indusClazFic[j].name)
            let ind = indusClazFic[j]
            if (is[name] == null) is[name] = []
            is[name].push(ind.name)
            industryDict[ind.name] = ind.id
          }
          // console.log(ind['_embedded']['industry-classifications'])
        }
        // console.log(industryDict)
        return {
          buizClassNames: bs,
          industryClass: is,
          industryDict: industryDict
        }
      },
      industryClassifications () {
        const curVal = this.form['select-business-classification-field']
        const indus = this.buizClassifications.industryClass
        // console.log(indus[curVal])
        return indus[curVal]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register-app {
    margin-top: 30px;
    margin-left: -100px
  }
  .title {
    text-align: center;
  }
  #submit {
    width: 200px
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

  .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black;
  }

  .tooltip .tooltiptext {
      visibility: hidden;
      width: 400px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;

      /* Position the tooltip */
      position: absolute;
      z-index: 1;
  }

  .tooltip:hover .tooltiptext {
      visibility: visible;
  }
  .extra-info {
    text-transform: capitalize;
  }
</style>

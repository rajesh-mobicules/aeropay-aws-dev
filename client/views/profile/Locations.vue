<template>
  <div>
    <div class="card" v-for="loc in locations" :key="loc.merchantLocationId">
      <header class="card-header">
        <p class="card-header-title">
          Location
          <span><i class="fa fa-map-marker"></i></span>
        </p>

      </header>
      <div class="card-content">
        <div class="content">
          <dl>
            <dt>address</dt>
            <dd>{{loc.address || "_"}}</dd>
            <dt>city</dt>
            <dd>{{loc.city || "_"}}</dd>
            <dt>state</dt>
            <dd>{{loc.state || "_"}}</dd>
            <dt>zip</dt>
            <dd>{{loc.postalCode || "_"}}</dd>
            <dt>locaion id</dt>
            <dd>{{loc.merchantLocationId || "_"}}</dd>
          </dl>
        </div>
        <div class="has-text-centered content">
          <router-link to="#" class="button is-primary">Add Device</router-link>
        </div>
      </div>
    </div>
    <br>
    <div class="has-text-centered content">
      <button  @click.stop.prevent="openModalClick" class="button is-primary">Add Location</button>
    </div>
    <sweet-modal class="location-modal" ref="locationCreater" title="Add a location">
     <form @submit.prevent="addLocationSubmit">
       <div class="field">
         <label class="label">Location Name</label>
         <p class="control">
           <input class="input" type="text"
           placeholder="Chicago Store #1" v-model="location.name"
           >
         </p>

         <label class="label">Address</label>
         <p class="control">
           <input class="input" type="text"
           placeholder="address" v-model="location.address"
           >
         </p>
         <label class="label">City</label>
         <p class="control">
           <input class="input" type="text"
           placeholder="Chicago" v-model="location.city"
           >
         </p>
         
         <label class="label">State</label>
         <div class="control ">
           <span class="select">
             <select name="state" v-model="location.state">
               <option v-for="s in states" :key="s">{{ s }}</option>
             </select>
             <!-- <span>State</span> -->
           </span>
         </div>
         <label class="label">Postal Code</label>
         <p class="control">
           <input class="input" type="text" 
            v-model="location.postalCode"
           >
         </p>

       </div>

       <p class="help is-danger error has-text-centered" v-show="hasErr">{{errMessage}}</p>
       <br>
       <input type="submit" v-show="false" class="submit">
       <p class="has-text-centered">
         <a class="signin-button button is-primary" id="submit" type="submit" value="Sign in"
            @click="addLocationSubmit" :disabled="disabled"
            :class = "{'is-loading' : isLoading}"
         >
           Submit
         </a>
       </p>
     </form> 
    </sweet-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getLocations, createLocation } from "utils/aero_functions"
import { SweetModal } from 'sweet-modal-vue'
import statesHash from 'utils/states_hash.json'
export default {
  components: {
    SweetModal
  },
  data () {
    return {
      locations: [],
      location: {
        name: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        latitude: '',
        longitude: ''
      },
      hasErr: false,
      errMessage: '',
      disabled: false,
      isLoading: false
    }
  },
  beforeMount () {
    getLocations(this.idToken)
      .then(locations => {
        // console.log(locations)
        this.locations = locations
      })
      .catch(err => console.log(err))
  },
  methods: {
    openModalClick () {
      // this.showUploader = true
      this.$refs.locationCreater.open()
    },
    addLocationSubmit () {
      if (!this.disabled) {
        this.isLoading = true
        createLocation(this.location)
        .then(data => {
          this.isLoading = false
          window.alert("create success")
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
          this.errMessage = err.message
        })
      }
    }
  },
  computed: {
    ...mapGetters(['idToken']),
    states () {
      const ss = []
      for (let s in statesHash) {
        ss.push(s)
      }
      // console.log(ss)
      return ss
    }
  }
}
</script>

<style scoped lang="scss">
dt {
  display: inline-block;
  min-width: 95px;
  margin: 0 20px 10px 0px;
  float: left;
  clear: left;
  color: #8393aa;
  font-size: 0.85714rem;
  line-height: 1.71429rem;
  text-align: right;
  text-transform: uppercase;
}
dd {
  min-width: 95px;
  display: block;
  margin: 0 20px 10px 0px;
  line-height: 1.71429rem;
}
.fa {
  margin-left: 10px;
  margin-top: 4px;
}
</style>

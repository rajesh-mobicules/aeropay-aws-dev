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
      <router-link to="#" class="button is-primary">Add Location</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getLocations } from "utils/aero_functions"
export default {
  data () {
    return {
      locations: []
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
  computed: {
    ...mapGetters(['idToken'])
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

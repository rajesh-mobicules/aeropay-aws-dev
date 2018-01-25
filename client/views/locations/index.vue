<template>
  <div  id="profile-top">
     <div class="search-box">
      <div class="field has-addons">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="search locations" v-model="keyword">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
        <p class="control">
          <button class="button is-primary" @click.prevent="searchLocations">
            Search
          </button>
        </p>
      </div>
    </div>
    <div class="has-text-centered content">
      <button  @click.stop.prevent="openModalClick" class="button is-primary" :style="emptyLocation">Add Location</button>
    </div>
    <div class="card location-card box" v-for="loc in locations" :key="loc.merchantLocationId">
      <header class="card-header">
        <p class="card-header-title">
         {{loc.name || ""}}
          <span><i class="fa fa-map-marker"></i></span>
          <a @click.prevent="editLocation(loc.merchantLocationId)"><i class="fa fa-pencil"></i></a>
        </p>
         <span class="delete-button" @click="confirmDelete(loc.merchantLocationId)"><button class="delete delete-sign" aria-label="delete"></button></span>
      </header>
      <div class="card-content" v-show="!loc.editable">
        <div class="columns">
          <div class="content column is-half">
            <dl>
              <dt>locaion id</dt>
              <dd>{{loc.merchantLocationId || "_"}}</dd>
              <dt>address</dt>
              <dd>{{loc.address || "_"}}</dd>
              <dt>city</dt>
              <dd>{{loc.city || "_"}}</dd>
              <dt>state</dt>
              <dd>{{loc.state || "_"}}</dd>
              <dt>postal code</dt>
              <dd>{{loc.postalCode || "_"}}</dd>
            </dl>
          </div>
          <div class="column is-half">
            <img :src="getMapUrl(loc)" alt="location">
          </div>
        </div>
        <div class="has-text-centered content">
          <router-link to="#" class="button is-primary">Add Device to This Location</router-link>
        </div>
      </div>
      <div class="card-content" v-if="loc.editable">
        <div class="columns">
          <div class="content column is-half">
            <dl>
              <dt>Location Name</dt>
              <dd><input v-model="tempLocs.get(loc.merchantLocationId).name"/></dd>
              <dt>address</dt>
              <dd><input v-model="tempLocs.get(loc.merchantLocationId).address"/></dd>
              <dt>city</dt>
              <dd><input v-model="tempLocs.get(loc.merchantLocationId).city"/></dd>
              <dt>state</dt>
              <dd>
                <select name="state" v-model="tempLocs.get(loc.merchantLocationId).state">
                  <option v-for="s in states" :key="s">{{ s }}</option>
                </select>
              </dd>
              <dt>postal code</dt>
              <dd><input v-model="tempLocs.get(loc.merchantLocationId).postalCode"/></dd>
            </dl>
          </div>
        </div>

        <div class="has-text-centered content">
          <button
           class="button is-primary"
           @click="locationSave(loc.merchantLocationId)"
           :class = "{'is-loading' : isLoading}">Save</button>
           <button class="button" @click="cacelEdit(loc.merchantLocationId)">cancel</button>
        </div>
      </div>
    </div>
    <sweet-modal class="location-modal" ref="locationCreater" title="Add a location">
     <form @submit.prevent="addLocationSubmit">
       <div class="field">
         <label class="label">Location Name</label>
         <!-- <p class="control">
           <input class="input" type="text"
           placeholder="Chicago Store #1" v-model="location.name"
           id="locationAddress"
           />
         </p> -->
         <p class="control">
           <vue-google-autocomplete
            ref="address"
            id="map"
            placeholder="Please type your address"
            v-model="location.name"
            v-on:placechanged="getAddressData"
        >
        </vue-google-autocomplete>
         </p>
         <label class="label">Address</label>
         <p class="control">
           <input class="input" type="text"
           placeholder="address" v-model="location.address"
           />
         </p>
         <label class="label">City</label>
         <p class="control">
           <input class="input" type="text"
           placeholder="Chicago" v-model="location.city"
           />
         </p>
         <label class="label">State</label>
         <div class="control ">
           <span class="select">
             <select name="state" v-model="location.state">
               <option v-for="s in states" :key="s">{{ s }}</option>
             </select>
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
       <br />
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
    <sweet-modal id="delete-modal" title="Delete Confirmation" ref="deleteConfirm">
      <div class="has-text-centered">
        <p>Are you sure you want to delete this store location?</p>
        <br />
        <button @click="deleteLocationSubmit"
        class="button is-danger"
        :class = "{'is-loading' : isLoading}">Yes
        </button>
      </div>
    </sweet-modal>
  </div>
</template>
<script>
import {
  getLocations,
  createLocation,
  deleteLocation,
  saveLocation
} from "utils/aero_functions";
import VueScrollTo from "vue-scrollto";
import { SweetModal } from "sweet-modal-vue";
import statesHash from "utils/states_hash.json";
import { mapGetters } from "vuex";
import { parsePJString } from "utils/auth_utils";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  components: {
    SweetModal,
    VueGoogleAutocomplete
  },
  data() {
    return {
      locations: [],
      tempLocs: new Map(),
      location: {},
      hasErr: false,
      errMessage: "",
      disabled: false,
      isLoading: false,
      selectedLocationId: "",
      keyword: "",
      address: ""
    };
  },
  beforeMount() {
    getLocations(this.apiClient, this.merchant.merchantId)
      .then(({ data }) => {
        if (data.locations) {
          this.locations = data.locations.map(loc => {
            loc.editable = false;
            return loc;
          });
        } else console.log(data.message);
      })
      .catch(err => console.log(err));
  },
  methods: {
    getAddressData: function(addressData, placeResultData, id) {
      this.address = addressData;
      if (placeResultData.formatted_address) {
        this.location.address = placeResultData.formatted_address;
      }
      if (addressData.country) {
        this.location.city = addressData.country;
      }
      if (addressData.administrative_area_level_1) {
        this.location.state = addressData.administrative_area_level_1;
      }
      if (addressData.postal_code) {
        this.location.postalCode = addressData.postal_code;
      }

      // for (var i = 0; i < placeResultData.address_components.length; i++) {
      //   for (var j = 0; j < placeResultData.address_components[i].types.length; j++) {
      //     if (placeResultData.address_components[i].types[j] == "postal_code") {
      //       location.postalCode = placeResultData.address_components[i].long_name;
      //     }
      //   }
      // }
    },
    openModalClick() {
      const options = {
        onDone: () => {
          this.$refs.locationCreater.open();
        }
      };
      VueScrollTo.scrollTo("#profile-top", 500, options);
    },
    cacelEdit(id) {
      this.locations = this.locations.map(loc => {
        if (loc.merchantLocationId === id) {
          loc.editable = false;
        }
        return loc;
      });
    },
    editLocation(merchantLocationId) {
      this.locations = this.locations.map(loc => {
        if (loc.merchantLocationId === merchantLocationId) {
          loc.editable = true;
          this.tempLocs.set(merchantLocationId, loc);
        }
        return loc;
      });
    },
    locationSave(id) {
      this.isLoading = true;
      const location = this.tempLocs.get(id);
      delete location.longitude;
      delete location.latitude;
      saveLocation(this.apiClient, location, id)
        .then(({ data }) => {
          const newLoc = parsePJString(data.location);
          this.isLoading = false;
          this.locations = this.locations.map(loc => {
            if (loc.merchantLocationId === newLoc.merchantLocationId) {
              loc = newLoc;
              loc.editable = false;
            }
            return loc;
          });
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    },
    addLocationSubmit() {
      if (!this.disabled) {
        this.isLoading = true;
        createLocation(this.apiClient, this.merchant.merchantId, this.location)
          .then(({ data }) => {
            const location = parsePJString(data.location);
            this.isLoading = false;
            this.locations.push(location);
            this.$refs.locationCreater.close();
          })
          .catch(err => {
            this.isLoading = false;
            window.alert("server is busy, try it later!");
            console.log(err);
            this.errMessage = err.message;
          });
        this.location = {};
      }
    },
    confirmDelete(merchantLocationId) {
      this.selectedLocationId = merchantLocationId;
      const options = {
        onDone: () => {
          this.$refs.deleteConfirm.open();
        }
      };
      VueScrollTo.scrollTo("#profile-top", 500, options);
    },
    deleteLocationSubmit() {
      console.log(this.selectedLocationId);
      this.isLoading = true;
      deleteLocation(this.apiClient, this.selectedLocationId)
        .then(res => {
          this.isLoading = false;
          this.locations = this.locations.filter(
            loc =>
              loc.merchantLocationId.toString() !==
              this.selectedLocationId.toString()
          );
          this.$refs.deleteConfirm.close();
        })
        .catch(err => {
          this.isLoading = false;
          window.alert("server is business, please try it later");
          console.log(err);
        });
    },
    getMapUrl(loc) {
      const center = `${loc.latitude},${loc.longitude}`;
      const markers = `color:blue%7clabel:S%7c${center}`;
      return `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=15&size=300x200&
markers=${markers}&${center}&key=${this.mapAPIKey}`;
    },
    searchLocations() {}
  },
  computed: {
    states() {
      const ss = [];
      for (let s in statesHash) {
        ss.push(s);
      }
      return ss;
    },
    ...mapGetters(["mapAPIKey", "apiClient", "profile", "merchant"]),
    emptyLocation() {
      if (this.locations.length === 0) {
        return {
          marginTop: "100px",
          marginBottom: "300px"
        };
      } else {
        return { marginTop: "25px" };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~bulma";
dt {
  float: left;
  min-width: 95px;
  margin: 0 20px 10px 0px;
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
.delete-button {
  float: right;
  margin-top: 13px;
  margin-right: 30px;
}
.delete-sign {
  background: $danger;
}
.location-card {
  margin-bottom: 30px;
}
</style>

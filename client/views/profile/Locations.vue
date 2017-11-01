<template>
  <div>
    <div class="card location-card" v-for="loc in locations" :key="loc.merchantLocationId">
      <header class="card-header">
        <p class="card-header-title">
         {{loc.name || ""}}
          <span><i class="fa fa-map-marker"></i></span>
          <a @click.prevent="editLocation(loc.merchantLocationId)"><i class="fa fa-pencil"></i></a>
        </p>
         <span class="delete-button" @click="confirmDelete(loc.merchantLocationId)"><button class="delete delete-sign" aria-label="delete"></button></span>
      </header>
      <div class="card-content" v-show="!loc.editable">
        <div class="content">
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
        <div class="has-text-centered content">
          <router-link to="#" class="button is-primary">Add Device to This Location</router-link>
        </div>
      </div>
      <div class="card-content" v-show="loc.editable">
        <div class="content">
          <dl>
            <dt>Location Name</dt>
            <dd><input v-model="loc.name"></input></dd>
            <dt>address</dt>
            <dd><input v-model="loc.address"></input></dd>
            <dt>city</dt>
            <dd><input v-model="loc.city"></input></dd>
            <dt>state</dt>
            <dd>
              <select name="state" v-model="loc.state">
                <option v-for="s in states" :key="s">{{ s }}</option>
               </select>
             </dd>
            <dt>postal code</dt>
            <dd><input v-model="loc.postalCode"></input></dd>
          </dl>
        </div>
        <div class="has-text-centered content">
          <button
           class="button is-primary"
           @click="locationSave(loc.merchantLocationId)"
           :class = "{'is-loading' : isLoading}">Save</button>
        </div>
      </div>
    </div>
    <br />
    <div class="has-text-centered content">
      <button  @click.stop.prevent="openModalClick" class="button is-primary" :style="emptyLocation">Add Location</button>
    </div>
    <sweet-modal class="location-modal" ref="locationCreater" title="Add a location">
     <form @submit.prevent="addLocationSubmit">
       <div class="field">
         <label class="label">Location Name</label>
         <p class="control">
           <input class="input" type="text"
           placeholder="Chicago Store #1" v-model="location.name"
           />
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
export default {
  components: {
    SweetModal
  },
  data() {
    return {
      locations: [],
      location: {
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        latitude: "",
        longitude: ""
      },
      hasErr: false,
      errMessage: "",
      disabled: false,
      isLoading: false,
      selectedLocationId: ""
    };
  },
  beforeMount() {
    getLocations()
      .then(locations => {
        // console.log(locations)

        this.locations = locations.map(loc => {
          loc.editable = false;
          return loc;
        });
      })
      .catch(err => console.log(err));
  },
  methods: {
    openModalClick() {
      const options = {
        onDone: () => {
          this.$refs.locationCreater.open();
        }
      };
      VueScrollTo.scrollTo("#profile-top", 500, options);
    },
    editLocation(merchantLocationId) {
      this.locations = this.locations.map(loc => {
        if (loc.merchantLocationId === merchantLocationId) {
          loc.editable = true;
        }
        return loc;
      });
    },
    locationSave(merchantLocationId) {
      this.isLoading = true
      const location = this.locations.find(
        loc => loc.merchantLocationId === merchantLocationId
      );
      saveLocation(location, merchantLocationId)
        .then(res => {
          this.isLoading = false
          this.locations = this.locations.map(loc => {
            if (loc.merchantLocationId === merchantLocationId) {
              loc.editable = false;
            }
            return loc;
          });
        })
        .catch(err => {
          this.isLoading = false
          console.log(err);
        });
    },
    addLocationSubmit() {
      if (!this.disabled) {
        this.isLoading = true;
        createLocation(this.location)
          .then(location => {
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
      this.isLoading = true;
      deleteLocation(this.selectedLocationId)
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
    }
  },
  computed: {
    states() {
      const ss = [];
      for (let s in statesHash) {
        ss.push(s);
      }
      return ss;
    },
    emptyLocation() {
      if (this.locations.length === 0) {
        return {
          marginTop: "100px",
          marginBottom: "300px"
        };
      } else {
        return { marginTop: "50px" };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~bulma";
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

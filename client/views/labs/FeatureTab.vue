<template>
  <div id="profile-top">
    <div class="columns">
        <div class="column is-one-quarter">
          <slot />
        </div>
        <div class="column auto">
          <div class="card">
            <header class="card-header">
              <a class="card-header-title" :href="link" @click.stop.prevent="getLocationsData">
                {{title}}
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                {{description}}
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
      <sweet-modal class="location-modal" title="Live Map" ref="livemap">
      <template>
        <gmap-map
          :center="center"
          :zoom="7"
          style="width: 100%; height: 60vh"
        >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        ></gmap-marker>
  </gmap-map>
</template>
    </sweet-modal>
  </div>
</template>

<script>
import { getLocations } from "utils/aero_functions";
import { SweetModal } from "sweet-modal-vue";
import { mapGetters } from "vuex";

export default {
  props: ["title", "description", "link"],
  components: {
    SweetModal
  },
  data() {
    return {
      center: { lat: 10.0, lng: 10.0 },
      markers: [
        { position: { lat: 10.0, lng: 10.0 } },
        { position: { lat: 11.0, lng: 11.0 } }
      ]
    };
  },
  methods: {
    getLocationsData() {
      getLocations(this.apiClient, this.merchant.merchantId)
        .then(({ data }) => {
          if (data.locations) {
            this.locations = data.locations.map(loc => {
              loc.editable = false;
              return loc;
            });
            this.openModalClick();
          } else console.log(data.message);
        })
        .catch(err => console.log(err));
    },
    openModalClick() {
      this.$refs.livemap.open();
      // this.$refs.livemappage.resizePreserveCenter();
    }
  },
  computed: {
    ...mapGetters(["apiClient", "merchant"])
  }
};
</script>

<style>
</style>

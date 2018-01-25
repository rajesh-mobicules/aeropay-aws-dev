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
      <div id="map">       
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import { getLocations } from "utils/aero_functions";
import { SweetModal } from "sweet-modal-vue";
import VueScrollTo from "vue-scrollto";
import { mapGetters } from "vuex";
export default {
  props: ['title', 'description', 'link'],
  components: {
    SweetModal
  },
  data() {
    return {
      locations: [],
      mapDataArray:[
        {contentString:'<div><h3>Details</h3></div>',location:[38.09024, -86.712891]},
        {contentString:'<div><h3>Details</h3></div>',location:[40.09024, -90.712891]},
        {contentString:'<div><h3>Details</h3></div>',location:[50.09024, -102.712891]},
        {contentString:'<div><h3>Details</h3></div>',location:[34.09024, -98.712891]},
      ],
      lastOpenedInfoWindow:null
    };
  },
  methods: {
    getLocationsData() {
      // getLocations(this.apiClient, this.merchant.merchantId)
      //   .then(({ data }) => {
      //     if (data.locations) {
      //       this.locations = data.locations.map(loc => {
      //         loc.editable = false;
      //         return loc;
      //       });
      //       this.openModalClick();
      //     } else console.log(data.message);
      //   })
      //   .catch(err => console.log(err));
      this.openModalClick();
    },
    openModalClick() {
      const options = {
        onDone: () => {
            var map = new google.maps.Map(document.getElementById('map'), { zoom: 2, draggable: true, center: new google.maps.LatLng(38.09024, -86.712891) });
            var minZoomLevel = 2;
            for (var i = 0; i < this.mapDataArray.length; i++) {              
                var content= this.mapDataArray[i].contentString;
                var lat= this.mapDataArray[i].location[0];
                var lng= this.mapDataArray[i].location[1];
                var infowindow = new google.maps.InfoWindow({
                    content: content,
                    maxWidth: 250
                });
                var marker = new google.maps.Marker({
                    map: map,
                    draggable: false,
                    raiseOnDrag: false,
                    icon: "https://maps.google.com/mapfiles/ms/micons/blue.png",
                    position: new google.maps.LatLng(lat,lng),
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                      closeLastOpenedInfoWindo();
                      infowindow.open(map, marker);
                      this.lastOpenedInfoWindow = infowindow;
                    }
                })(marker, i));
            }

            function closeLastOpenedInfoWindo () {
                if (this.lastOpenedInfoWindow) {
                    this.lastOpenedInfoWindow.close();
                }
            }
          this.$refs.livemap.open();
        }
      };
      VueScrollTo.scrollTo("#profile-top", 500, options);
    }
  },
  computed: {
    ...mapGetters(["apiClient","merchant"])
  }
}
</script>

<style>
#map{
  overflow:inherit!important;
}
</style>

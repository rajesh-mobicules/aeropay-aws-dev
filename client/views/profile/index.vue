<template>
  <div>
    <div class="card">
      <div class="card-content">
        <p class="title p-name">
          {{merchant.firstName}} {{merchant.lastName}}
        </p>
        <span class="sub">
          <i class="fa fa-envelope-o"></i>
          {{merchant.email}}
        </span>
        <span>
          <span :class="statusClass" v-show="merchant.status === 'verified'" >{{statusMessage}}</span>
          <a :class="statusClass"
            v-show="merchant.status === 'unverified'"
            @click.stop.prevent="enableUploader">
              <i class="fa fa-exclamation-circle"></i>  {{statusMessage}}
          </a>
        </span>
      </div>
      <footer class="card-footer">
        <router-link to="/profile/basic" class="card-footer-item">
          <span>
            Basic Info
          </span>
        </router-link>
        <router-link to="/profile/locations" class="card-footer-item">
          <span>
            Locations
          </span>
        </router-link>
        <router-link to="/profile/billing" class="card-footer-item">
          <span>
            Billing
          </span>
        </router-link>
      </footer>
      <div class="under-score" :style="{left: offset}"></div>
    </div>
    <br>
    <router-view :merchant="merchant"></router-view>

    <sweet-modal ref="uploader" title="We need some additional information.">
      <sweet-modal-tab v-for="d in documentTypes" :title="d.name" :id="d.name" :key="d.name" :disabled="!d.enable" >
        <p>We'll need a bit more information to finish verifying your Business account. We take protecting your identity seriously, and want to be extra certain that this is you.</p>
        <div class="document-description">{{d.description}}</div>
        <p>Once you've submitted the file(s), you can expect to hear from us in 1-2 business days. In the meantime, feel free to <router-link to="/support">contact support</router-link>.</p>
        <dropzone
          :id="d.name"
          :url="uploadURL"
          @vdropzone-success="showSuccess"
          @vdropzone-error="showError"
          paramName="document"
          :headers="header"
          :dropzoneOptions="dropzoneOptions"
          >
          <input id="type" type="hidden" name="type" :value="d.name">
          <!-- <input id="document" type="file" name="document" v-show="false"> -->
        </dropzone>
      </sweet-modal-tab>
<!--       <sweet-modal-tab title="passport" id="tab1">
        <dropzone
          id="documentUploader"
          :url="uploadURL"
          @vdropzone-success="showSuccess"
          @vdropzone-error="showError"
          paramName="document"
          :headers="header"
          >
          <input id="type" type="hidden" name="type" value="passport">
        </dropzone>
      </sweet-modal-tab>
      <sweet-modal-tab title="Tab 2" id="tab2">
      </sweet-modal-tab>
      <sweet-modal-tab title="Tab 3" id="tab3" disabled>Tab 3 is disabled</sweet-modal-tab>
 -->     
    </sweet-modal>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { getProfile } from 'utils/aero_functions'
  import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
  import Dropzone from 'vue2-dropzone'
  import { documentUploadURL } from 'utils/configuration'
  export default {
    components: {
      SweetModal,
      SweetModalTab,
      Dropzone
    },
    data () {
      return {
        uploadURL: documentUploadURL,
        dropzoneOptions: {
          uploadMultiple: 'no',
          parallelUploads: 1
        },
        merchant: {
        },
        documentTypes: [
          {
            name: 'passport',
            description: 'Please upload a copy of your passport',
            enable: true
          },
          {
            name: 'license',
            description: 'Please upload a copy of your license',
            enable: true
          },
          {
            name: 'idCard',
            description: 'Please upload a copy of your ID Card',
            enable: false
          },
          {
            name: 'other',
            description: 'Please upload a copy of other documents',
            enable: true
          }
        ]
      }
    },
    beforeMount () {
      getProfile(this.idToken)
        .then(merchant => {
          // console.log(merchant)
          merchant.status = 'unverified'
          this.merchant = merchant
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      updateProfile () {
        console.log(this.newEmail, this.newBank)
      },
      enableUploader () {
        // this.showUploader = true
        this.$refs.uploader.open()
      },
      showSuccess (file, response) {
        // window.alert('upload success')
        console.log('file uoload success')
        console.log(response)
      },
      showError (file) {
        console.log('file upload failed')
      }
    },
    computed: {
      ...mapGetters(['email', 'idToken']),
      offset () {
        // console.log(this.$route.name)
        if (this.$route.name === 'Locations') return '33.3%'
        if (this.$route.name === 'Billing') return '66.7%'
        else return '0%'
      },
      statusMessage () {
        if (this.merchant.status === 'unverified') {
          return 'unverified: please submit additional information for verification'
        } else if (this.merchant.status === 'verified') return 'verified'
        else return ''
      },
      statusClass () {
        return {
          'verified': this.merchant.status === 'verified',
          'not-verified': this.merchant.status === 'unverified'
        }
      },
      header () {
        return {
          'requestAuthorization': this.idToken
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma';
  .card {
    margin: 0px;
    padding: 0px;
  }
  .p-name {
    display: block;
    margin: 10px 0px 30px 0px;
  }
  .sub {
    display: inline-block;
    margin: 0 20px 0 0;
    color: #8393aa;
  }
  .fa {
    margin-top: 4px;
  }
  .card-footer-item {
    color: #3e4e67;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }
  .router-link-exact-active {
    color: #3e4e67;
  }
  .under-score {
    position: relative;
    height: 3px;
    transition: left .5s cubic-bezier(.23,1,.32,1);
    background-color: $primary;
    width: 33.3%;
  }
  .verified {
    color: $primary;
  }
  .not-verified {
    color: $danger;
    text-decoration: underline;
  }

  .document-description {
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: #d3d3d3;
  }

</style>

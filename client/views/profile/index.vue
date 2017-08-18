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
        <br>
        <form @submit.prevent="onSubmit" class="has-text-centered">
        <input :id="d.name" type="file" @change="onSelect">
          <input type="submit" v-if="false">
          <br>
          <br>
          <p class="has-text-centered">
            <a class="button is-primary" id="submit"
              :class = "{'is-loading' : isLoading}"
              @click="onSubmit">
              Submit
            </a>
          </p>
        </form>
      </sweet-modal-tab>
    </sweet-modal>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { getProfile, uploadFile } from 'utils/aero_functions'
  import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
  import Dropzone from 'vue2-dropzone'
  import { documentUploadURL } from 'utils/configuration'
  // import FileReader from 'filereader'
  export default {
    components: {
      SweetModal,
      SweetModalTab,
      Dropzone
    },
    data () {
      return {
        files: {
          passport: null,
          license: null,
          idCard: null,
          other: null
        },
        isLoading: false,
        isCalculating: false,
        fileType: null,
        uploadURL: documentUploadURL,
        dropzoneOptions: {
          uploadMultiple: 'no',
          parallelUploads: 1
        },
        base64file: null,
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
      getBase64 (file, cb) {
        const reader = new window.FileReader()
        reader.readAsDataURL(file)
        // reader.onload = function () {
        //   this.isCalculating = true
        //   console.log(reader.result)
        //   this.base64file = reader.result
        //   this.fileType = type
        // }
        reader.onload = cb
        reader.onerror = function (error) {
          console.log('Error: ', error)
        }
      },
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
      },
      onSelect (event) {
        // console.log(event)
        const input = event.target
        const type = event.target.id
        this.isCalculating = true
        if (input.files && input.files[0]) {
          // console.log(input.files[0])
          this.getBase64(input.files[0], e => {
            this.base64file = e.target.result
            this.fileType = type
            this.isCalculating = false
          })
        }
      },
      onSubmit () {
        if (this.base64file !== null) {
          this.isLoading = true
          uploadFile(this.base64file, this.fileType, this.idToken)
            .then(res => {
              this.isLoading = false
              window.alert('submit success')
            })
            .catch(err => {
              this.isLoading = true
              console.log(err)
              window.alert('server is busy, try it later!')
            })
        }
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

<style lang="scss">
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
  .sweet-action-close:hover {
    background: $primary;
    color: #fff;
  }
</style>

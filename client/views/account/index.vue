<template>
  <div>
    <div class="card box" id="profile-top">
      <div class="card-content">
        <p class="title p-name">
          {{profile.firstName}} {{profile.lastName}}
        </p>
        <span class="sub">
          <i class="fa fa-envelope-o"></i>
          {{profile.email}}
        </span>
        <span>
          <span class="verified" v-show="profile.status === status.verified || profile.status === status.reviewed" >{{verifiedMsg}}</span>
          <span class="pending" v-show="profile.status === status.pending">pending</span>
          <a class="document"
            v-show="profile.status === profile.document && profile.type === types.verifyWithDocument"
            @click.stop.prevent="customerUploader">
              <i class="fa fa-exclamation-circle"></i>  {{documentMsg}}
          </a>
          <a class="document"
            v-show="profile.status === status.document
            && (profile.type === types.verifyBusinessWithDocument
            || profile.type === types.verifyBusinessId
            || profile.type === types.business)"
            @click.stop.prevent="businessUploader">
              <i class="fa fa-exclamation-circle"></i>  {{documentMsg}}
          </a>
          <a class="retry"
            v-show="profile.status === status.retry"
            @click.stop.prevent="openRetryModal">
              <i class="fa fa-exclamation-circle"></i>  {{retryMsg}}
          </a>
        </span>
      </div>
      <footer class="card-footer">
        <router-link to="/account/info" class="card-footer-item">
          <span>
            Info
          </span>
        </router-link>
        <router-link to="/account/locations" class="card-footer-item">
          <span>
            Locations
          </span>
        </router-link>
        <router-link to="/account/billing" class="card-footer-item">
          <span>
            Billing
          </span>
        </router-link>
      </footer>
      <div class="under-score" :style="{left: offset}"></div>
    </div>
    <br>
    <router-view :profile="profile"></router-view>
    <div class="businessUploader">
      <sweet-modal class="aero-modal" ref="businessUploader" title="We need some additional information.">
        <sweet-modal-tab title="description" id="description">
          <div class="content">
            <p>We'll need a bit more information to finish verifying your Business account. We take protecting your identity seriously, and want to be extra certain that this is you.</p>
            <br>
            <p>Required documents are different for different business types</p>
            <br>
            <p>* Partnership, General Partnership, Limited Liability Corporation (LLC), Corporation</p>
            <p><b>EIN Letter (IRS-issued SS4 confirmation letter)</b></p>
            <br>
            <p>* Sole Proprietorship will need one or more of the following, as applicable to your sole proprietorship:</p>
            <ul>
              <li><b>Fictitious Business Name Statement</b></li>
              <li><b>EIN documentation (IRS-issued SS4 confirmation letter)</b></li>
              <li><b>Color copy of a valid government-issued photo ID (e.g., a driver’s license, passport, or state ID card)</b></li>
            </ul>
          </div>
        </sweet-modal-tab>
        <sweet-modal-tab v-for="d in documentTypes" :title="d.name" :id="d.name" :key="d.name" :disabled="!d.enable" >
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
    <div class="customerUploader">
      <sweet-modal class="aero-modal" ref="customerUploader" title="We need some additional information.">
        <div class="content" id="id">
          <p>We'll need a bit more information to finish verifying your Business account. We take protecting your identity seriously, and want to be extra certain that this is you.</p>
          <br>
          <div class="document-description">{{documentTypes[1].description}}</div>
          <p>Once you've submitted the file(s), you can expect to hear from us in 1-2 business days. In the meantime, feel free to <router-link to="/support">contact support</router-link>.</p>
          <br>
          <form @submit.prevent="onSubmit" class="has-text-centered">
            <input :id="documentTypes[1].name" type="file" @change="onSelect">
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
        </div>
      </sweet-modal>
    </div>
    <div class="retry-modal">
      <sweet-modal class="aero-modal" title="Re-submit SSN" ref="retry">
        <form @submit.prevent="submitSsn">
          <div class="field">
            <!-- <p>{{retryMsg}}</p> -->
            <label for="ssn" class="label">{{retryMsg}}</label>
            <p class="control column is-4 is-offset-4">
              <cleave class="input" :options="{ delimiter: '-', blocks: [3, 2, 4], numericOnly: true }" name="ssn" v-model="ssn"></cleave>
              <span>xxx-xx-xxxx</span>
            </p>
            <span class="help is-danger" v-if="ssnError !== null">{{ssnError}}</span>
          </div>
          <input type="submit" v-if="false">
          <p class="has-text-centered">
            <a class="button is-primary" id="submit"
              :disabled="disabled"
              :class = "{'is-loading' : isLoading}"
              @click="submitSsn"
            >Submit</a>
          </p>
        </form>
      </sweet-modal>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { uploadFile, uploadSsn } from 'utils/aero_functions'
  import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
  import Dropzone from 'vue2-dropzone'
  import { documentUploadURL } from 'utils/configuration'
  import Cleave from 'vue-cleave'
  // import FileReader from 'filereader'
  export default {
    components: {
      SweetModal,
      SweetModalTab,
      Dropzone,
      Cleave
    },
    data () {
      return {
        files: {
          passport: null,
          license: null,
          idCard: null,
          other: null
        },
        ssnError: null,
        ssn: '',
        disabled: false,
        isLoading: false,
        isCalculating: false,
        fileType: null,
        uploadURL: documentUploadURL,
        dropzoneOptions: {
          uploadMultiple: 'no',
          parallelUploads: 1
        },
        base64file: null,
        // merchant: {},
        // profile: {},
        status: {
          document: 'document',
          retry: 'retry',
          verified: 'verified',
          pending: 'pending',
          reviewed: 'reviewed'
        },
        types: {
          customer: 'customer',
          business: 'business',
          verifyWithDocument: 'verify-with-document',
          verifyBusinessWithDocument: 'verify-business-with-document',
          verifyBusinessId: 'verify-authorized-representative-and-business-with-document'
        },
        documentMsg: 'Please submit additional information for verification',
        retryMsg: 'Please re-enter your full social security number to get verified',
        verifiedMsg: 'verified',
        documentTypes: [
          {
            name: 'EIN Letter',
            description: 'Please upload a copy of your EIN Letter (IRS-issued SS4 confirmation letter)',
            enable: true
          },
          {
            name: 'photo ID',
            description: 'Please upload a copy of your photo ID (e.g., a driver’s license, passport, or state ID card)',
            enable: true
          }
        ]
      }
    },
    beforeMount () {
      // getProfile(this.apiClient, this.email)
      //   .then(({merchant, profile}) => {
      //     console.log()
      //     // merchant.status = 'unverified'
      //     // merchant.status = 'retry'
      //     this.merchant = merchant
      //     this.profile = profile
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    methods: {
      getBase64 (file, cb) {
        const reader = new window.FileReader()
        reader.readAsDataURL(file)
        reader.onload = cb
        reader.onerror = function (error) {
          console.log('Error: ', error)
        }
      },
      updateProfile () {
        console.log(this.newEmail, this.newBank)
      },
      customerUploader () {
        // this.showUploader = true
        this.$refs.customerUploader.open()
      },
      businessUploader () {
        // this.showUploader = true
        this.$refs.businessUploader.open()
      },
      openRetryModal () {
        // this.showUploader = true
        this.$refs.retry.open()
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
          uploadFile(this.apiClient, this.merchant.merchantId, this.base64file, this.fileType)
            .then(({data}) => {
              this.isLoading = false
              if (data.success) {
                window.alert('submit success')
              } else {
                window.alert('server is busy, try it later!')
                console.log(data)
              }
            })
            .catch(err => {
              this.isLoading = false
              console.log(err)
              window.alert('server is busy, try it later!')
            })
        }
      },
      submitSsn () {
        const ssn = this.ssn.split('-').join('')
        if (ssn.length !== 9) {
          this.ssnError = 'Must enter 9 digits social security number!'
        } else {
          this.ssnError = null
          this.isLoading = true
          uploadSsn(this.apiClient, ssn)
            .then(({data}) => {
              this.isLoading = false
              if (data.success) {
                window.alert('submit success')
              } else {
                console.log(data)
                window.alert('server is busiy, try it later!')
              }
            })
            .catch(err => {
              this.isLoading = false
              console.log(err)
              window.alert('server is busy, try it later!')
            })
        }
      }
    },
    computed: {
      ...mapGetters(['email', 'idToken', 'apiClient', 'profile', 'merchant']),
      offset () {
        // console.log(this.$route.name)
        if (this.$route.name === 'Locations') return '33.3%'
        if (this.$route.name === 'Billing') return '66.7%'
        else return '0%'
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
  .document {
    color: $danger;
    text-decoration: underline;
  }
  .retry {
    color: $warning;
    text-decoration: underline;
  }
  .pending {
    color: $warning;
  }
  .document-description {
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: #d3d3d3;
  }
  .aero-modal .sweet-modal .sweet-box-actions .sweet-action-close:hover {
    background: $primary;
  }
  .aero-modal .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab.active a  {
    color: $primary;
  }
  .uploader {
    margin-left: -50px;
  }
  .retry-modal {
    position: relative;
    left: 1000px;
  }

</style>

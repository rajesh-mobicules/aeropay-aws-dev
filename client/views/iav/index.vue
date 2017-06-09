<template>
  <div>
    <div id="iavContainer"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'iav-page',
    mounted () {
      const dwolla = window.dwolla
      // var iavToken = 'bL5MU6FIRmZ8XEuQmYXjaxYMqf8mbfFrecvch4dYQttRUIwikA'
      dwolla.configure('sandbox')
      dwolla.iav.start(this.iavToken, {
        container: 'iavContainer',
        stylesheets: [
          'http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
          'http://myapp.com/iav/someStylesheet.css'
        ],
        microDeposits: false,
        fallbackToMicroDeposits: false
      }, function (err, res) {
        console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res))
      })
    },
    computed: {
      ...mapGetters(['iavToken'])
    }
  }
</script>

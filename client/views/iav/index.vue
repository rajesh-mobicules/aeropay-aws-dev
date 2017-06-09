<template>
  <div>
    <div id="mainContainer">
      <input type="button" @click="addBank" id="start" value="Add Bank">
    </div>  
    <div id="iavContainer"></div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'iav-page',
    methods: {
      addBank () {
        const dwolla = window.dwolla
        var iavToken = 'Iw7Ytplr4lWJYpjffD8arqLSqXM6PuhTyowYR0iXFS7hg0ETqK'
        dwolla.configure('sandbox')
        dwolla.iav.start(iavToken, {
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
      }
    },
    computed: {
      ...mapGetters(['iavToken'])
    }
  }
</script>

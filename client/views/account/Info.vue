<template>
  <div>
    <div class="card box">
      <header class="card-header">
        <p class="card-header-title">
          Authorized representative
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <dl>
            <dt>name</dt>
            <dd>{{profile.firstName}}</dd>
          </dl>
        </div>
      </div>
    </div>
    <br>

    <div class="card box">
      <header class="card-header">
        <p class="card-header-title">
          Contact Inforamtion
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <dl>
            <dt>email</dt>
            <dd>{{profile.email}}</dd>
            <dt>address 1</dt>
            <dd>{{profile.address1 || "_"}}</dd>
            <!-- <dt>address 2</dt> -->
            <!-- <dd>{{mercahnt.address2 || "_"}}</dd> -->
            <dt>city</dt>
            <dd>{{profile.city || "_"}}</dd>
            <dt>state</dt>
            <dd>{{profile.state || "_"}}</dd>
            <dt>zip</dt>
            <dd>{{profile.postalCode || "_"}}</dd>
          </dl>
        </div>
      </div>
    </div>
    <br>

    <div class="card box">
      <header class="card-header">
        <p class="card-header-title">
          Organization
        </p>
      </header>
      <div class="card-content">
        <div class="content">
        <dl>
          <dt>company</dt>
          <dd>{{profile.businessName}}</dd>
        </dl>

        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  // import { getProfile } from 'utils/aero_functions'
  // import { mapGetters } from 'vuex'
  export default {
    props: ['profile'],
    data () {
      return {
      }
    }
    // beforeMount () {
    //   getProfile(this.idToken)
    //     .then(profile => {
    //       console.log(profile)
    //       this.profile = profile
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // computed: {
    //   ...mapGetters(['idToken'])
    // }
  }
</script>

<style lang="scss" scoped>

  dt {
    display: inline-block;
    min-width: 95px;
    margin: 0 20px 10px 0px;
    float: left;
    clear: left;
    color: #8393aa;
    font-size: .85714rem;
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
</style>

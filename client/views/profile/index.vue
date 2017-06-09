<template>
  <div>
    <h2 class='has-text-centered title column'>Profile</h2>
    <div class="columns">
      <div class="box column is-6 is-offset-3">
        <div class="field">
          <label class="label">Email</label>
          <p class="control">
            <input class="input" type="text" placeholder="Email Address" v-model="newEmail">
          </p>
        </div>
        <div class="field">
          <label class="label">Bank Account</label>
          <p class="control">
            <input class="input" type="text" placeholder="Bank Account" v-model="newBank">
          </p>
        </div>
        <div class="has-text-centered">
          <a class="button is-primary" @click="updateProfile">Update Profile</a>
        </div>
        <br>
        <br>
        <div class="has-text-centered">
          <router-link to="/iav" class="button is-primary" >Change or Add Bank Account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        newEmail: '',
        newBank: ''
      }
    },
    mounted () {
      this.newEmail = this.email
    },
    methods: {
      updateProfile () {
        console.log(this.newEmail, this.newBank)
      }
    },
    computed: {
      ...mapGetters(['email'])
    }
  }
</script>

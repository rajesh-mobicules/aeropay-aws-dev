<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Billing Method
        </p>
      </header>
      <div class="card-content account-box">
       <div class="bank-bg">
         <img src="~assets/bankAccount.svg" alt="bankAccount">
       </div>
       <div class="account-info">
         <div class="account-name">
          <span>{{bankAccount.name}}</span>
          <span :class="statusClass">{{bankAccount.status}}</span>
         </div>
         <div class="bank-name">{{bankAccount.bankName}}</div>
         <div class="added">Added: {{bankAccount.created | renderDate}}</div>
       </div>
      </div>
    </div>
    <br>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Billing History
        </p>
      </header>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in billingHistory">
            <td><span class="span">{{t.createdDate}}</span></td>
            <td><span class="status">{{t.status}}</span></td>
            <td :class="{'is-processed': t.status === 'processed', 'is-pending': t.status === 'pending'}">{{t.amount | renderCents}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <br>
    <div class="has-text-centered content">
      <router-link to="/iav" class="button is-primary" >Change or Add Bank Account</router-link>
    </div>
  </div>
</template>

<script>
  import { getBillings } from 'utils/aero_functions'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        bankAccount: {},
        billingHistory: []
      }
    },
    beforeMount () {
      getBillings(this.idToken)
        .then(bankAccount => {
          console.log(bankAccount)
          this.bankAccount = bankAccount
        })
        .catch(err => console.log(err))
    },
    computed: {
      ...mapGetters(['idToken']),
      statusClass () {
        const cls = {
          sub: true,
          verified: false
        }
        if (this.bankAccount.status === 'verified') cls.verified = true
        return cls
      }
    },
    filters: {
      renderDate (rawDate) {
        const date = new Date(rawDate)
        return date.toLocaleString()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~bulma';
  .account-box {
    display: flex;
  }
  .bank-bg {
    background: #eaedf3;
    border-radius: 3px;
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 116px;
    margin-right: 20px;
  }
  .account-info {
    display: flex;
    flex-direction: column;
    height: 84px;
  }
  .bank-name {
    font-size: 14px;
    color: #8393aa;
  }
  .added {
    margin-top: auto;
    font-size: 10px;
    color: #8393aa;
  }
  .verified {
    color: $primary;
    margin-left: 20px;
  }
  .not-verfied {
    color: $danger;
    margin-left: 20px;
  }
  .account-info-enter-active, .account-info-leave-active {
    transition: opacity .5s
  }
  .account-info-enter, .account-info-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>

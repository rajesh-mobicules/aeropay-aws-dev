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
         <div class="account-name">{{"bankAccount.name"}}</div>
         <div class="bank-name">{{"bankAccount.bankName"}}</div>
         <div class="added">Added{{"bankAccount.created"}}</div>
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
      ...mapGetters(['idToken'])
    }
  }
</script>

<style scoped lang="scss">
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
</style>

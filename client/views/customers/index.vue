<template>
  <div>
    <div class="search-box">
      <div class="field has-addons">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Name, email, or customer ID">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
        <p class="control">
          <a class="button is-info">
            Search
          </a>
        </p>
      </div>
    </div>
    <table class="table is-striped">
      <thead>
        <p class="trans_num">0 Customers</p>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in customers">
          <td class="customer"><span class="span"></span>{{c.customerName}}</td>
          <td><span class="span">{{c.email}}</span></td>
          <td><span class="status">{{c.status}}</span></td>
          <td>{{c.created}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        customers: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .trans_num {
    margin: 13px 0px 5px 10px;
    font-size: 18px;
    padding-left: 10px;
  }
  .search-box {
    margin-bottom: 15px;
  }
</style>

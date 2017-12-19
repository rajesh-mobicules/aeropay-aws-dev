<template>
  <div>
    <div class="search-box">
      <div class="field has-addons">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="search customers" v-model="keyword">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
        <p class="control">
          <button class="button is-info" @click.prevent="searchCustomers">
            Search
          </button>
        </p>
      </div>
    </div>
    <article class="box">
      <p class="cus_num">{{`${cus_num}/${totalItems}`}} Customers</p>
      <p class="total_pages">{{`${page}/${totalPages}`}} pages</p>
      <el-table
        :data="customers"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="firstName"
          label="name"
          sortable
          width="180"
          :formatter="nameFormater">
        </el-table-column>
        <el-table-column
          prop="email"
          label="email"
          sortable>
        </el-table-column>
        <el-table-column
          prop="merchant"
          label="merchant"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="amount"
          sortable
          width="100"
          :formatter="amountFormater">
        </el-table-column>
      </el-table>
      <br>
      <br>
      <div class="columns">
        <div class="column is-offset-4 is-4 has-text-centered">
          <router-link class="button is-primary" :to="`/customers/${page-1}`" v-if="page > 1">previous page</router-link>
          <router-link class="button is-success" :to="`/customers/${page+1}`" v-if="!onLastPage">next page</router-link>
        </div>
      </div>
    </article>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getCustomers } from 'utils/aero_functions'

  export default {
    data() {
      return {
        customers: [],
        paging: {},
        sorting: {},
        keyword: '',
        loading: false
      }
    },
    beforeMount() {
      this.searchCustomers()
      // getCustomers(this.apiClient, this.merchant.merchantId, {})
      //   .then(({ data }) => {
      //     console.log(data)
      //     this.customers = data.customers
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    methods: {
      searchCustomers() {
        const condition = {
          keyword: this.keyword.trim(),
          // limit: this.limit,
          page: this.page
        }
        getCustomers(this.apiClient, this.merchant.merchantId, condition)
          .then(({ data }) => {
            console.log(data)
            this.customers = data.customers
            this.paging = data.paging
            this.sorting = data.sorting
          })
          .catch(err => {
            console.log(err)
          })
      },
      nameFormater(row, col) {
        return `${row.firstName} ${row.lastName}`
      },
      amountFormater(row, col) {
        return `$${parseFloat(row.amount).toFixed(2)}`
      }
    },
    computed: {
      ...mapGetters(['apiClient', 'merchant']),
      cus_num() {
        return this.customers.length
      },
      page() {
        return parseInt(this.$route.params.page);
      },
      onLastPage() {
        return this.paging.totalPages === this.page;
      },
      totalItems() {
        return this.paging.totalItems || '';
      },
      totalPages() {
        return this.paging.totalPages || '';
      }
    },
    watch: {
      '$route' (to, from) {
        this.customers = []
        this.searchCustomers()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cus_num {
    margin: 13px 0px 5px 10px;
    font-size: 18px;
    padding-left: 10px;
    display: inline;
  }
  .total_pages {
    display: inline;
    margin-left: 50px;
  }
  .search-box {
    margin-bottom: 15px;
  }
</style>

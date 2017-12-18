<template>
  <div>
    <div>
      <div class="field columns">
        <div class="control has-icons-left column is-6">
          <!--<input class="input" type="text" placeholder="search transactions"-->
          <!--v-model="keyword" @keyup="searchWhenStop" @blur="clearAutoSearch">-->
          <input class="input" type="text" placeholder="search transactions" v-model="keyword">
          <span class="icon is-small is-left search-icon">
            <i class="fa fa-search"></i>
          </span>
        </div>
          <p class="column is-4">
          <flat-pickr
            v-model="dateRange"
            :config="dateConfig"
            placeholder="date range. (optional)"
          >
          </flat-pickr>
          <div class="column">
            <button class="button" type="button" title="Clear" @click.prevent="clearDates">
              <i class="fa fa-close">
                <span aria-hidden="true" class="sr-only">Clear</span>
              </i>
            </button>
          </div>
          </p>
        <p class="column">
          <a class="button is-info" @click.prevent="search">
            Search
          </a>
        </p>
    </div>
  </div>
  <div class="auto-search-content">
    <div class="card" v-if="this.tempTrans.length > 0">
      <div v-for="(t, i) in this.tempTrans" :key="i">
        <div class="card">
          <p>
            {{t.customerName}}
            <span>{{t.createdDate}}</span>
          </p>
          <p :class="statusClass(t)">{{t.amount | renderCents}}</p>
          <p>{{t.status}}</p>
        </div>
      </div>
    </div>
  </div>
  <br>
    <article class="box">
      <p class="trans_num">{{`${trans_num}/${totalItems}`}} Transactions</p>
      <p class="total_page">{{`${page}/${totalPages}`}} Pages</p>
      <el-table
        :data="totalTrans"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="name"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="date"
          width="180"
          sortable>
        </el-table-column>
        <el-table-column
          prop="status"
          label="status"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="amount"
          sortable
          width="180"
          :formatter="amountFormater">
        </el-table-column>
        <el-table-column
          prop="location"
          label="others"
          :formatter="othersFormater">
        </el-table-column>
      </el-table>
      <br>
      <br>
      <div class="columns">
        <div class="column is-offset-4 is-4 has-text-centered">
          <router-link class="button is-primary" :to="`/transactions/${page-1}`" v-if="page > 1">previous page</router-link>
          <router-link class="button is-success" :to="`/transactions/${page+1}`" v-if="!onLastPage">next page</router-link>
        </div>
      </div>
    </article>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { getTransacations } from "utils/aero_functions";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    flatPickr
  },
  data() {
    return {
      transactions: [],
      tempTrans: [],
      paging: {},
      sorting: {},
      keyword: "",
      dateRange: null,
      loading: false,
      dateConfig: {
        dateFormat: "Y-m-d",
        mode: "range",
        maxDate: "today",
        wrap: true,
        disable: []
      },
      timeout: null
    };
  },
  beforeMount() {
    this.rawSearch()
    // const condition = {
    //   page: this.$route.params.page
    // }
    // getTransacations(this.apiClient, this.merchant.merchantId, condition)
    //   .then(({data}) => {
    //     console.log(data)
    //     this.transactions = data.transactions
    //   })
    //   .catch(err => console.log(err))
    // getTransacations(this.apiClient)
    //   .then(transactions => {
    //     console.log(transactions);
    //     this.transactions = transactions.sort((a, b) => {
    //       return new Date(b.createdDate) - new Date(a.createdDate);
    //     });
    //   })
    //   .catch(err => console.log(err));
  },
  methods: {
    statusClass(t) {
      return {'is-processed': t.status === 'processed', 'is-pending': t.status === 'pending'}
    },
    // clearAutoSearch() {
    //   this.tempTrans = []
    // },
    clearDates() {
      this.dateRange = "";
    },
    search() {
      this.SET_TRANS_PAGE(1);
      this.rawSearch();
    },
    rawSearch() {
      this.tempTrans = [];
      const condition = {
        dateRange: this.dateRange,
        keyword: this.keyword.trim(),
        page: this.page,
        limit: this.transLimit
      }
      this.loading = true
      getTransacations(
        this.apiClient,
        this.merchant.merchantId,
        condition
      )
        .then(({data}) => {
          console.log(data);
          this.loading = false;
          let trans = data.transactions
          if (trans) {
            this.transactions = trans.sort((a, b) => {
              return new Date(b.createdDate) - new Date(a.createdDate);
            });
            this.paging = data.paging;
            this.sorting = data.sorting;
          } else {
            this.transactions = []
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        });
    },
    amountFormater(row, col) {
      let value = row.amount;
      if (!value) value = 0;
      value = value / 100;
      return "$" + value.toFixed(2);
    },
    othersFormater(row, col) {
      const {location, locationId, merchantName} = row;
      return `${location} | ${locationId} | ${merchantName}`;
    },
    ...mapMutations(["SET_TRANS_PAGE", "SET_TRANS_LIMIT"])
  },
  computed: {
    totalTrans() {
      const pending = this.transactions.filter(
        t => t.status.toLowerCase() === "pending"
      );
      const resolved = this.transactions.filter(
        t => t.status.toLowerCase() === "processed"
      );
      return pending.concat(resolved);
    },
    totalItems() {
      return this.paging.totalItems || '';
    },
    totalPages() {
      return this.paging.totalPages || '';
    },
    onLastPage() {
      return this.paging.totalPages === this.page;
    },
    trans_num() {
      return this.transactions.length;
    },
    page() {
      return parseInt(this.$route.params.page);
    },
    ...mapGetters(["transPage", "transLimit", "apiClient", "merchant"])
  },

  filters: {
    renderCents(value) {
      if (!value) value = 0;
      value = value / 100;
      return "$" + value.toFixed(2);
    }
  },
  watch: {
    '$route' (to, from) {
      this.transactions = []
      this.rawSearch()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma";
.span {
  color: #8393aa;
  text-transform: lowercase;
}
.customer {
  color: #3e4e67;
}
.is-processed {
  color: $primary;
}
.is-pending {
  // color: yellow;
}
.status {
  text-transform: capitalize;
}
.trans_num {
  margin: 13px 0px 5px 10px;
  font-size: 18px;
  padding-left: 10px;
  display: inline;
}
.search-box {
  margin-bottom: 15px;
}
.data-picker {
  width: 400px;
}
.search-icon {
  margin-top: 11px;
  margin-left: 10px;
}
.trans-table {
  border: #dbdbdb;
}
.auto-search-content {
  position: fixed;
  margin-top: 10px;
  width: 30%;
  z-index: 1000;
}
.total_page {
  display: inline;
  margin-left: 50px;
}
input {
  font-family: "adineue", serif;
}
</style>

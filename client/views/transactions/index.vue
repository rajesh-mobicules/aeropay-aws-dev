<template>
  <div>
    <div>
      <div class="field columns">
        <div class="control has-icons-left column is-6">
          <input class="input" type="text" placeholder="search transactions"
          v-model="keyword" @keyup="searchWhenStop" @blur="clearAutoSearch">
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
      <table class="table is-fullwidth">
        <thead>
          <p class="trans_num">{{trans_num}} Transactions</p>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Others</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in totalTrans" :key="i">
            <td class="customer"><span class="span"></span>{{t.customerName}}</td>
            <td><span class="span">{{t.createdDate}}</span></td>
            <td><span class="status">{{t.status}}</span></td>
            <td :class="statusClass(t)">{{t.amount | renderCents}}</td>
            <td><span>{{t.location || '_'}}|{{t.locationId || '_'}}|{{t.merchantName || '_'}}</span></td>
          </tr>
        </tbody>
      </table>
      <div class="columns">
        <div class="column is-offset-4 is-4 has-text-centered">
          <button class="button is-primary" @click="prevPage" v-if="transPage > 1">previous page</button>
          <button class="button is-success" @click="nextPage">next page</button>
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
import {
  getTransacations,
  getTrasactionsByCondition
} from "utils/aero_functions";
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
      keyword: "",
      dateRange: null,
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
    getTransacations()
      .then(transactions => {
        console.log(transactions);
        this.transactions = transactions.sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
      })
      .catch(err => console.log(err));
  },
  methods: {
    statusClass(t) {
      return {'is-processed': t.status === 'processed', 'is-pending': t.status === 'pending'}
    },
    clearAutoSearch() {
      this.tempTrans = []
    },
    clearDates() {
      this.dateRange = "";
    },
    nextPage() {
      this.SET_TRANS_PAGE(this.transPage + 1);
      this.rawSearch(this.transPage, this.transLimit);
    },
    prevPage() {
      this.SET_TRANS_PAGE(this.transPage - 1);
      this.rawSearch(this.transPage, this.transLimit);
    },
    search() {
      this.SET_TRANS_PAGE(1);
      this.rawSearch(1, 10);
    },
    searchWhenStop() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.autoSearch, 500)
    },
    autoSearch() {
      getTrasactionsByCondition(
        this.keyword,
        null,
        this.transPage,
        this.transLimit
        )
        .then(trans => {
          console.log(trans);
          this.tempTrans = trans.sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate);
          });
        })
        .catch(err => console.log(err));
    },
    rawSearch(transPage, transLimit) {
      this.tempTrans = [];
      getTrasactionsByCondition(
        this.keyword,
        this.dateRange,
        transPage,
        transLimit
      )
        .then(trans => {
          console.log(trans);
          this.transactions = trans.sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate);
          });
        })
        .catch(err => console.log(err));
    },
    ...mapMutations(["SET_TRANS_PAGE", "SET_TRANS_LIMIT"])
  },
  computed: {
    merchantName() {
      if (this.transactions === null || this.transactions.length === 0) {
        return "";
      }
      return this.transactions[0]["merchantName"];
    },
    totalTrans() {
      const pending = this.transactions.filter(
        t => t.status.toLowerCase() === "pending"
      );
      const resolved = this.transactions.filter(
        t => t.status.toLowerCase() === "processed"
      );
      return pending.concat(resolved);
    },
    trans_num() {
      return this.transactions.length;
    },
    ...mapGetters(["transPage", "transLimit"])
  },

  filters: {
    renderCents(value) {
      if (!value) value = 0;
      value = value / 100;
      return "$" + value.toFixed(2);
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
</style>

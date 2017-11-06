<template>
  <div>
    <div class="search-box">
      <div class="field has-addons">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Name, email, or transaction ID" v-model="keyword">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
        <p class="control has-icons-right">
          <datepicker
            class="data-picker"
            placeholder="date range. (optional)"
            :config="dateConfig"
            v-model="dateRange">
        <a class="button date-clear" data-clear><i class="fa fa-close"></i></a>
          </datepicker>
          <span class="icon is-small is-right">
            <i class="fa fa-calendar"></i>
          </span>
        </p>
        <p class="control">
          <a class="button is-info" @click.prevent="search">
            Search
          </a>
        </p>
      </div>
    </div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <p class="trans_num">{{trans_num}} Transactions</p>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, i) in totalTrans" :key="i">
          <td class="customer"><span class="span"></span>{{t.customerName}}</td>
          <td><span class="span">{{t.createdDate}}</span></td>
          <td><span class="status">{{t.status}}</span></td>
          <td :class="{'is-processed': t.status === 'processed', 'is-pending': t.status === 'pending'}">{{t.amount | renderCents}}</td>
        </tr>
      </tbody>
    </table>
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
import Datepicker from "vue-bulma-datepicker";
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      transactions: [],
      keyword: "",
      dateRange: null,
      dateConfig: {
        dateFormat: "Y-m-d",
        mode: "range",
        maxDate: "today",
        wrap: true,
        disable: []
      }
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
    clearDates() {
      this.dateRange = "";
    },
    search() {
      getTrasactionsByCondition(this.keyword, this.dateRange)
        .then(trans => {
          console.log(trans);
          this.transactions = trans.sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate);
          });
        })
        .catch(err => console.log(err));
    }
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
    }
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
  text-transform: uppercase;
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

</style>

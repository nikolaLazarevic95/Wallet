<template>
  <div id="spinner" v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div v-else-if="!hasAccounts || !hasRecords">
    <NoAccountsView />
  </div>
  <div id="wrapper" v-else>
    <div id="container">
      <div id="cardListout">
        <div id="cardList" v-if="hasAccounts" @click="getCurrAccData">
          <ListAccounts
            v-for="data in listOfAccounts"
            :data="data"
            :key="data.acc_id"
            @selected-account="handleSelectedAcc"
            :selectedID="selectedID"
          ></ListAccounts>
        </div>
        <h3 v-else>No Accounts found.</h3>
      </div>
      <div id="content">
        <base-card class="cards">
          <div v-if="isLoading">
            <base-spinner></base-spinner>
          </div>
          <div v-else-if="hasRecords">
            <h3>Last Five Records</h3>
            <LastRecords
              v-for="data in currAccLastRecords"
              :data="data"
              :key="data.rec_id"
            ></LastRecords>
          </div>
          <div v-else>
            <div class="noRecordsTitle">
              <h3>Add your first record</h3>
              <AddRecord />
            </div>
            <div class="noRecord">
              <img class="ikonica" src="../../public/listIcon.png" alt="" />
            </div>
          </div>
        </base-card>
        <base-card class="widecard">
          <div class="card-title">
            <h3>Expenses</h3>
            <h3>last 31 days</h3>
          </div>
          <base-card >
            <column-chart
              :data="sumExpenseCategories"
              id="expense-chart"
            ></column-chart>
          </base-card>
        </base-card>
        <base-card class="cards">
          <CashFlow :hasCashFlowSingleAcc="hasCashFlowSingleAcc"
          :selectedID="selectedID"
          ></CashFlow>
        </base-card>
        <base-card class="widecard">
          <div class="card-title">
            <h3>Expenses</h3>
            <h3>last 7 days</h3>
          </div>
          <base-card>
            <area-chart id="line-chart" :data="expenseChart"> </area-chart>
          </base-card>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
import LastRecords from '../components/views/dashboard/LastRecords.vue';
import CashFlow from '../components/views/dashboard/CashFlow.vue';
import ListAccounts from '../components/views/dashboard/ListAccounts.vue';
import NoAccountsView from '../components/views/dashboard/NoAccountsView.vue';
import AddRecord from '../components/views/AddRecord.vue';

export default {
  name: 'Dashboard',
  components: {
    LastRecords,
    CashFlow,
    ListAccounts,
    NoAccountsView,
    AddRecord,
  },
  data() {
    return {
      selectedID: null, //first by default
      currentAccIncome: null,
      currentAccExpense: null,
      currAccLastRecords: null,
      hasCashFlowSingleAcc: null,
      sumExpenseCategories: null,
      expenseChart: null,
      isLoading: false,
    };
  },
  methods: {
    handleSelectedAcc(id) {
      this.selectedID = id;
    },
    async getCurrAccData() {
      await this.$store.dispatch('dashboard/cashFlowSingleAcc', {
        sid: this.$store.getters.sid,
        acc_id: this.selectedID,
      });
      this.currentAccExpense =
        this.$store.getters['dashboard/cashFlowSingleAcc'].expensive;
      this.currentAccIncome =
        this.$store.getters['dashboard/cashFlowSingleAcc'].income;
      this.hasCashFlowSingleAcc = this.$store.getters['dashboard/hasCashFlow'];
      await this.$store.dispatch('dashboard/lastRecordSingleAcc', {
        sid: this.$store.getters.sid,
        acc_id: this.selectedID,
      });
      this.currAccLastRecords =
        this.$store.getters['dashboard/getLastFiveRecordsSingleAcc'];
      //
      await this.$store.dispatch('dashboard/sumExpenseCategories', {
        sid: this.$store.getters.sid,
        acc_id: this.selectedID,
      });
      this.sumExpenseCategories =
        this.$store.getters['dashboard/sumExpenseCategories'];
      //
      await this.$store.dispatch('dashboard/expenseChart', {
        sid: this.$store.getters.sid,
        acc_id: this.selectedID,
      });
      this.expenseChart = this.$store.getters['dashboard/expenseChart'];
    },
  },

  computed: {
    listOfAccounts() {
      return this.$store.getters['dashboard/listOfAccounts'];
    },
    hasRecords() {
      return !this.isLoading && this.$store.getters['dashboard/hasRecords'];
    },
    hasAccounts() {
      return !this.isLoading && this.$store.getters['dashboard/hasAccounts'];
    },
    getFirstAccID() {
      return this.$store.getters['dashboard/getFirstAccID'];
    },
    getAccTypes() {
      return this.$store.getters['accounts/getListOfAccountsTypes'];
    },
    getAccCurrencies() {
      return this.$store.getters['accounts/getListOfCurrencies'];
    },
    // expenseChart(){
    //   return this.$store.getters['dashboard/expenseChart']
    // }
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('dashboard/listAccounts', {
      sid: this.$store.getters.sid,
    });

    this.selectedID = this.getFirstAccID;
    //! cash flow for 1st acc    WORKING
    await this.$store.dispatch('dashboard/cashFlowSingleAcc', {
      sid: this.$store.getters.sid,
      acc_id: this.selectedID,
    });
    this.currentAccExpense =
      this.$store.getters['dashboard/cashFlowSingleAcc'].expensive;
    this.currentAccIncome =
      this.$store.getters['dashboard/cashFlowSingleAcc'].income;
    this.hasCashFlowSingleAcc = this.$store.getters['dashboard/hasCashFlow'];
    // cash flow preset done

    //Pre set last five records
    await this.$store.dispatch('dashboard/lastRecordSingleAcc', {
      sid: this.$store.getters.sid,
      acc_id: this.selectedID,
    });
    this.currAccLastRecords =
      this.$store.getters['dashboard/getLastFiveRecordsSingleAcc'];
    //
    await this.$store.dispatch('dashboard/sumExpenseCategories', {
      sid: this.$store.getters.sid,
      acc_id: this.selectedID,
    });
    this.sumExpenseCategories =
      this.$store.getters['dashboard/sumExpenseCategories'];
    //
    await this.$store.dispatch('dashboard/expenseChart', {
      sid: this.$store.getters.sid,
      acc_id: this.selectedID,
    });
    this.expenseChart = this.$store.getters['dashboard/expenseChart'];
    this.isLoading = false;
  },
};
</script>
<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
  background-color: rgb(236, 236, 236);
}
#container {
  display: flex;
  flex-direction: column;
  width: 90%;
}
.cards {
  background-color: white;
  width: 33%;
  max-height: 550px;
}
#content {
  display: flex;

  flex-wrap: wrap;
  margin-top: 0rem;
}
.widecard {
  background-color: white;
  width: 64.5%;
  max-height: 550px;
}
#expense-chart {
  color: red;
}

#cardListout {
  display: flex;
  flex-direction: row;
}
#cardListout #cardList {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0.1rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}
h3 {
  margin: 0.5rem;
}

#spinner {
  position: fixed;
  top: 40vh;
  left: 10%;
  width: 80%;
  z-index: 100;
}
.card-title {
  display: flex;
  justify-content: space-between;
}

.noRecord {
  display: flex;
  justify-content: center;
}
.noRecordsTitle {
  display: flex;
  justify-content: space-between;
}
.ikonica {
  margin-top: 2rem;
  height: 200px;
  width: 200px;
}
</style>

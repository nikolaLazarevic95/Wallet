<template lang="">
  <div v-if="hasCashFlowSingleAcc">
    <div id="header">
      <h3>Cash Flow</h3>
      <h4>Last 365 days</h4>
    </div>
    <div>
      <!-- <div>Balance:  {{ cashFlow }}</div> -->
      <div id="divChart">
        <!-- <p>
          Income: <span>{{ setIncome }}</span> Expense: <span>{{ setExpense }}</span>
        </p>-->
        <base-card id="chart">
          <base-card id="chartleft">
            <div>
              <h3>Income</h3>
              <div class="cifra">
                <div class="suma">{{ hasCashFlowSingleAcc.income }}</div>
                <div class="suma">{{ currency }}</div>
              </div>
            </div>
            <div>
              <h3>Expense</h3>
              <div class="cifra">
                <div class="suma">{{ hasCashFlowSingleAcc.expensive }}</div>
                <div class="suma">{{ currency }}</div>
              </div>
            </div>
          </base-card>
          <pie-chart
            :data="[
              ['Income', hasCashFlowSingleAcc.income],
              ['Expense', hasCashFlowSingleAcc.expensive],
            ]"
            :colors="['green', '#b00']"
            width="100%"
            height="100%"
            :donut="true"
          ></pie-chart>
        </base-card>
      </div>
    </div>
  </div>
  <h3 v-else>No Cash Flow found.</h3>
</template>

<script>
// import BarChart from '../../charts/Chart.vue';

export default {
  name: 'CashFlow',
  props: ['hasCashFlowSingleAcc', 'selectedID'],
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {
    // cashFlow() {
    //   return this.setIncome - this.setExpense;
    // },
    // setIncome() {
    //   return this.$store.getters['dashboard/cashFlowSingleAcc'].income;
    // },
    // setExpense() {
    //   return this.$store.getters['dashboard/cashFlowSingleAcc'].expensive;
    // },
    // hasCashFlow() {
    //   console.log(this.$store.getters['dashboard/hasCashFlow']);
    //   return this.$store.getters['dashboard/hasCashFlow'];
    // },
    currency() {
      const data =
        this.$store.getters['dashboard/getLastFiveRecordsSingleAcc'][0];
      return data.cur_short;
    },
  },
  created() {
    // this.$store.dispatch('dashboard/cashFlow', {
    //   sid: this.$store.getters.sid,
    // });
  },
};
</script>
<style scoped>
#header {
  display: flex;
  justify-content: space-between;
}
h4,
h3 {
  margin: 0.5rem;
}
#divChart {
  display: flex;
  justify-content: center;
}
#chart {
  width: 100%;
  height: 100%;
  display: flex;
}
.suma {
  font-size: 20px;
  margin: 0.2rem;
}
#chartleft {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cifra{
  display: flex;
  margin-left: 0.3rem;
}
</style>

export default {
  listOfAccounts(state) {
    return state.listOfAccounts;
  },
  hasAccounts(state) {
    return state.listOfAccounts && state.listOfAccounts.length > 0;
  },
  lastFiveRecords(state) {
    return state.lastFiveRecords;
  },
  hasRecords(state) {
    // return state.getLastFiveRecordsSingleAcc && state.lastFiveRecords.length > 0;
    return (
      state.lastFiveRecordsSingle && state.lastFiveRecordsSingle.length > 0
    );
  },
  cashFlow(state) {
    return state.cashFlow;
  },
  hasCashFlow(state) {
    //console.log(state.cashFlowSingleAcc);
    // return state.cashFlow && state.cashFlow.income && state.cashFlow.expensive;
    return state.cashFlowSingle;
  },
  getFirstAccID(state) {
    //console.log(state.listOfAccounts.acc_id[0]);
    if (state.listOfAccounts.length == 0) {
      return;
    }
    return state.listOfAccounts && state.listOfAccounts[0].acc_id;
  },
  cashFlowSingleAcc(state) {
    return state.cashFlowSingle;
  },
  getLastFiveRecordsSingleAcc(state) {
    // console.log(state.lastFiveRecordsSingle);
    return state.lastFiveRecordsSingle;
  },
  sumExpenseCategories(state) {
    return state.sumExpenseCategories;
  },
  expenseChart(state) {
    return state.expenseChart;
  },
};

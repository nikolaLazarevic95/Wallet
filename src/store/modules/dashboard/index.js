import mutations from './mutations';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      listOfAccounts: null,
      //  "acc_name"
      // "acc_amount"
      // "cur_short", 
      //acc_id, 
      //

      lastFiveRecords: null,
      //[
      // rec_amount: 300.0,
      // cur_short: 'RSD',
      // rec_date: '2022-10-16',
      // acc_name: 'Prvi Acc',
      // cat_name: 'Loans',
      // rec_description: 'Pozajmica',
      // img_parent: null,
      // cat_img_url: URL NEKI,
      //rec_id
      //]

      cashFlow: null, //
      // {
      //    income: number,
      //   expensive: number, should be expenses
      // },
      cashFlowSingle: null,
      //income: number,
      //   expensive: number, should be expenses
      lastFiveRecordsSingle: null,

      sumExpenseCategories: null,
      expenseChart: null
    };
  },
  mutations,
  actions,
  getters,
};

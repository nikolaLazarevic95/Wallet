import mutations from './mutations';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      listCategoriesIncome: null,
      // cat_id, cat_name
      listCategoriesExpense: null,
      //cat_id, cat_name
      listActions: null,
      //"cat_id": 1,
      //"cat_name": "Income"
      listSubExpenseCategories: null,
      //"cat_id": 16,
      // "cat_name": "Restaurant, fast-food"
    };
  },
  mutations,
  actions,
  getters,
};

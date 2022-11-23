import mutations from './mutations';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return{
      getAllRecordsWithFilters: null,
    //   {
    //     "cat_name": "Child Support",
    //     "acc_name": "Prvi acc",
    //     "rec_amount": 1500.00,
    //     "cur_short": "RSD",
    //     "rec_date": "2022-11-10"
    // },
    }
  },
  mutations,
  actions,
  getters,
};

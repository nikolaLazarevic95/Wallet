import { createStore } from 'vuex';
import dashboardModule from './modules/dashboard/index.js';
import authModule from './modules/auth/index';
import recordModule from './modules/addRecord/index';
import accountsModule from './modules/accounts/index';
import analyticsModule from './modules/analytics/index';
import recordsModule from './modules/records/index';
import userAccountModule from './modules/userAccount/index';

const store = createStore({
  modules: {
    dashboard: dashboardModule,
    auth: authModule,
    addRecord: recordModule,
    accounts: accountsModule,
    analytics: analyticsModule,
    records: recordsModule,
    userAccount: userAccountModule,
  },
});

export default store;

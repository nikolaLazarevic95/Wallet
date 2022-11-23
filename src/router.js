import { createRouter, createWebHistory } from 'vue-router';
import Accounts from './pages/accounts/Accounts.vue';
import AccountsDetail from './pages/accounts/AccountsDetail.vue';
import Records from './pages/records/Records.vue';
import RecordsDetail from './pages/records/RecordsDetail.vue';
import Analytics from './pages/Analytics.vue';
import DashBoard from './pages/DashBoard.vue';
import NotFound from './pages/NotFound.vue';
import Settings from './pages/Settings.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/dashboard', component: DashBoard, meta: { requiresAuth: true } },
    {
      path: '/accounts',
      component: Accounts,
      meta: { requiresAuth: true },

      //  children: [{ path: '/:id', component: AccountsDetail }], //acc detail
    },
    {
      path: '/accounts/:id',
      component: AccountsDetail,
      meta: { requiresAuth: true },
    },
    { path: '/analytics', component: Analytics, meta: { requiresAuth: true } },
    {
      path: '/records',
      component: Records,
      meta: { requiresAuth: true },
      //children: [{ path: '/:id', component: RecordsDetail }], //record detail
    },
    {
      path: '/records/:id',
      component: RecordsDetail,
      meta: { requiresAuth: true },
    },

    { path: '/settings', component: Settings, meta: { requiresAuth: true } }, //za klik na user icon gore desno
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFound},
  ],
});


// navigation guard, ako user nije authenticated
router.beforeEach(function (to, from, next) {

  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('./auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated ) {
    next('./dashboard')
  } else {
    next();
  }
});

export default router;

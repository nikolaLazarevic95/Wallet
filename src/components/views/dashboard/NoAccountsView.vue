<template>
  <div>
    <div id="wrapper" v-if="!hasAccounts">
      <div id="content">
        <div id="newLogo">
          <!-- <img id="newlogoimg" src="../../public/logo.png" /> -->
          <img id="newlogoimg" src="../../../../public/logo.png" />
          <div>
            <h1>Wallet</h1>
          </div>
        </div>
        <div id="newLogo">
          <h1>Click on the button below add your first account</h1>
        </div>
        <!-- <img id="notpage" src="../../public/404.png" /> -->
        <!-- <p>
        Sorry, we can't find the page you're looking for. Back on Wallet Main
        page.
      </p> -->
        <add-account
          :getAccTypes="getAccTypes"
          :getAccCurrencies="getAccCurrencies"
        ></add-account>
      </div>
    </div>
    <div id="wrapper" v-else-if="!hasRecords">
      <div id="content">
        <div id="newLogo">
          <!-- <img id="newlogoimg" src="../../public/logo.png" /> -->
          <img id="newlogoimg" src="../../../../public/logo.png" />
          <div>
            <h1>Wallet</h1>
          </div>
        </div>
        <div id="newLogo">
          <h1>Click on the button below add your first Record</h1>
        </div>

        <AddRecord />
      </div>
    </div>
  </div>
</template>

<script>
import AddAccount from '../accounts/AddAccount.vue';
import AddRecord from '../../views/AddRecord.vue';

export default {
  name: 'NoAccountsView',
  components: { AddAccount, AddRecord },

  computed: {
    getAccCurrencies() {
      return this.$store.getters['accounts/getListOfCurrencies'];
    },

    getAccTypes() {
      return this.$store.getters['accounts/getListOfAccountsTypes'];
    },
    hasRecords() {
      return this.$store.getters['dashboard/hasRecords'];
    },
    hasAccounts() {
      return this.$store.getters['dashboard/hasAccounts'];
    },
  },

  async created() {
    await this.$store.dispatch('accounts/listAccTypes');
    await this.$store.dispatch('accounts/listAccCurrencies');

    // this.accType = this.zaType.act_id;
    // this.currency = this.zaCurr.cur_id;
  },
};
</script>

<style scoped>
#wrapper {
  justify-content: center;
  text-align: center;
  height: 90%;
  width: 100%;
  position: absolute;
  display: flex;
}
#content {
  display: inline;
  position: absolute;
  align-items: center;
  top: 20vh;
}
h1 {
  color: #3a0061;
  font-size: 50px;
}
p {
  font-size: 24px;
  color: #3a0061;
}
#newlogoimg {
  height: 100px;
  width: 100px;
}

#newLogo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5rem;
}
#newLogo div h1 {
  font-size: 55px;
  margin: 0;
  text-align: center;
  color: #3a0061;
}
#newLogo div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#notpage {
  height: 400px;
  width: 400px;
}
</style>

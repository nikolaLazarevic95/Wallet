<template>
  <div id="spinner" v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div id="wrapper" v-else>
    <div id="container">
      <div class="header">
        <h1>My accounts</h1>
        <div>
          <AddAccount
            :getAccTypes="getAccTypes"
            :getAccCurrencies="getAccCurrencies"
          ></AddAccount>
        </div>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div id="card" v-else-if="hasAccounts">
        <base-card
          class="cards"
          v-for="data in listOfAccounts"
          :key="data.acc_id"
          @click="getID(data.acc_id, data.acc_name)"
        >
          <div class="left">
            <img id="accImg" :src="data.act_img_url">
            <h3>{{ data.acc_name }}</h3>
          </div>
          <div class="center">
            <span>
              <h4>{{ data.acc_amount }}</h4>
              <h4>{{ data.cur_short }}</h4>
            </span>
          </div>
          <div class="right">
            <base-button class="dugme" mode="outline" @click="toggleEditClick">
              <base-dialog
                :show="editClicked"
                title="Edit"
                @close="handleEditClicked"
              >
                <div id="dd">
                  <div id="container">
                    <form @submit.prevent="editAcc" class="form-control">
                      <div
                        class="form-control"
                        :class="{ invalid: !accName.isValid }"
                      >
                        <label for="accName">Change account name: </label>
                        <input
                          type="text"
                          id="accName"
                          :placeholder="currAccName"
                          v-model="currAccName"
                          @blur="clearValidity('accName')"
                        />
                        <p v-if="!accName.isValid">Can't be empty.</p>
                      </div>
                      <div class="form-control">
                        <label id="label" for="type-select"
                          >Account Type:
                        </label>
                        <div class="select">
                          <select
                            name="type"
                            :value="accType"
                            @click="handleTypeChange"
                          >
                            <option
                              v-for="data in getAccTypes"
                              :key="data.act_id"
                              :value="data.act_id"
                            >
                              <p>{{ data.act_name }}</p>
                            </option>
                          </select>
                        </div>
                      </div>
                      <base-button>Submit</base-button>
                    </form>
                  </div>
                </div>
              </base-dialog>
              Edit</base-button
            >
            <base-button class="dugme" @click="toggleDeleteClick">
              <base-dialog
                :show="deleteClicked"
                title="Are you sure?"
                @close="handleDeleteClicked"
              >
                <div>
                  <div id="paragh">
                    <div id="paraghinner">
                      <p>
                        Do you really want to delete the account? The account
                        will be removed from your budgets. All account's
                        transactions, standing orders and debts will be lost
                        forever.
                      </p>
                    </div>
                  </div>
                  <div id="deleteCoise">
                    <base-button
                      class="YES-NO"
                      mode="outline"
                      @click="handleDeleteClicked"
                      >NO</base-button
                    >
                    <base-button class="YES-NO" @click="deleteAccount"
                      >YES</base-button
                    >
                  </div>
                </div>
              </base-dialog>
              Delete</base-button
            >
          </div>
        </base-card>
      </div>
      <h3 v-else>Nothing found</h3>
    </div>
  </div>
</template>

<script>
// import AccountsDetail from './AccountsDetail.vue';
// import ListAccounts from '../../components/views/dashboard/ListAccounts.vue';
import AddAccount from '../../components/views/accounts/AddAccount.vue';

import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  name: 'Accounts',
  components: { AddAccount },
  data() {
    return {
      accID: null,
      currAccName: null,
      deleteClicked: false,
      editClicked: false,
      accType: null, //first from the response array by default
      accName: { val: this.currAccName, isValid: true },
      formIsValid: true,
      isLoading: false,
    };
  },
  methods: {
    getID(id, name) {
      this.accID = id;
      this.currAccName = name;
      console.log(this.accID);
      console.log(this.currAccName);
    },
    toggleDeleteClick() {
      this.deleteClicked = !this.deleteClicked;
    },
    handleDeleteClicked() {
      this.deleteClicked = false;
    },

    async validateForm() {
      if (this.currAccName == '') {
        (this.accName.isValid = false), (this.formIsValid = false);
      }
    },
    clearValidity(input) {
      // za input
      this[input].isValid = true;
    },
    toggleEditClick() {
      this.editClicked = !this.editClicked;
    },
    handleEditClicked() {
      this.editClicked = false;
    },
    async deleteAccount() {
      // this.isLoading = true;
      await this.$store.dispatch('accounts/deleteAcc', {
        sid: this.$store.getters.sid,
        acc_id: this.accID,
      });
      // this.isLoading = false;
      toast.success('Success!', {
        timeout: 1000,
      });

      this.$router.go();
    },

    async editAcc() {
      // this.isLoading = true;

      await this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      await this.$store.dispatch('accounts/editAcc', {
        sid: this.$store.getters.sid,
        act_id: this.accType,
        acc_name: this.currAccName,
        acc_id: this.accID,
      });

      // this.isLoading = false;

      toast.success('Success!', {
        timeout: 1000,
      });

      this.$router.go();
    },

    handleTypeChange(e) {
      this.accType = e.target.value;
    },
  },

  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    listOfAccounts() {
      return !this.isLoading && this.$store.getters['dashboard/listOfAccounts'];
    },
    //  getAccTypes() {
    //    return this.$store.getters['accounts/getListOfAccountsTypes'];
    //  },
    getAccCurrencies() {
      return this.$store.getters['accounts/getListOfCurrencies'];
    },
    zaType() {
      return this.$store.getters['accounts/getListOfAccountsTypes'][0];
    },
    getAccTypes() {
      return this.$store.getters['accounts/getListOfAccountsTypes'];
    },
    hasAccounts() {
      return !this.isLoading && this.$store.getters['dashboard/hasAccounts'];
    },
  },

  async created() {
    this.isLoading = true;
    this.$store.dispatch('dashboard/listAccounts', {
      sid: this.$store.getters.sid,
    });
    await this.$store.dispatch('accounts/listAccTypes');
    this.accType = this.zaType.act_id;
    this.isLoading = false;
  },
};
</script>

<style scoped>

#spinner {
  position: fixed;
  top: 40vh;
  left: 10%;
  width: 80%;
  z-index: 100;
}
#wrapper {
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: rgb(236, 236, 236);
}
#dd{
  display: flex;
  justify-content: center;
}
#container {
  display: flex;
  flex-direction: column;
  width: 75%;
}

#deleteCoise {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.form-control {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
}

h3,
h4 {
  font-size: 18px;
  margin: 1rem;
  margin-right: 0.5rem;
}
.cards {
  background-color: white;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
#content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
}

#card div {
  display: flex;
  flex-direction: row;
}
#card {
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 0.1rem;
  margin-right: 1rem;
}
.left {
  width: 30%;
}
.center span {
  display: flex;
}
.right {
  width: 25%;
  justify-content: space-between;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 3px solid #ccc;
  border-radius: 8px;
  padding-left: 1rem;
  padding-top: 0.5rem;
  font: inherit;
  background-color: white;
  text-align: left;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.form-control label {
  font-size: 14px;
  margin-bottom: 0.2rem;
  margin-left: 0rem;
}
#accName {
  padding: 0.5rem;
}
.select select {
  cursor: pointer;
  background-color: #3e0267;
  color: white;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 2rem;
}

h1 {
  margin-bottom: 1rem;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}
.button {
  margin-left: 1rem;
}
.dugme {
  width: 45%;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.YES-NO {
  width: 30%;
  margin-top: 1rem;
}
#paragh {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
}
#paraghinner{
  width: 90%;
}
#accImg {
  width: 54px; 
  height: 54px;
  border-radius: 100%;
  overflow: hidden;
}
</style>

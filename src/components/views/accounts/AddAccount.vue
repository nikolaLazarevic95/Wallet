<template>
  <base-button id="addaccbutt" @click="toggleAddAccClick">
    <base-dialog
      :show="addAccClicked"
      title="Add Account"
      @close="handleAddAccClick"
    >
      <div id="wrapper">
        <div id="container">
          <form @submit.prevent="submitForm" class="form-control">
            <div class="form-control" :class="{ invalid: !accName.isValid }">
              <label for="accName">Add account name : </label>
              <input
                type="text"
                id="accName"
                placeholder="Account name"
                v-model="accName.val"
                @blur="clearValidity('accName')"
              />
              <p v-if="!accName.isValid">Can't be empty.</p>
            </div>
            <div class="dropdowns">
            <div class="form-control">
              <label id="label" for="type-select">Account Type: </label>
              <div class="select">
                <select name="type" :value="accType" @click="handleTypeChange">
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
            <div class="form-control">
              <label id="label" for="currency-select">Currency : </label>
              <div class="select">
                <select name="type" :value="currency" @click="handleCurrChange">
                  <option
                    v-for="data in getAccCurrencies"
                    :key="data.cur_id"
                    :value="data.cur_id"
                  >
                    <p>{{ data.cur_short }}</p>
                  </option>
                </select>
              </div>
            </div>
          </div>
            <div id="submit">
            <base-button>Submit</base-button>
          </div>
          </form>
        </div>
      </div>
    </base-dialog>
    Add Account
  </base-button>
</template>

<script>
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  name: 'Add Account',
  props: ['getAccTypes', 'getAccCurrencies'],
  data() {
    return {
      addAccClicked: false,
      accType: null, //first from the response array by default
      currency: null, //first from the response array by default
      accName: { val: '', isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    toggleAddAccClick() {
      this.addAccClicked = !this.addAccClicked;
    },
    handleAddAccClick() {
      this.addAccClicked = false;
    },
    clearValidity(input) {
      // za input
      this[input].isValid = true;
    },
    handleTypeChange(e) {
      this.accType = e.target.value;
    },
    handleCurrChange(e) {
      this.currency = e.target.value;
    },
    async validateForm() {
      if (this.accName.val == '') {
        (this.accName.isValid = false), (this.formIsValid = false);
      }
    },
    async submitForm() {
       this.formIsValid=true
      await this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      await this.$store.dispatch('accounts/submitNewAcc', {
        sid: this.$store.getters.sid,
        act_id: this.accType,
        cur_id: this.currency,
        acc_name: this.accName.val,
      });
      toast.success('Success!', {
        timeout: 1000,
      });

      this.$router.go();
    },
  },
  computed: {
    zaType() {
      return this.$store.getters['accounts/getListOfAccountsTypes'][0];
    },
    zaCurr() {
      return this.$store.getters['accounts/getListOfCurrencies'][0];
    },
  },
  async created() {
    await this.$store.dispatch('accounts/listAccTypes');
    await this.$store.dispatch('accounts/listAccCurrencies');

    this.accType = this.zaType.act_id;
    this.currency = this.zaCurr.cur_id;
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
}
#container {
  width: 90%;
}
.form-control {
  margin: 0.5rem 0;
  justify-content: center;
  align-items: center;
}

.dropdowns .form-control{
  width: 45%;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.form-control label {
  font-size: 14px;
  margin-bottom: 0.2rem;
  margin-left: 1rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
#acc-amount {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
#acc-amount .form-control {
  width: 45%;
}
#amount {
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 12px;
  border-radius: 16px;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 3px solid #ccc;
  border-radius: 16px;
  padding: 0.5rem;
  padding-left: 1rem;
  font: inherit;
  background-color: white;
  text-align: left;
}

input:focus,
textarea:focus {
  background-color: white;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: 50%;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
#date {
  width: 45%;
}
#submit {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: right;
}
p {
  margin: 0px;
}
.error {
  font-size: 12px;
  color: red;
  margin-left: 1rem;
}
#butt {
  background-color: #3d008d;
}
#butt:hover {
  background-color: #270041;
}

.container {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 45%;
  margin-bottom: 0.2rem;
}
#label {
  font-size: 14px;
  margin-bottom: 0.2rem;
  margin-left: 1rem;
  font-weight: bold;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}
.select {
  position: relative;
  display: inline-block;
  font-size: 16px;
  color: #888;
  width: 100%;
}

.dropdowns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.select select {
  cursor: pointer;
  background-color: #3e0267;
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  font-size: 16px;
  border-radius: 16px;
}
#addaccbutt{
  margin-right: 0.7rem;
}
</style>

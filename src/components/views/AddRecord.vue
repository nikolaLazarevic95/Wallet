<template>
  <base-button class="butt" @click="ToggleUserClicked">
    <base-dialog
      :show="recordIsClicked"
      title="Add Record"
      @close="handleUserClicked"
    >
      <div id="wrapper">
        <div id="container">
          <form @submit.prevent="submitForm" class="form-control">
            <list-actions
              @action-type="handleTypeChange"
              @change="resetCategory"
            ></list-actions>
            <div id="acc-amount">
              <account
                @acc-change="handleAccChange"
                :accNames="accNames"
                :firstAcc="firstAcc"
              ></account>
              <div class="form-control" :class="{ invalid: !amount.isValid }">
                <label for="amount">Amount</label>
                <p class="error" v-if="!amount.isValid">
                  Amount must be greater than 0.
                </p>
                <input
                  type="number"
                  id="amount"
                  v-model="amount.val"
                  placeholder="Amount"
                  @blur="clearValidity('amount')"
                />
              </div>
            </div>
            <category-expense
              :expCatNames="expCatNames"
              :expValue="expValue"
              :subExpValue="subExpValue"
              :subExpCatNames="subExpCatNames"
              v-if="type === 2"
              @cat-expense="handleCategoryExp"
              @sub-response="handleSubResponse"
            ></category-expense>
            <category-income
              v-else
              @cat-income="handleCategoryInc"
            ></category-income>

            <div class="form-control">
              <label for="note">Note</label>
              <textarea
                id="note"
                rows="3"
                v-model="note"
                placeholder="Write a note..."
                style="
                  height: 70px;
                  max-height: 150px;
                  min-height: 60px;
                  width: 400px;
                  max-width: 550px;
                  min-width: 250px;
                "
              ></textarea>
            </div>
            <div id="date">
              <label for="date">Date</label>
              <Datepicker
                v-model="date"
                placeholder="Pick a date"
                autoApply
                :enableTimePicker="false"
              ></Datepicker>
            </div>
            <div id="submit">
              <p class="error" v-if="!formIsValid">
                Please fix the above errors and submit again.
              </p>
              <base-button>Add Record</base-button>
            </div>
          </form>
        </div>
      </div>
    </base-dialog>
    + Record
  </base-button>
</template>

<script>
import Account from './formHelp/Account.vue';
import CategoryIncome from './formHelp/CategoryIncome.vue';
import CategoryExpense from './formHelp/CategoryExpense.vue';
import ListActions from './formHelp/ListActions.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import format from 'date-fns/format';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  name: 'AddRecord',
  components: {
    Account,
    CategoryIncome,
    CategoryExpense,
    Datepicker,
    ListActions,
  },
  setup() {
    // Get toast interface
    const toast = useToast();
  },
  data() {
    return {
      recordIsClicked: false,
      //radio button
      type: 2, //dynamic da bude nekad
      //account
      accNames: null,
      firstAcc: null,
      account: null, //dynamic da bude nekad
      amount: { val: null, isValid: true },
      note: null,
      date: new Date(),
      //preset expense categories
      category: null, //sa emita od child-a
      expCatNames: null,
      expValue: null,
      subExpCatNames: null,
      subExpValue: null, //ide ipak u child?

      formIsValid: true,
    };
  },
  methods: {
    resetCategory() {
      //if user changes from income to expense to reset the cat on first element
      this.type === 2
        ? (this.category = this.getFirstExpenseCatId)
        : (this.category = this.geFirstIncomeCatId);
    },
    ToggleUserClicked() {
      this.recordIsClicked = !this.recordIsClicked;
    },
    handleUserClicked() {
      this.recordIsClicked = false;
    },
    clearValidity(input) {
      // za input
      this[input].isValid = true;
    },
    handleTypeChange(event) {
      this.type = event;
    },
    handleAccChange(event) {
      this.account = event.value;
      //this.currency = event.name; ipak nam ne treba currency id ili name
    },
    async handleCategoryExp(event) {
      this.category = event;
      this.invokeExtraCategories();
    },
    handleSubResponse(event) {
      this.category = event;
    },
    handleCategoryInc(event) {
      this.category = event;
    },
    async listCategoriesExpense() {
      await this.$store.dispatch('addRecord/listCategoriesExpense');
      this.expCatNames = this.$store.getters['addRecord/listCategoriesExpense'];
      this.expValue = this.expCatNames[0].cat_id;
    },
    async listFirstAccount() {
      //za preset accounta, ove podatke saljemo u child
      await this.$store.dispatch('dashboard/listAccounts', {
        sid: this.$store.getters.sid,
      });
      this.accNames = this.$store.getters['dashboard/listOfAccounts'];
      this.firstAcc = this.$store.getters['dashboard/listOfAccounts'][0];
    },
    async invokeExtraCategories() {
      await this.$store.dispatch('addRecord/listSubExpenses', {
        cat_id: this.category,
      });
      this.subExpCatNames =
        this.$store.getters['addRecord/listSubExpenseCategories'];
      const firstValId =
        this.$store.getters['addRecord/listSubExpenseCategories'][0];
      this.subExpValue = firstValId.cat_id;
      this.category = firstValId.cat_id; // ovo sam dodao i auto update sad sub za value
      //console.log(this.subExpValue);
    },
    submitForm() {
      if (!this.amount.val || this.amount.val < 0) {
        this.amount.isValid = false;
        this.formIsValid = false;
        return;
      }

      this.$store.dispatch('addRecord/submitRecord', {
        sid: this.$store.getters.sid,
        acc_id: this.account,
        action_id: this.type,
        rec_amount: this.amount.val,
        cat_id: this.category,
        rec_date: this.formattedDate,
        rec_description: this.note,
      });

      toast.success('Success!', {
        timeout: 700,
      });

      this.$router.go();
    },
  },
  computed: {
    getFirstExpenseCatId() {
      const firstExpense =
        this.$store.getters['addRecord/listCategoriesExpense'][0];
      if (!firstExpense) return null;
      return firstExpense.cat_id;
    },
    geFirstIncomeCatId() {
      const firstIncome =
        this.$store.getters['addRecord/listCategoriesIncome'][0];
      if (!firstIncome) return null;
      return firstIncome.cat_id;
    },
    formattedDate() {
      return this.date ? format(this.date, 'yyyy-MM-dd') : '';
    },

    getFirstAccountID() {
      const firstAcc = this.$store.getters['dashboard/listOfAccounts'][0];
      if (!firstAcc) return null;
      //console.log(firstAcc);
      return firstAcc.acc_id;
    },
  },

  async created() {
    await this.listCategoriesExpense(); //preset
    await this.listFirstAccount(); //preset
    this.$store.dispatch('addRecord/listActions');
    this.$store.dispatch('addRecord/listCategoriesIncome');
    this.category = this.getFirstExpenseCatId; //preset
    this.account = this.getFirstAccountID; //preset
    this.invokeExtraCategories();
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
  margin-top: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.form-control label {
  font-size: 14px;
  margin-bottom: 0.2rem;
  margin-left: 0.3rem;
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
  border-radius: 8px;
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
  margin-top: 1rem;
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
.butt {
  background-color: #270041;
}
.butt:hover {
  border:1px solid #270041;
  background-color: #541480;
}
</style>

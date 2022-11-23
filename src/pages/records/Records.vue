<template>
  <div id="spinner" v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div id="wrapper" v-else>
    <div id="container">
      <div id="header">
        <h1>My Records</h1>
      </div>
      <div id="filter-records">
        <div class="filter">
          <base-card id="filterCard">
            <div id="addRec">
              <add-record></add-record>
            </div>
            <form @change.prevent="filterRecords">
              <div class="filter-items">
                <h2>Time span</h2>
                <div class="time">
                  <div class="time-item">
                    <input
                      type="radio"
                      name="date"
                      value="7"
                      v-model="dateSpanSelected"
                    />
                    <label for="7" value="7">Last 7 days</label>
                  </div>
                  <div class="time-item">
                    <input
                      type="radio"
                      name="date"
                      value="31"
                      v-model="dateSpanSelected"
                    />
                    <label for="31">Last 31 days</label>
                  </div>
                  <div class="time-item">
                    <input
                      type="radio"
                      name="date"
                      value="90"
                      v-model="dateSpanSelected"
                    />
                    <label for="90">Last 90 days</label>
                  </div>
                  <div class="time-item">
                    <input
                      type="radio"
                      name="date"
                      value="365"
                      v-model="dateSpanSelected"
                    />
                    <label for="365">Last Year</label>
                  </div>
                  <!-- <div class="time-item">
                    <input
                      type="radio"
                      name="date"
                      value="999999999999999999"
                      v-model="dateSpanSelected"
                    />
                    <label for="999999999999999999">All time</label>
                  </div> -->
                </div>
              </div>

              <div class="filter-items">
                <h2>Accounts</h2>
                <div class="accounts">
                  <div class="accounts-item">
                    <div
                      class="input"
                      v-for="data in listOfAccounts"
                      :id="data.acc_id"
                      :key="data.acc_id"
                      :name="data.acc_name"
                    >
                      <input
                        type="checkbox"
                        :id="data.acc_name"
                        :value="data.acc_id"
                        v-model="accsSelected"
                      />
                    </div>
                  </div>
                  <div class="accounts-item">
                    <div
                      class="labels"
                      v-for="data in listOfAccounts"
                      :key="data.acc_id"
                    >
                      <label :for="data.acc_name"> {{ data.acc_name }}</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="filter-items">
                <h2>Categories</h2>
                <div class="accounts">
                  <div class="accounts-item">
                    <div
                      class="input"
                      v-for="data in listCategoriesExpense"
                      :key="data.cat_id"
                      :name="data.cat_name"
                    >
                      <input
                        type="checkbox"
                        :id="data.cat_name"
                        :value="data.cat_id"
                        v-model="categoriesSelected"
                      />
                    </div>
                    <div
                      class="input"
                      v-for="data in listCategoriesIncome"
                      :key="data.cat_id"
                      :name="data.cat_name"
                    >
                      <input
                        type="checkbox"
                        :id="data.cat_name"
                        :value="data.cat_id"
                        v-model="categoriesSelected"
                      />
                    </div>
                  </div>
                  <div class="accounts-item">
                    <div
                      class="labels"
                      v-for="data in listCategoriesExpense"
                      :key="data.cat_id"
                    >
                      <label :for="data.cat_name">{{ data.cat_name }}</label>
                    </div>
                    <div
                      class="labels"
                      v-for="data in listCategoriesIncome"
                      :key="data.cat_id"
                    >
                      <label :for="data.cat_name">{{ data.cat_name }}</label>
                    </div>
                  </div>
                </div>
                <div class="filter-items">
                  <h2>Account types</h2>
                  <div class="accounts">
                    <div class="accounts-item">
                      <div
                        class="input"
                        v-for="data in getAccTypes"
                        :key="data.act_id"
                        :name="data.act_name"
                      >
                        <input
                          type="checkbox"
                          :id="data.act_name"
                          :value="data.act_id"
                          v-model="typeSelected"
                        />
                      </div>
                    </div>
                    <div class="accounts-item">
                      <div
                        class="labels"
                        v-for="data in getAccTypes"
                        :key="data.act_id"
                      >
                        <label :for="data.act_name">{{ data.act_name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </base-card>
        </div>

        <div class="records">
          <div id="spinner" v-if="isLoadingRec">
            <base-spinner></base-spinner>
          </div>
          <base-card id="recordCard" v-else>
            <div class="listRecords">
              <LastRecordsView
                v-for="(data, index) in listOfFilteredRecords"
                :data="data"
                :key="index"
              ></LastRecordsView>
            </div>
          </base-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LastRecordsView from '../../components/views/records/LastRecordsPageView.vue';
import AddRecord from '../../components/views/AddRecord.vue';

export default {
  name: 'Records PAGE',
  components: { LastRecordsView, AddRecord },
  data() {
    return {
      dateSpanSelected: null,
      accsSelected: [],
      categoriesSelected: [],
      typeSelected: [],
      listOfFilteredRecords: null,
      isLoading: null,
      isLoadingRec: null,
    };
  },
  methods: {
    async initialFilter() {
      await this.$store.dispatch('records/getAllRecordsWithFilters', {
        sid: this.$store.getters.sid,
      });

      this.listOfFilteredRecords =
        this.$store.getters['records/getAllRecordsWithFilters'];
    },

    async filterRecords() {
      this.isLoadingRec = true;

      await this.$store.dispatch('records/getAllRecordsWithFilters', {
        sid: this.$store.getters.sid,
        acc_id: this.accsSelected,
        cat_id: this.categoriesSelected,
        act_id: this.typeSelected,
        date: this.dateSpanSelected, //? kako ga je dzoni nazvao
      });

      this.listOfFilteredRecords =
        this.$store.getters['records/getAllRecordsWithFilters'];
      this.isLoadingRec = false;
    },
  },
  computed: {
    listOfAccounts() {
      return !this.isLoading && this.$store.getters['dashboard/listOfAccounts'];
    },
    listCategoriesExpense() {
      return this.$store.getters['addRecord/listCategoriesExpense'];
    },
    listCategoriesIncome() {
      return this.$store.getters['addRecord/listCategoriesIncome'];
    },
    getAccTypes() {
      return this.$store.getters['accounts/getListOfAccountsTypes'];
    },
    hasRecords() {
      //! posle za prkaz ako nema records
      return !this.isLoading && this.$store.getters['dashboard/hasRecords'];
    },
  },
  async created() {
    this.isLoading = true;
    this.listOfFilteredRecords = this.initialFilter();
    await this.$store.dispatch('addRecord/listCategoriesExpense');
    await this.$store.dispatch('accounts/listAccTypes');
    this.isLoading = false;
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
  height: auto;
  min-height: 100vh;
  background-color: rgb(236, 236, 236);
}
#container {
  width: 90%;
  height: 85vh;
  /* overflow: auto; */
}
#filter-records {
  overflow: hidden;
  height: 90%;
  display: flex;
  flex-direction: row;
}
#spinner {
  position: fixed;
  top: 40vh;
  left: 10%;
  width: 80%;
  z-index: 100;
}
.filter {
  height: 100%;
  /* overflow-y: auto; */
  width: 20%;
}
.records {
  width: 80%;
  height: 100%;
  /* overflow-y: auto; */
}

#filterCard {
  overflow-y: auto;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;

}
.filter-items {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: right;
}
.time {
  display: flex;
  flex-direction: column;
}
.time-item input,
.time-item label {
  margin: 0.2rem;
}
.accounts {
  display: flex;
  flex-direction: row;
}
.accounts-item {
  margin: 0.1rem;
}
.labels {
  margin: 4px;
}
.input {
  margin: 7.8px;
  margin-left: 0;
}
h2 {
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}
#addRec {
  display: flex;
  justify-content: center;
}
#header {
  padding: 2rem;
}
#recordCard {
  overflow-y: auto;
  height: 100%;
  background-color: white;
}
label {
  font-size: 20px;
}
</style>

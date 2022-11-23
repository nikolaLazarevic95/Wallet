<template>
  <div class="container">
    <label id="label" for="exp-cat-select">Category</label>
    <div class="select">
      <select name="exp" id="exp-cat-select" v-model="value" @change="emit">
        <!-- <option :value="null" disabled>Please Select</option> -->
        <option
          v-for="data in expCatNames"
          :key="data.cat_id"
          :value="data.cat_id"
        >
          {{ data.cat_name }}
        </option>
      </select>
      <select
        name="sub-exp"
        id="sub-exp-cat-select"
        :value="subExpValue"
        @change="changeSubVal"
      >
        <option
          v-for="subCat in subExpCatNames"
          :key="subCat.cat_id"
          :value="subCat.cat_id"
        >
          {{ subCat.cat_name }}
        </option>
      </select>
      
    </div>
  </div>
</template>

<script>
export default {
  props: ['expCatNames', 'expValue', 'subExpCatNames', 'subExpValue'],
  emits: ['cat-expense', 'sub-response'],
  name: 'ExpCategory Form Help',
  data() {
    return {
      value: this.expValue,
      //catNames: null,
    };
  },
  methods: {
    emit() {
      this.$emit('cat-expense', this.value);
    },
    changeSubVal(e) {
      // console.log(e.target.value)
      this.$emit('sub-response', e.target.value); //?
    },
  },
 
};

// na klik katergorije da se otvori pod kategorija, i
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
#label {
  font-size: 14px;
  margin-bottom: 0.2rem;
  margin-left: 0.3rem;
  font-weight: bold;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}
.select {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #888;
  width: 100%;
}
#exp-cat-select,
#sub-exp-cat-select {
  width: 45%;
}

.select select {
  cursor: pointer;
  background-color: #3e0267;
  color: white;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 8px;
}
</style>

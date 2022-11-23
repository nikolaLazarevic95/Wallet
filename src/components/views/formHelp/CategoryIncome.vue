<template>
  <div class="container">
  <label id="label" for="inc-cat-select">Category</label>
  <div class="select">
  <select name="cat" id="inc-cat-select" v-model="value" @change="emit">
    <!-- <option :value="null" disabled>Please Select</option> -->

    <option
      v-for="data in catNames"
      :data="data"
      :key="data.cat_id"
      :value="data.cat_id"
    >
      {{ data.cat_name }}
    </option>
  </select>
</div>
</div>
</template>

<script>
export default {
  emits: ['cat-income'],
  name: 'IncCategory Form Help',
  data() {
    return {
      value: null,
      catNames: null,
    };
  },
  methods: {
    emit() {
      this.$emit('cat-income', this.value);
    },
  },
  computed: {},
  created() {
    this.catNames = this.$store.getters['addRecord/listCategoriesIncome'];
    this.value = this.catNames[0].cat_id;
  },
};
</script>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  #label{
    font-size: 14px;
    margin-bottom: 0.2rem;
    margin-left: 0.3rem;
    font-weight: bold;
  }
  *,*::after,*::before{
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
  #inc-cat-select
  {
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

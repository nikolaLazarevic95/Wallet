<template>
  <div class="container">
  <label id="label" for="acc-select">Account</label>
<div class="select">
  <select name="acc"  v-model="value" @change="accChange">
    <option 
      v-for="data in accNames"
      :key="data.acc_id"
      :value="data"
    >
    <p>{{ data.acc_name }} - {{ data.cur_short }}</p>
    </option>
  
  </select>
</div>
</div>
</template>

<script>
export default {
  props:['accNames','firstAcc'],
  emits: ['acc-change'],
  name: 'Account Form Help',
  data() {
    return {
      value: this.firstAcc,
    };
  },
  methods: {
    accChange() {
      this.$emit('acc-change', {
        name: this.value.cur_short,
        value: this.value.acc_id
      });
    },
  },
  
};
</script>
<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    width: 45%;
    margin-bottom: 0.2rem ;
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
    display: inline-block;
    font-size: 16px;
    color: #888;
    width: 100%;
    
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

<template>
  <div>
    <TotalIncomeView />
    <TotalExpenseView />
  </div>
</template>

<script>
import TotalIncomeView from '../components/views/analytics/TotalExpenseView.vue';
import TotalExpenseView from '../components/views/analytics/TotalIncomeView.vue';

export default {
  name: 'Analytics',
  components: { TotalIncomeView, TotalExpenseView },
};
</script>

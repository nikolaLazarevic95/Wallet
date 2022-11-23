<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: ['Income', 'Expense'],
        datasets: [
          {
            //! needs to be computed value, so its dynamic
            data: [
              this.$store.getters['dashboard/cashFlowSingleAcc'].income,
              this.$store.getters['dashboard/cashFlowSingleAcc'].expensive,
            ],
            backgroundColor: ['green', 'red'],
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
          },
        ],
      },
      chartOptions: {
        plugins: {
          legend: {
            display: false,
          },
        },
        chartOptions: {
            plugins:{
                legend: {
                    display: false
                }
           },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
				y: {
					beginAtZero: true,
					grid: {
						color: '#000',
						drawBorder: false 
					}
				},
				x: {
					grid: {
						display: false,
					}
				}
			}
    }
  }
}
}
}

     
</script>
<style scoped>

</style>

<template>
  <Line
    :options="options"
    :data="data"
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
import { defineComponent, computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

export default defineComponent({
  name: 'UiChartOneLine',

  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },

  props: {
    chartId: {
      type: String,
      default: 'one-line-chart',
    },

    datasetIdKey: {
      type: String,
      default: 'label',
    },

    width: {
      type: Number,
      default: 100,
    },

    height: {
      type: Number,
      default: 500,
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
      type: Array,
      default: () => [],
    },

    label: {
      type: String,
      required: true,
    },

    values: {
      type: Array,
      required: true,
    },

    labels: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const data = computed(() => ({
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: props.values,
        },
      ],
    }));

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return {
      options,
      data,
    };
  },
});
</script>

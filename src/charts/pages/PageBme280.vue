<template>
  <chart-box-vue v-model="chartPeriod" :label="chartLabel" :values="chartData" :labels="chartLabels" />
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import ChartBoxVue from '../components/ChartBox.vue';
import { getBmx280Data } from '../api/bme280Api';
import { useChartWrapper } from '../composables/useChartWrapper';

export default defineComponent({
  name: 'PageBme280',

  components: {
    ChartBoxVue,
  },

  props: {
    parameter: {
      type: String,
    },
  },

  setup(props) {
    const bmx280Data = ref([]);

    const { chartLabel, chartPeriod, chartLabels } = useChartWrapper(props.parameter, bmx280Data, getBmx280Data);

    const chartData = computed(() => {
      const field = props.parameter === 'pressure' ? 'press' : props.parameter === 'temperature' ? 'tempr' : 'hum';
      const result = bmx280Data.value.map((item) => (field === 'press' ? item[field] / 133 : item[field]));
      return result;
    });

    return {
      chartLabel,
      chartPeriod,
      chartData,
      chartLabels,
      bmx280Data,
    };
  },
});
</script>

<template>
  <chart-box-vue v-model="chartPeriod" :label="chartLabel" :values="chartData" :labels="chartLabels" />
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import ChartBoxVue from '../components/ChartBox.vue';
import { getZe08Data } from '../api/ze08Api';
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
    const ze08Data = ref([]);

    const { chartLabel, chartPeriod, chartLabels } = useChartWrapper(props.parameter, ze08Data, getZe08Data);

    const chartData = computed(() => {
      const field = 'ch2o';
      const result = ze08Data.value.map((item) => item[field]);
      return result;
    });

    return {
      chartLabel,
      chartPeriod,
      chartData,
      chartLabels,
      ze08Data,
    };
  },
});
</script>

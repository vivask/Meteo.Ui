<template>
  <chart-box-vue v-model="chartPeriod" :label="chartLabel" :values="chartData" :labels="chartLabels" />
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import ChartBoxVue from '../components/ChartBox.vue';
import { getData } from '../api/ze08Api';
import { useChartWrapper } from '../composables/useChartWrapper';

export default defineComponent({
  name: 'PageZe08',

  components: {
    ChartBoxVue,
  },

  props: {
    parameter: {
      type: String,
    },
  },

  setup(props) {
    const data = ref([]);

    const { chartLabel, chartPeriod, chartLabels } = useChartWrapper(props.parameter, data, getData);

    const chartData = computed(() => {
      const field = 'ch2o';
      const result = data.value.map((item) => item[field]);
      return result;
    });

    return {
      chartLabel,
      chartPeriod,
      chartData,
      chartLabels,
      data,
    };
  },
});
</script>

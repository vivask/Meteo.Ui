<template>
  <ui-chart-box-vue>
    <ui-chart-one-line-vue :label="label" :values="chartData" :labels="chartLabels" />
  </ui-chart-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed, toRefs } from 'vue';
import UiChartBoxVue from 'src/app/components/UiChartBox.vue';
import UiChartOneLineVue from 'src/app/components/UiChartOneLine.vue';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';
import { getBmx280Data } from '../api/bme280Api';
import { useUtils } from 'src/app/composables/useUtils';

export default defineComponent({
  name: 'PageBme280',

  components: {
    UiChartBoxVue,
    UiChartOneLineVue,
  },

  props: {
    parameter: {
      type: String,
    },
  },

  setup(props) {
    const layoutStore = useLayoutStore();
    const { shortTime } = useUtils();
    const bmx280Data = ref([]);
    const period = computed(() => layoutStore.periodFilter);
    const range = computed(() => layoutStore.periodFilter);
    const { parameter } = toRefs(props);
    const label = computed(() => props.parameter);
    const chartData = computed(() => {
      const field = props.parameter === 'pressure' ? 'press' : props.parameter === 'temperature' ? 'tempr' : 'hum';
      return bmx280Data.value.map((item) => (field === 'press' ? item[field] / 133 : item[field]));
    });
    const chartLabels = computed(() => {
      return bmx280Data.value.map((item, index) => {
        let date = new Date(begin.value);
        const result = date.setHours(date.getHours() + index);
        return shortTime(result);
      });
    });
    const end = new Date();
    const begin = computed(() => {
      let date = new Date(end);
      if (period.value === 'day') {
        date.setHours(date.getHours() - 24);
      } else if (period.value === 'week') {
        date.setDate(date.getDate() - 7);
      } else if (period.value === 'month') {
        date.setMonth(date.getMonth() - 1);
      } else if (period.value === 'year') {
        date.setFullYear(date.getFullYear() - 1);
      }
      return date;
    });

    const refresh = async () => {
      bmx280Data.value = await getBmx280Data(range.value, period.value, begin.value, end);
    };

    watch(range, () => refresh());
    watch(period, () => refresh());

    onMounted(() => refresh());

    return {
      label,
      chartData,
      chartLabels,
      end,
      begin,
      refresh,
      bmx280Data,
    };
  },
});
</script>

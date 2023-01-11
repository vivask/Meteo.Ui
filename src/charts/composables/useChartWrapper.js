import { computed, ref, watch } from 'vue';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';
import { useUtils } from 'src/app/composables/useUtils';

export function useChartWrapper(sensorParameter, sensorData, api) {
  const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const layoutStore = useLayoutStore();
  const { shortTime, shortDate } = useUtils();
  const period = computed(() => layoutStore.periodFilter.value);
  const range = computed(() => layoutStore.rangeFilter);
  const chartLabel = computed(() => `${range.value.label} ${sensorParameter}`);
  const chartPeriod = ref({});
  const chartLabels = computed(() => {
    return sensorData.value.map((item) => {
      let date = new Date(item.gdate);
      return period.value === 'day'
        ? shortTime(date)
        : period.value === 'year'
        ? monthes[date.getMonth()]
        : shortDate(date);
    });
  });

  const refresh = async () => {
    sensorData.value = await api(range.value.value, period.value, chartPeriod.value.begin, chartPeriod.value.end);
  };

  watch(range, () => refresh());

  watch(chartPeriod, () => refresh(), { deep: true });

  return { chartLabel, chartPeriod, chartLabels };
}

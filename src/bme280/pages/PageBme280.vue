<template>
  <UiChartBox>
    <UiChartOneLine :label="chartLabel" :data="chartData" :labels="chartLabels" />
  </UiChartBox>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import UiChartBox from '../../app/components/UiChartBox.vue';
import UiChartOneLine from '../../app/components/UiChartOneLine.vue';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';

export default defineComponent({
  name: 'PageBme280',

  components: {
    UiChartBox,
    UiChartOneLine,
  },

  setup() {
    const layoutStore = useLayoutStore();
    return {
      chartLabel: 'Temperature',
      chartData: [40, 39, 10, 40, 39, 80, 40],
      chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

      filter: {
        date: 'day',
        range: 'avg',
      },
    };
  },
});
</script>

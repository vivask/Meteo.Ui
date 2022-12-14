<template>
  <UiChartBox>
    <UiChartOneLine
      :label="chartLabel"
      :data="chartData"
      :labels="chartLabels"
    />
  </UiChartBox>
</template>

<script>
import UiChartBox from "src/components/UiChartBox.vue";
import UiChartOneLine from "src/components/UiChartOneLine.vue";

export default {
  components: {
    UiChartBox,
    UiChartOneLine,
  },

  setup() {
    return {
      chartLabel: "Temperature",
      chartData: [40, 39, 10, 40, 39, 80, 40],
      chartLabels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
      filter: {
        date: "day",
        range: "avg",
      },
    };
  },
};
</script>

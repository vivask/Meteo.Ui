<template>
  <UiChartBox>
    <UiChartOneLine
      :label="chartLabel"
      :data="chartData"
      :labels="chartLabels"
    />
    <UiRadioGroup v-model="filter.date" :options="$options.dateFilterOptions" />
  </UiChartBox>
</template>

<script>
import UiChartBox from "src/components/UiChartBox.vue";
import UiChartOneLine from "src/components/UiChartOneLine.vue";
import UiRadioGroup from "src/components/UiRadioGroup.vue";

export default {
  components: {
    UiChartBox,
    UiChartOneLine,
    UiRadioGroup,
  },

  dateFilterOptions: [
    { text: "Day", value: "day" },
    { text: "Week", value: "week" },
    { text: "Month", value: "month" },
    { text: "Year", value: "year" },
  ],

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

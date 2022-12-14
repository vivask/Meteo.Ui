export const useMenuFilters = [
  {
    value: "day",
    show: false,
    options: [
      { text: "Day", value: "day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" },
      { text: "Year", value: "year" },
    ],
    icon: "mdi-dots-square",
  },
  {
    value: "avg",
    show: false,
    options: [
      { text: "Average", value: "avg" },
      { text: "Minimum", value: "min" },
      { text: "Maximum", value: "max" },
    ],
    icon: "mdi-dots-vertical",
  },
  {
    value: "all",
    show: false,
    options: [
      { text: "All", value: "all" },
      { text: "Verified", value: "verified" },
      { text: "Unverified", value: "unverified" },
      { text: "Suspect", value: "suspect" },
    ],
    icon: "drag_indicator",
  },
];

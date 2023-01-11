export const usePeriodFilters = {
  value: null,
  label: null,
  show: false,
  options: [
    { text: 'Day', value: 'day' },
    { text: 'Week', value: 'week' },
    { text: 'Month', value: 'month' },
    { text: 'Year', value: 'year' },
  ],
  routes: ['/bme280/temperature', '/bme280/pressure', '/bme280/humidity', '/ze08ch2o/ch2o'],
  icon: 'mdi-dots-square',
};

export const useRangeFilters = {
  value: null,
  label: null,
  show: false,
  options: [
    { text: 'Average', value: 'avg' },
    { text: 'Minimum', value: 'min' },
    { text: 'Maximum', value: 'max' },
  ],
  routes: ['/bme280/temperature', '/bme280/pressure', '/bme280/humidity', '/ze08ch2o/ch2o'],
  icon: 'mdi-dots-vertical',
};

export const useUsersFilters = {
  value: null,
  label: null,
  show: false,
  options: [
    { text: 'All', value: 'all' },
    { text: 'Verified', value: 'verified' },
    { text: 'Unverified', value: 'unverified' },
    { text: 'Suspect', value: 'suspect' },
  ],
  routes: ['/radius/accounting'],
  icon: 'drag_indicator',
};

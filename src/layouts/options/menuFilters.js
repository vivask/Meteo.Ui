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
  routes: [
    '/gy39v3/temperature',
    '/gy39v3/pressure',
    '/gy39v3/humidity',
    '/gy39v3/lux',
    '/radsens/static',
    '/radsens/dynamic',
    '/ze08ch2o/ch2o',
    '/aht25/tempr',
    '/aht25/hum',
    '/sc16/co',
  ],
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
  routes: [
    '/gy39v3/temperature',
    '/gy39v3/pressure',
    '/gy39v3/humidity',
    '/gy39v3/lux',
    '/radsens/static',
    '/radsens/dynamic',
    '/ze08ch2o/ch2o',
    '/aht25/tempr',
    '/aht25/hum',
    '/sc16/co',
  ],
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

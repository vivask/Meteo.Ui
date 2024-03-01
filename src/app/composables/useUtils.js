import { date } from 'quasar';

export function useUtils() {
  const formatLongDate = (time) => (isEmptyTime(time) ? 'NaN' : date.formatDate(time, 'MMM DD, YYYY HH:mm:ss'));
  const shortDate = (time) => date.formatDate(time, 'YYYY-MM-DD');
  const shortTime = (time) => date.formatDate(time, 'HH:mm:ss');

  const isEmptyTime = (time) => {
    const unix = date.formatDate(time, 'X');
    return unix == -62135596800 || unix == -62135596784;
  };

  const activeIcon = (active) => (active ? 'task_alt' : 'highlight_off');

  const activeColor = (active) => (active ? 'positive' : 'grey');

  const duration = (time) => date.formatDate(new Date(), 'X') - date.formatDate(time, 'X');

  const isTime = (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v);

  // const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v);

  const isDate = (v) => {
    const date = new Date(v);
    return date instanceof Date && !isNaN(date);
  };

  return {
    formatLongDate,
    isEmptyTime,
    activeIcon,
    activeColor,
    shortDate,
    shortTime,
    duration,
    isDate,
    isTime,
  };
}

import { date } from 'quasar';

export function useUtils() {
  const formatLongDate = (time) => (isEmptyTime(time) ? '--' : date.formatDate(time, 'MMM DD, YYYY HH:mm:ss'));
  const shortDate = (time) => date.formatDate(time, 'YYYY-MM-DD');
  const shortTime = (time) => date.formatDate(time, 'HH:mm:ss');

  const isEmptyTime = (time) => {
    const unix = date.formatDate(time, 'X');
    return unix == -62135596800 || unix == -62135596784;
  };

  const activeIcon = (active) => (active ? 'task_alt' : 'highlight_off');

  const activeColor = (active) => (active ? 'positive' : 'grey');

  return { formatLongDate, isEmptyTime, activeIcon, activeColor, shortDate, shortTime };
}

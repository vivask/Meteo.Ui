import { date } from 'quasar';

export function useUtils() {
  const formatLongDate = (time) => {
    return date.formatDate(time, 'MMM DD, YYYY HH:mm:ss');
  };

  const isEmptyTime = (time) => {
    return date.formatDate(time, 'X') == -62135596800;
  };

  const activeIcon = (active) => (active ? 'task_alt' : 'highlight_off');

  const activeColor = (active) => (active ? 'positive' : 'grey');

  return { formatLongDate, isEmptyTime, activeIcon, activeColor };
}

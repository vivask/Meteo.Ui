import { ref } from 'vue';
import { lockBmx280, lockDs18b20, lockRadsens, lockMics6814, lockZe08, lockAht25 } from '../api/settingApi';

export function useSensors(status) {
  const sensors = ref([
    {
      label: 'BMP280',
      state: status.bmx280_lock,
      func: lockBmx280,
    },
    {
      label: 'DS18B20',
      state: status.ds18b20_lock,
      func: lockDs18b20,
    },
    {
      label: 'Radsens',
      state: status.radsens_lock,
      func: lockRadsens,
    },
    {
      label: 'MICS6814',
      state: status.mics6814_lock,
      func: lockMics6814,
    },
    {
      label: 'ZE08',
      state: status.ze08_lock,
      func: lockZe08,
    },
    {
      label: 'AHT25',
      state: status.aht25_lock,
      func: lockAht25,
    },
  ]);

  return { sensors };
}

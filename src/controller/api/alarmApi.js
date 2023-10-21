import { jwtClient } from '../../app/api/jwtClient';

/**
 * Request alarms setting
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getAlarms() {
  const empty = {};
  return jwtClient
    .get('/esp32/settings')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Update alarms setting
 * @param settings
 */
export function setAlarms(settings) {
  settings.max_6814_nh3 = parseFloat(settings.max_6814_nh3);
  settings.max_6814_no2 = parseFloat(settings.max_6814_no2);
  settings.max_6814_co = parseFloat(settings.max_6814_co);
  settings.min_ds18b20 = parseFloat(settings.min_ds18b20);
  settings.max_ds18b20 = parseFloat(settings.max_ds18b20);
  settings.min_bmx280_tempr = parseFloat(settings.min_bmx280_tempr);
  settings.max_bmx280_tempr = parseFloat(settings.max_bmx280_tempr);
  settings.max_rad_stat = parseFloat(settings.max_rad_stat);
  settings.max_rad_dyn = parseFloat(settings.max_rad_dyn);
  settings.max_ch2o = parseFloat(settings.max_ch2o);

  jwtClient.put('/esp32/settings', settings);
}

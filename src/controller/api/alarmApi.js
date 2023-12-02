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
  jwtClient.get('/esp32/settings').then(({ success, result }) => {
    if (success) {
      result.min_gy39v3 = parseFloat(settings.min_gy39v3);
      result.max_gy39v3 = parseFloat(settings.max_gy39v3);
      result.min_aht25_t = parseFloat(settings.min_aht25_t);
      result.max_aht25_t = parseFloat(settings.max_aht25_t);
      result.min_aht25_h = parseFloat(settings.min_aht25_h);
      result.max_aht25_h = parseFloat(settings.max_aht25_h);
      result.max_sc16 = parseFloat(settings.max_sc16);
      result.max_rad_stat = parseFloat(settings.max_rad_stat);
      result.max_rad_dyn = parseFloat(settings.max_rad_dyn);
      result.max_ch2o = parseFloat(settings.max_ch2o);
      jwtClient.put('/esp32/settings', result);
    }
  });
}

import { jwtClient } from '../../app/api/jwtClient';
import { useUtils } from '../../app/composables/useUtils';

const MAX_DATA_UPDATE_PERIOD_S = 12;

const { duration } = useUtils();

/**
 * Request controller status
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getEsp32State() {
  const empty = { alive: false };
  return jwtClient
    .get('/esp32/status')
    .then(({ success, result }) => {
      return !success
        ? empty
        : {
            alive: duration(result.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S,
            core_0_load: parseFloat(result.cpu0_load).toFixed(1),
            core_1_load: parseFloat(result.cpu1_load).toFixed(1),
          };
    })
    .catch(() => {
      return empty;
    });
}

/**
 * Upgrade controller firmware
 * @param file
 */
export function upgradeFirmware(file) {
  let data = new FormData();
  data.append('firmware', file.value);
  jwtClient
    .post('/esp32/upgrade', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      file.value = null;
    });
}

/**
 * Activae setup mode on esp32
 */
export function setupMode() {
  jwtClient.put('esp32/setup').then(() => {});
}

/**
 * Rebott esp32
 */
export function reboorEsp32() {
  jwtClient.put('esp32/reboot').then(() => {});
}

/**
 * Rebott avr
 */
export function reboorAvr() {
  jwtClient.put('esp32/reboot/avr').then(() => {});
}

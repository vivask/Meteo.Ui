import { jwtClient } from '../../app/api/jwtClient';
import { useUtils } from '../../app/composables/useUtils';

const MAX_DATA_UPDATE_PERIOD_S = 12;

const { duration } = useUtils();

/**
 * Request controller status
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getControllerState() {
  const empty = { alive: false };
  return jwtClient
    .get('/esp32/sensors/state')
    .then(({ success, result }) => {
      return !success
        ? empty
        : {
            alive: duration(result.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S,
            aht25_lock: result.aht25_lock,
            radsens_lock: result.radsens_lock,
            gy39v3_lock: result.gy39v3_lock,
            sc16_lock: result.sc16_lock,
            ze08_lock: result.ze08_lock,
          };
    })
    .catch(() => {
      return empty;
    });
}

/**
 * Upgrade esp32 firmware
 * @param file
 */
export function upgradeEsp32Firmware(file) {
  let data = new FormData();
  data.append('firmware', file);
  jwtClient
    .post('/esp32/upgrade/esp32', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      file = null;
    });
}

/**
 * Upgrade stm32 firmware
 * @param file
 */
export function upgradeStm32Firmware(file) {
  let data = new FormData();
  data.append('firmware', file);
  jwtClient
    .post('/esp32/upgrade/stm32', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      file = null;
    });
}

/**
 * Activae setup mode on esp32
 */
export function setupMode() {
  jwtClient.put('esp32/reset/ap').then(() => {});
}

/**
 * Reboot stm32 & esp32
 */
export function rebootEsp32() {
  jwtClient.put('esp32/reset/esp32').then(() => {});
}

/**
 * Lock/Unlock GY39V3
 */
export function lockGy39v3(val) {
  const url = '/esp32/lock/gy39v3/' + val;
  console.log(url);
  jwtClient.put(url).then(() => {});
}

/**
 * Lock/Unlock radsens
 */
export function lockRadsens(val) {
  const url = '/esp32/lock/radsens/' + val;
  console.log(url);
  jwtClient.put(url).then(() => {});
}

/**
 * Lock/Unlock SC16
 */
export function lockSc16(val) {
  const url = '/esp32/lock/sc16/' + val;
  console.log(url);
  jwtClient.put(url).then(() => {});
}

/**
 * Lock/Unlock ze08
 */
export function lockZe08(val) {
  const url = '/esp32/lock/ze08/' + val;
  console.log(url);
  jwtClient.put(url).then(() => {});
}

/**
 * Lock/Unlock aht25
 */
export function lockAht25(val) {
  const url = '/esp32/lock/aht25/' + val;
  console.log(url);
  jwtClient.put(url).then(() => {});
}

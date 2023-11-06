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
            bmx280_lock: result.bmx280_lock,
            ds18b20_lock: result.ds18b20_lock,
            mics6814_lock: result.mics6814_lock,
            radsens_lock: result.radsens_lock,
            ze08_lock: result.ze08_lock,
            aht25_lock: result.aht25_lock,
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
  data.append('firmware', file.value);
  jwtClient
    .post('/esp32/upgrade/esp32', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      file.value = null;
    });
}

/**
 * Upgrade stm32 firmware
 * @param file
 */
export function upgradeStm32Firmware(file) {
  let data = new FormData();
  data.append('firmware', file.value);
  jwtClient
    .post('/esp32/upgrade/stm32', data, {
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
  jwtClient.put('esp32/reset/ap').then(() => {});
}

/**
 * Reboot stm32 & esp32
 */
export function rebootStm32() {
  jwtClient.put('esp32/reset/stm32').then(() => {});
}

/**
 * Reboot avr
 */
export function rebootAvr() {
  jwtClient.put('esp32/reset/avr').then(() => {});
}

/**
 * Lock/Unlock bmx280
 */
export function lockBmx280(val) {
  const url = '/esp32/lock/bmx280/' + val;
  console.log(url);
  jwtClient.put(url).then(() => {});
}

/**
 * Lock/Unlock ds18b20
 */
export function lockDs18b20(val) {
  const url = '/esp32/lock/ds18b20/' + val;
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
 * Lock/Unlock mics6814
 */
export function lockMics6814(val) {
  const url = '/esp32/lock/mics6814/' + val;
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

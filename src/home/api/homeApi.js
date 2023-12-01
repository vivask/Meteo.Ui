import { webClient } from '../../app/api/webClient';
import { jwtClient } from '../../app/api/jwtClient';
import { useUtils } from '../../app/composables/useUtils';

const MAX_DATA_UPDATE_PERIOD_S = 12;

const { duration } = useUtils();

/**
 * Request controller peripheral data
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getEsp32Data() {
  const empty = {
    data: {},
    alive: {
      aht25: false,
      radsens: false,
      gy39v3: false,
      sc16co: false,
      ze08ch2o: false,
    },
    available: false,
  };

  return webClient
    .get('/esp32/peripheral')
    .then(({ success, result }) => {
      const response = {
        data: result,
        alive: {
          aht25: duration(result.aht25_created) < MAX_DATA_UPDATE_PERIOD_S,
          radsens: duration(result.radsens_created) < MAX_DATA_UPDATE_PERIOD_S,
          gy39v3: duration(result.gy39v3_created) < MAX_DATA_UPDATE_PERIOD_S,
          sc16co: duration(result.sc16_created) < MAX_DATA_UPDATE_PERIOD_S,
          ze08ch2o: duration(result.ze08_created) < MAX_DATA_UPDATE_PERIOD_S,
        },
        available: duration(result.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S,
      };
      return success ? response : empty;
    })
    .catch(() => {
      return empty;
    });
}

/**
 * Reset gy39v3 temperature alarm
 */
export function checkGy39v3TemperatureAlarm() {
  jwtClient.put('/esp32/gy39v3/temperature');
}

/**
 * Reset aht25 temperature alarm
 */
export function checkAht25TemperatureAlarm() {
  jwtClient.put('/esp32/aht25/temperature');
}

/**
 * Reset bme280 temperature alarm
 */
export function checkBme280TemperatureAlarm() {
  jwtClient.put('/esp32/bme280/temperature');
}

/**
 * Reset ds18b20 temperature alarm
 */
export function checkDs18b20TemperatureAlarm() {
  jwtClient.put('/esp32/ds18b20/temperature');
}

/**
 * Reset mics6814 no2 alarm
 */
export function checkMics6814No2Alarm() {
  jwtClient.put('/esp32/mics6814/no2');
}

/**
 * Reset mics6814 nh3 alarm
 */
export function checkMics6814Nh3Alarm() {
  jwtClient.put('/esp32/mics6814/nh3');
}

/**
 * Reset mics6814 co alarm
 */
export function checkMics6814CoAlarm() {
  jwtClient.put('/esp32/mics6814/co');
}

/**
 * Calibrate mics6814
 */
export function toggleAvrReset() {
  jwtClient.put('/esp32/mics6814/calibrate');
}

/**
 * Reset radsens static alarm
 */
export function checkRadsensStaticAlarm() {
  jwtClient.put('/esp32/radsens/static');
}

/**
 * Reset radsens dynamic alarm
 */
export function checkRadsensDynamicAlarm() {
  jwtClient.put('/esp32/radsens/dynamic');
}

/**
 * Reset sc16 co alarm
 */
export function checkSc16Alarm() {
  jwtClient.put('/esp32/sc16/co');
}

/**
 * Reset ze08 ch2o alarm
 */
export function checkZe08CH2OAlarm() {
  jwtClient.put('/esp32/ze08ch2o/ch2o');
}

/**
 * Toggle hv generator radsens
 */
export function toggleHvRadsens() {
  jwtClient.put('/esp32/radsens/hv');
}

/**
 * Set sensetivity radsens
 */
export function setSensitilvity(sensitivity) {
  const url = '/esp32/radsens/sens/' + sensitivity;
  jwtClient.put(url);
}

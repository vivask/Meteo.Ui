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
      bme280: false,
      mics6814: false,
      radsens: false,
      ds18b20: false,
      ze08ch2o: false,
      aht25: false,
    },
    available: false,
  };

  return webClient
    .get('/esp32/peripheral')
    .then(({ success, result }) => {
      const response = {
        data: result,
        alive: {
          bme280: duration(result.bmx280_created) < MAX_DATA_UPDATE_PERIOD_S,
          mics6814: duration(result.mics6814_created) < MAX_DATA_UPDATE_PERIOD_S,
          radsens: duration(result.radsens_created) < MAX_DATA_UPDATE_PERIOD_S,
          ds18b20: duration(result.ds18b20_created) < MAX_DATA_UPDATE_PERIOD_S,
          ze08ch2o: duration(result.ze08_created) < MAX_DATA_UPDATE_PERIOD_S,
          aht25: duration(result.aht25_created) < MAX_DATA_UPDATE_PERIOD_S,
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

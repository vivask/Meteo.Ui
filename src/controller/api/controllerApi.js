import { webClient } from './webClient';
import { jwtClient } from '../../shared/api/jwtClient';
import { date } from 'quasar';

const MAX_DATA_UPDATE_PERIOD_S = 12;

const duration = (time) => date.formatDate(new Date(), 'X') - date.formatDate(time, 'X');

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
        },
        available: duration(result.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S,
      };
      return success ? response : empty;
    })
    .catch(() => {
      return empty;
    });
}

import { tableWrapper } from '../../app/api/tableWrapper.js';
import { jwtClient } from '../../app/api/jwtClient';

const api = '/communal';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export async function getCommunal() {
  const empty = [];
  return jwtClient
    .get(api)
    .then(({ success, result }) => {
      if (!success) {
        return empty;
      } else {
        for (let i = 0; i < result.length; i++) {
          if (i + 1 < result.length) {
            result[i].elec_consumption =
              result[i].elec_measured - result[i + 1].elec_measured + result[i].elec_verification;
            result[i].gas_consumption =
              result[i].gas_measured - result[i + 1].gas_measured + result[i].gas_verification;
            result[i].water_consumption =
              result[i].water_measured - result[i + 1].water_measured + result[i].water_verification;
          }
        }
        return result;
      }
    })
    .catch(() => empty);
}

export default {};

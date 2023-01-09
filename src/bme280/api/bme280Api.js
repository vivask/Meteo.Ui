import { webClient } from 'src/app/api/webClient';

/**
 * Request bme280 data
 * @returns {Promise<ResultContainer<any>>}
 * @param range
 * @param period
 */
export async function getBmx280Data(range, spsing, begin, end) {
  const empty = [];
  const url = `/esp32/bmx280/${range}/${spsing}`;
  return webClient
    .post('/esp32/bmx280/min/day', { begin, end })
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

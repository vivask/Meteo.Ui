import { webClient } from 'src/app/api/webClient';

/**
 * Request bme280 data
 * @returns {Promise<ResultContainer<any>>}
 * @param range
 * @param period
 */
export async function getBmx280Data(range, period, begin, end) {
  const empty = [];
  const url = `/esp32/bmx280/${range}/${period}`;
  return webClient
    .post(url, { begin, end })
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

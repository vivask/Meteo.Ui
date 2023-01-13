import { webClient } from 'src/app/api/webClient';

/**
 * Request ds18b20 data
 * @returns {Promise<ResultContainer<any>>}
 * @param range
 * @param period
 */
export async function getData(range, period, begin, end) {
  const empty = [];
  const url = `/esp32/ds18b20/${range}/${period}`;
  return webClient
    .post(url, { begin, end })
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}
import { webClient } from '../../app/api/webClient';

/**
 * Request sc16 data
 * @returns {Promise<ResultContainer<any>>}
 * @param range
 * @param period
 */
export async function getData(range, period, begin, end) {
  const empty = [];
  const url = `/esp32/sc16/${range}/${period}`;
  return webClient
    .post(url, { begin, end })
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

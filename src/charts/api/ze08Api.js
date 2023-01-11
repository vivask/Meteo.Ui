import { webClient } from 'src/app/api/webClient';

/**
 * Request ze08ch2o data
 * @returns {Promise<ResultContainer<any>>}
 * @param range
 * @param period
 */
export async function getZe08Data(range, period, begin, end) {
  const empty = [];
  const url = `/esp32/ze08ch2o/${range}/${period}`;
  return webClient
    .post(url, { begin, end })
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}
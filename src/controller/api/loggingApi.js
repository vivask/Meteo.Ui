import { jwtClient } from '../../shared/api/jwtClient';

/**
 * Request logging esp32
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getLogging() {
  const empty = {};
  return jwtClient
    .get('/esp32/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Clear logging esp32
 * @param rows
 */
export async function clearLogging(rows) {
  jwtClient.put('/esp32/logging').then(({ success }) => {
    if (success) rows.value = [];
  });
}

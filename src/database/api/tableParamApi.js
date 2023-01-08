import { jwtClient } from 'src/app/api/jwtClient';

/**
 * Request sync types
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getSyncTypes() {
  const empty = [];
  return jwtClient
    .get('/database/stypes')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

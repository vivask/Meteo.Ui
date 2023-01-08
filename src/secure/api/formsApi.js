import { jwtClient } from 'src/app/api/jwtClient';

/**
 * Request ssh keys
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getSshKeys() {
  const empty = [];
  return jwtClient
    .get('/sshclient/sshkeys')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

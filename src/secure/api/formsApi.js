import { jwtClient } from '../../shared/api/jwtClient';

export async function getSshKeys() {
  const empty = [];
  return jwtClient
    .get('/sshclient/sshkeys')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

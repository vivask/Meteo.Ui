import { jwtClient } from '../../shared/api/jwtClient';

export async function getVpnLists() {
  const empty = [];
  return jwtClient
    .get('/proxy/vpnlists')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

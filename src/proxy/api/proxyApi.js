import { jwtClient } from '../../shared/api/jwtClient';

/**
 * Request proxy servers status
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getProxyState() {
  const empty = { main: null, backup: null };
  return jwtClient
    .get('/proxy/status')
    .then(({ success, result }) => {
      return !success
        ? empty
        : {
            main: result[0].main ? result[0] : result[1],
            backup: result[0].main ? result[1] : result[0],
          };
    })
    .catch(() => {
      return empty;
    });
}

const toggleProxyState = (active, start, stop) => {
  if (active) {
    jwtClient.put(start);
  } else {
    jwtClient.put(stop);
  }
};

export function toggleActiveMain(toggle) {
  toggleProxyState(toggle, '/proxy/main/server/start', '/proxy/main/server/stop');
}

export function toggleAdblockMain(toggle) {
  toggleProxyState(toggle, '/proxy/main/adblock/on', '/proxy/main/adblock/off');
}

export function toggleCacheMain(toggle) {
  toggleProxyState(toggle, '/proxy/main/cache/on', '/proxy/main/cache/off');
}

export function toggleUnlockMain(toggle) {
  toggleProxyState(toggle, '/proxy/main/unlock/on', '/proxy/main/unlock/off');
}

export function toggleActiveBackup(toggle) {
  toggleProxyState(toggle, '/proxy/backup/server/start', '/proxy/backup/server/stop');
}

export function toggleAdblockBackup(toggle) {
  toggleProxyState(toggle, '/proxy/backup/adblock/on', '/proxy/backup/adblock/off');
}

export function toggleCacheBackup(toggle) {
  toggleProxyState(toggle, '/proxy/backup/cache/on', '/proxy/backup/cache/off');
}

export function toggleUnlockBackup(toggle) {
  toggleProxyState(toggle, '/proxy/backup/unlock/on', '/proxy/backup/unlock/off');
}

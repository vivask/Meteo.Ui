import { jwtClient } from 'src/app/api/jwtClient';

/**
 * Request backup servers status
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getState() {
  const empty = [];
  return jwtClient
    .get('/backup/state')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

export function RestartKodi() {
  jwtClient.put('/backup/kodi/restart');
}

export function RestartStorage() {
  jwtClient.put('/backup/storage/restart');
}

export function StopStorage() {
  jwtClient.put('/backup/storage/stop');
}

export function StartStorage() {
  jwtClient.put('/backup/storage/start');
}

export function RestartClusterCont() {
  jwtClient.put('/backup/restart/cluster').then(() => {
    getState();
  });
}

export function StartClusterCont() {
  jwtClient.put('/backup/start/cluster').then(() => {
    getState();
  });
}

export function StopClusterCont() {
  jwtClient.put('/backup/stop/cluster').then(() => {
    getState();
  });
}

export function RestartMessangerCont() {
  jwtClient.put('/backup/restart/messanger').then(() => {
    getState();
  });
}

export function StopMessangerCont() {
  jwtClient.put('/backup/stop/messanger').then(() => {
    getState();
  });
}

export function StartMessangerCont() {
  jwtClient.put('/backup/start/messanger').then(() => {
    getState();
  });
}

export function RestartSshclientCont() {
  jwtClient.put('/backup/restart/sshclient').then(() => {
    getState();
  });
}

export function StopSshclientCont() {
  jwtClient.put('/backup/stop/sshclient').then(() => {
    getState();
  });
}

export function StartSshclientCont() {
  jwtClient.put('/backup/start/sshclient').then(() => {
    getState();
  });
}

export function RestartScheduleCont() {
  jwtClient.put('/backup/restart/schedule').then(() => {
    getState();
  });
}

export function StopScheduleCont() {
  jwtClient.put('/backup/stop/schedule').then(() => {
    getState();
  });
}

export function StartScheduleCont() {
  jwtClient.put('/backup/start/schedule').then(() => {
    getState();
  });
}

export function RestartProxyCont() {
  jwtClient.put('/backup/restart/proxy').then(() => {
    getState();
  });
}

export function StopProxyCont() {
  jwtClient.put('/backup/stop/proxy').then(() => {
    getState();
  });
}

export function StartProxyCont() {
  jwtClient.put('/backup/start/proxy').then(() => {
    getState();
  });
}

export function RestartServerCont() {
  jwtClient.put('/backup/restart/server').then(() => {
    getState();
  });
}

export function StopServerCont() {
  jwtClient.put('/backup/stop/server').then(() => {
    getState();
  });
}

export function StartServerCont() {
  jwtClient.put('/backup/start/server').then(() => {
    getState();
  });
}

export function RestartWebCont() {
  jwtClient.put('/backup/restart/web').then(() => {
    getState();
  });
}

export function StopWebCont() {
  jwtClient.put('/backup/stop/web').then(() => {
    getState();
  });
}

export function StartWebCont() {
  jwtClient.put('/backup/start/web').then(() => {
    getState();
  });
}

export function RestartEsp32Cont() {
  jwtClient.put('/main/restart/esp32').then(() => {
    getState();
  });
}

export function StopEsp32Cont() {
  jwtClient.put('/main/stop/esp32').then(() => {
    getState();
  });
}

export function StartEsp32Cont() {
  jwtClient.put('/main/start/esp32').then(() => {
    getState();
  });
}

export function RestartPostgresCont() {
  jwtClient.put('/backup/restart/postgres').then(() => {
    getState();
  });
}

export function StopPostgresCont() {
  jwtClient.put('/backup/stop/postgres').then(() => {
    getState();
  });
}

export function StartPostgresCont() {
  jwtClient.put('/backup/start/postgres').then(() => {
    getState();
  });
}

export function Reboot() {
  jwtClient.put('/backup/reboot').then(() => {
    getState();
  });
}

export function Shutdown() {
  jwtClient.put('/backup/shutdown').then(() => {
    getState();
  });
}

import { jwtClient } from 'src/app/api/jwtClient';

/**
 * Request main servers status
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getState() {
  const empty = [];
  return jwtClient
    .get('/main/state')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

export function RunJobsTransmission() {
  jwtClient.put('/main/transmission/jobs/start');
}

export function StopJobsTransmission() {
  jwtClient.put('/main/transmission/jobs/stop');
}

export function RestartTransmission() {
  jwtClient.put('/main/transmission/restart');
}

export function StopTransmission() {
  jwtClient.put('/main/transmission/stop');
}

export function StartTransmission() {
  jwtClient.put('/main/transmission/start');
}

export function RestartSamba() {
  jwtClient.put('/main/samba/restart');
}

export function StopSamba() {
  jwtClient.put('/main/samba/stop');
}

export function StartSamba() {
  jwtClient.put('/main/samba/start');
}

export function RemountStorage() {
  jwtClient.put('/main/storage/remount');
}

export function UmountStorage() {
  jwtClient.put('/main/storage/umount');
}

export function MountStorage() {
  jwtClient.put('/main/storage/mount');
}

export function RestartClusterCont() {
  jwtClient.put('/main/restart/cluster').then(() => {
    getState();
  });
}

export function StartClusterCont() {
  jwtClient.put('/main/start/cluster').then(() => {
    getState();
  });
}

export function StopClusterCont() {
  jwtClient.put('/main/stop/cluster').then(() => {
    getState();
  });
}

export function RestartMessangerCont() {
  jwtClient.put('/main/restart/messanger').then(() => {
    getState();
  });
}

export function StopMessangerCont() {
  jwtClient.put('/main/stop/messanger').then(() => {
    getState();
  });
}

export function StartMessangerCont() {
  jwtClient.put('/main/start/messanger').then(() => {
    getState();
  });
}

export function RestartSshclientCont() {
  jwtClient.put('/main/restart/sshclient').then(() => {
    getState();
  });
}

export function StopSshclientCont() {
  jwtClient.put('/main/stop/sshclient').then(() => {
    getState();
  });
}

export function StartSshclientCont() {
  jwtClient.put('/main/start/sshclient').then(() => {
    getState();
  });
}

export function RestartScheduleCont() {
  jwtClient.put('/main/restart/schedule').then(() => {
    getState();
  });
}

export function StopScheduleCont() {
  jwtClient.put('/main/stop/schedule').then(() => {
    getState();
  });
}

export function StartScheduleCont() {
  jwtClient.put('/main/start/schedule').then(() => {
    getState();
  });
}

export function RestartProxyCont() {
  jwtClient.put('/main/restart/proxy').then(() => {
    getState();
  });
}

export function StopProxyCont() {
  jwtClient.put('/main/stop/proxy').then(() => {
    getState();
  });
}

export function StartProxyCont() {
  jwtClient.put('/main/start/proxy').then(() => {
    getState();
  });
}

export function RestartServerCont() {
  jwtClient.put('/main/restart/server').then(() => {
    getState();
  });
}

export function StopServerCont() {
  jwtClient.put('/main/stop/server').then(() => {
    getState();
  });
}

export function StartServerCont() {
  jwtClient.put('/main/start/server').then(() => {
    getState();
  });
}

export function RestartWebCont() {
  jwtClient.put('/main/restart/web').then(() => {
    getState();
  });
}

export function StopWebCont() {
  jwtClient.put('/main/stop/web').then(() => {
    getState();
  });
}

export function StartWebCont() {
  jwtClient.put('/main/start/web').then(() => {
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

export function RestartGogsCont() {
  jwtClient.put('/main/restart/gogs').then(() => {
    getState();
  });
}

export function StopGogsCont() {
  jwtClient.put('/main/stop/gogs').then(() => {
    getState();
  });
}

export function StartGogsCont() {
  jwtClient.put('/main/start/gogs').then(() => {
    getState();
  });
}

export function RestartPostgresCont() {
  jwtClient.put('/main/restart/postgres').then(() => {
    getState();
  });
}

export function StopPostgresCont() {
  jwtClient.put('/main/stop/postgres').then(() => {
    getState();
  });
}

export function StartPostgresCont() {
  jwtClient.put('/main/start/postgres').then(() => {
    getState();
  });
}

export function Reboot() {
  jwtClient.put('/main/reboot').then(() => {
    getState();
  });
}

export function Shutdown() {
  jwtClient.put('/main/shutdown').then(() => {
    getState();
  });
}

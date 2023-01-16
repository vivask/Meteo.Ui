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

export function RestartRadius() {
  jwtClient.put('/main/radius/restart');
}

export function StopRadius() {
  jwtClient.put('/main/radius/stop');
}

export function StartRadius() {
  jwtClient.put('/main/radius/start');
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
  jwtClient.put('/main/restart/cluster');
}

export function StartClusterCont() {
  jwtClient.put('/main/start/cluster');
}

export function StopClusterCont() {
  jwtClient.put('/main/stop/cluster');
}

export function RestartMessangerCont() {
  jwtClient.put('/main/restart/messanger');
}

export function StopMessangerCont() {
  jwtClient.put('/main/stop/messanger');
}

export function StartMessangerCont() {
  jwtClient.put('/main/start/messanger');
}

export function RestartSshclientCont() {
  jwtClient.put('/main/restart/sshclient');
}

export function StopSshclientCont() {
  jwtClient.put('/main/stop/sshclient');
}

export function StartSshclientCont() {
  jwtClient.put('/main/start/sshclient');
}

export function RestartScheduleCont() {
  jwtClient.put('/main/restart/schedule');
}

export function StopScheduleCont() {
  jwtClient.put('/main/stop/schedule');
}

export function StartScheduleCont() {
  jwtClient.put('/main/start/schedule');
}

export function RestartProxyCont() {
  jwtClient.put('/main/restart/proxy');
}

export function StopProxyCont() {
  jwtClient.put('/main/stop/proxy');
}

export function StartProxyCont() {
  jwtClient.put('/main/start/proxy');
}

export function RestartServerCont() {
  jwtClient.put('/main/restart/server');
}

export function StopServerCont() {
  jwtClient.put('/main/stop/server');
}

export function StartServerCont() {
  jwtClient.put('/main/start/server');
}

export function RestartWebCont() {
  jwtClient.put('/main/restart/web');
}

export function StopWebCont() {
  jwtClient.put('/main/stop/web');
}

export function StartWebCont() {
  jwtClient.put('/main/start/web');
}

export function RestartEsp32Cont() {
  jwtClient.put('/main/restart/esp32');
}

export function StopEsp32Cont() {
  jwtClient.put('/main/stop/esp32');
}

export function StartEsp32Cont() {
  jwtClient.put('/main/start/esp32');
}

export function RestartGogsCont() {
  jwtClient.put('/main/restart/gogs');
}

export function StopGogsCont() {
  jwtClient.put('/main/stop/gogs');
}

export function StartGogsCont() {
  jwtClient.put('/main/start/gogs');
}

export function RestartPostgresCont() {
  jwtClient.put('/main/restart/postgres');
}

export function StopPostgresCont() {
  jwtClient.put('/main/stop/postgres');
}

export function StartPostgresCont() {
  jwtClient.put('/main/start/postgres');
}

export function Reboot() {
  jwtClient.put('/main/reboot');
}

export function Shutdown() {
  jwtClient.put('/main/shutdown');
}

/**
 * Request cluster logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getClusterLogging() {
  const empty = [];
  return jwtClient
    .get('/main/cluster/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request messanger logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getMessangerLogging() {
  const empty = [];
  return jwtClient
    .get('/main/messanger/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request sshclient logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getSshclientLogging() {
  const empty = [];
  return jwtClient
    .get('/main/sshclient/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request schedule logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getScheduleLogging() {
  const empty = [];
  return jwtClient
    .get('/main/schedule/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request proxy logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getProxyLogging() {
  const empty = [];
  return jwtClient
    .get('/main/proxy/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request server logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getServerLogging() {
  const empty = [];
  return jwtClient
    .get('/main/server/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request web logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getWebLogging() {
  const empty = [];
  return jwtClient
    .get('/main/web/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request esp32 logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getEsp32Logging() {
  const empty = [];
  return jwtClient
    .get('/main/esp32/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Clear cluster logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearClusterLogging() {
  return jwtClient
    .put('/main/cluster/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear messanger logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearMessangerLogging() {
  return jwtClient
    .put('/main/messanger/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear sshclient logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearSshclientLogging() {
  return jwtClient
    .put('/main/sshclient/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear schedule logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearScheduleLogging() {
  return jwtClient
    .put('/main/schedule/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear proxy logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearProxyLogging() {
  return jwtClient
    .put('/main/proxy/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear server logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearServerLogging() {
  return jwtClient
    .put('/main/server/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear web logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearWebLogging() {
  return jwtClient
    .put('/main/web/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear esp32 logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearEsp32Logging() {
  return jwtClient
    .put('/main/esp32/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

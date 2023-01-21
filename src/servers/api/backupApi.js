import { jwtClient } from '../../app/api/jwtClient';

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

export function RestartRadius() {
  jwtClient.put('/backup/radius/restart');
}

export function StopRadius() {
  jwtClient.put('/backup/radius/stop');
}

export function StartRadius() {
  jwtClient.put('/backup/radius/start');
}

export function RestartClusterCont() {
  jwtClient.put('/backup/restart/cluster');
}

export function StartClusterCont() {
  jwtClient.put('/backup/start/cluster');
}

export function StopClusterCont() {
  jwtClient.put('/backup/stop/cluster');
}

export function RestartMessangerCont() {
  jwtClient.put('/backup/restart/messanger');
}

export function StopMessangerCont() {
  jwtClient.put('/backup/stop/messanger');
}

export function StartMessangerCont() {
  jwtClient.put('/backup/start/messanger');
}

export function RestartSshclientCont() {
  jwtClient.put('/backup/restart/sshclient');
}

export function StopSshclientCont() {
  jwtClient.put('/backup/stop/sshclient');
}

export function StartSshclientCont() {
  jwtClient.put('/backup/start/sshclient');
}

export function RestartScheduleCont() {
  jwtClient.put('/backup/restart/schedule');
}

export function StopScheduleCont() {
  jwtClient.put('/backup/stop/schedule');
}

export function StartScheduleCont() {
  jwtClient.put('/backup/start/schedule');
}

export function RestartProxyCont() {
  jwtClient.put('/backup/restart/proxy');
}

export function StopProxyCont() {
  jwtClient.put('/backup/stop/proxy');
}

export function StartProxyCont() {
  jwtClient.put('/backup/start/proxy');
}

export function RestartServerCont() {
  jwtClient.put('/backup/restart/server');
}

export function StopServerCont() {
  jwtClient.put('/backup/stop/server');
}

export function StartServerCont() {
  jwtClient.put('/backup/start/server');
}

export function RestartWebCont() {
  jwtClient.put('/backup/restart/web');
}

export function StopWebCont() {
  jwtClient.put('/backup/stop/web');
}

export function StartWebCont() {
  jwtClient.put('/backup/start/web');
}

export function RestartEsp32Cont() {
  jwtClient.put('/backup/restart/esp32');
}

export function StopEsp32Cont() {
  jwtClient.put('/backup/stop/esp32');
}

export function StartEsp32Cont() {
  jwtClient.put('/backup/start/esp32');
}

export function RestartPostgresCont() {
  jwtClient.put('/backup/restart/postgres');
}

export function StopPostgresCont() {
  jwtClient.put('/backup/stop/postgres');
}

export function StartPostgresCont() {
  jwtClient.put('/backup/start/postgres');
}

export function Reboot() {
  jwtClient.put('/backup/reboot');
}

export function Shutdown() {
  jwtClient.put('/backup/shutdown');
}

/**
 * Request cluster logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getClusterLogging() {
  const empty = [];
  return jwtClient
    .get('/backup/cluster/logging')
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
    .get('/backup/messanger/logging')
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
    .get('/backup/sshclient/logging')
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
    .get('/backup/schedule/logging')
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
    .get('/backup/proxy/logging')
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
    .get('/backup/server/logging')
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
    .get('/backup/web/logging')
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
    .get('/backup/esp32/logging')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Clear cluster logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearClusterLogging() {
  return jwtClient
    .put('/backup/cluster/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear messanger logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearMessangerLogging() {
  return jwtClient
    .put('/backup/messanger/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear sshclient logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearSshclientLogging() {
  return jwtClient
    .put('/backup/sshclient/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear schedule logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearScheduleLogging() {
  return jwtClient
    .put('/backup/schedule/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear proxy logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearProxyLogging() {
  return jwtClient
    .put('/backup/proxy/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear server logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearServerLogging() {
  return jwtClient
    .put('/backup/server/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear web logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearWebLogging() {
  return jwtClient
    .put('/backup/web/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear esp32 logging
 * @returns {Promise<ResultContainer<any>>}
 */
export async function ClearEsp32Logging() {
  return jwtClient
    .put('/backup/esp32/logging')
    .then(({ success }) => success)
    .catch(() => false);
}

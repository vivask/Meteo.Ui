import { jwtClient } from '../../app/api/jwtClient';

/**
 * Request backup servers status
 * @returns {Promise<any>}
 */
export async function GetState() {
  const empty = [];
  try {
    const { success, result } = await jwtClient.get('/backup/state');
    return success ? result : empty;
  } catch {
    return empty;
  }
}

/**
 * Restart kodi service
 * @returns {Promise<any>}
 */
export async function RestartKodi() {
  try {
    const { success } = await jwtClient.put('/backup/kodi/restart');
    return success;
  } catch {
    return false;
  }
}

/**
 * Storage manipulation
 * @returns {Promise<any>}
 */
export async function StorageManipulation(action) {
  const url = `/backup/storage/${action}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

/**
 * Restart service container
 * @returns {Promise<any>}
 */
export async function RestartContainer(service) {
  const url = `/backup/restart/${service}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

/**
 * Stop service container
 * @returns {Promise<any>}
 */
export async function StopContainer(service) {
  const url = `/backup/stop/${service}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

/**
 * Start service container
 * @returns {Promise<any>}
 */
export async function StartContainer(service) {
  const url = `/backup/start/${service}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

/**
 * Reboot backup server
 * @returns {Promise<any>}
 */
export async function Reboot() {
  try {
    const { success } = await jwtClient.put('/backup/reboot');
    return success;
  } catch {
    return false;
  }
}

/**
 * Shutdown backup server
 * @returns {Promise<any>}
 */
export async function Shutdown() {
  try {
    const { success } = await jwtClient.put('/backup/shutdown');
    return success;
  } catch {
    return false;
  }
}

/**
 * Request service logging
 * @returns {Promise<any>}
 */
export async function GetLogging(service) {
  const empty = [];
  const url = `/backup/logging/${service}`;
  try {
    const { success, result } = await jwtClient.get(url);
    return success ? result : empty;
  } catch {
    return empty;
  }
}

/**
 * Clear service logging
 * @returns {Promise<any>}
 */
export async function ClearLogging(service) {
  const url = `/backup/logging/${service}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

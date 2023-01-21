import { jwtClient } from '../../app/api/jwtClient';

/**
 * Request main servers status
 * @returns {Promise<any>}
 */
export async function GetState() {
  const empty = [];
  try {
    const { success, result } = await jwtClient.get('/main/state');
    return success ? result : empty;
  } catch {
    return empty;
  }
}

/**
 * Transmission jobs manipulate
 * @returns {Promise<any>}
 */
export async function TransmissionJobs(action) {
  const url = `/media/transmission/jobs/${action}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

/**
 * Media service manipulate
 * @returns {Promise<any>}
 */
export async function MediaService(service, action) {
  const url = `/media/${service}/${action}`;
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
  const url = `/main/restart/${service}`;
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
  const url = `/main/stop/${service}`;
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
  const url = `/main/start/${service}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

/**
 * Reboot main server
 * @returns {Promise<any>}
 */
export async function Reboot() {
  try {
    const { success } = await jwtClient.put('/main/reboot');
    return success;
  } catch {
    return false;
  }
}

/**
 * Shutdown main server
 * @returns {Promise<any>}
 */
export async function Shutdown() {
  try {
    const { success } = await jwtClient.put('/main/shutdown');
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
  const url = `/main/logging/${service}`;
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
  const url = `/main/logging/${service}`;
  try {
    const { success } = await jwtClient.put(url);
    return success;
  } catch {
    return false;
  }
}

import { tableWrapper } from '../../app/api/tableWrapper.js';
import { jwtClient } from '../../app/api/jwtClient';

const api = '/schedule/jobs';

/**
 * Create table wrapper
 * @param rows
 * @returns {tableWrapper}
 */
export function createWarapper(rows) {
  return tableWrapper(api, rows);
}

/**
 * Create job
 * @param rows
 * @param target
 */
export function createJob(rows, target) {
  jwtClient.put('/schedule/jobs', target).then(({ success, result }) => {
    if (success) {
      target.id = result.id;
      target.active = result.activate;
      rows.value.push(target);
    }
  });
}

/**
 * Update job
 * @param rows
 * @param target
 */
export function updateJob(rows, target) {
  jwtClient.post('/schedule/jobs', target).then(({ success, result }) => {
    if (success) {
      const idx = rows.value.findIndex((item) => item.id === target.id);
      target.active = result.activate;
      rows.value[idx] = target;
    }
  });
}

/**
 * Toggle job
 * @param row
 */
export function toggleJob(row) {
  if (row.active) {
    const url = '/schedule/job/deactivate/' + row.id;
    jwtClient.put(url).then(({ success }) => {
      if (success) row.active = false;
    });
  } else {
    const url = '/schedule/job/activate/' + row.id;
    jwtClient.put(url).then(({ success }) => {
      if (success) row.active = true;
    });
  }
}

/**
 * Run job
 * @param row
 */
export async function runJob(id) {
  const url = '/schedule/job/run/' + id;
  return await jwtClient
    .put(url)
    .then(({ success }) => success)
    .catch(() => false);
}

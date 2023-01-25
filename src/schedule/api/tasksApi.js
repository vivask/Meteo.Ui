import { tableWrapper } from '../../app/api/tableWrapper.js';
import { jwtClient } from '../../app/api/jwtClient';

const api = '/schedule/tasks';

/**
 * Create table wrapper
 * @param rows
 * @returns {tableWrapper}
 */
export function createWarapper(rows) {
  return tableWrapper(api, rows);
}

/**
 * Run task
 * @param row
 */
export async function runTask(api) {
  const url = '/schedule/task/run/';
  return await jwtClient
    .put(url, { api: api })
    .then(({ success }) => success)
    .catch(() => false);
}

export default {};

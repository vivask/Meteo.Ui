import { tableWrapper } from '../../app/api/tableWrapper.js';

const api = '/schedule/tasks';

/**
 * Create table wrapper
 * @param rows
 * @returns {tableWrapper}
 */
export function createWarapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

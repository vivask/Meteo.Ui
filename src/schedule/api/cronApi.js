import { tableWrapper } from '@/shared/api/tableWrapper.js';

const api = '/schedule/cron';

/**
 * Create table wrapper
 * @param rows
 * @returns {tableWrapper}
 */
export function createWarapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

import { tableWrapper } from '../../app/api/tableWrapper.js';

const api = '/radius/verified';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

import { tableWrapper } from '../../app/api/tableWrapper.js';

const api = '/proxy/zones';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

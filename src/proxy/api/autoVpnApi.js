import { tableWrapper } from '../../app/api/tableWrapper.js';

const api = '/proxy/autovpn';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

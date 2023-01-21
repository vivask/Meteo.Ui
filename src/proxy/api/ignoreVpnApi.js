import { tableWrapper } from '../../app/api/tableWrapper.js';

const api = '/proxy/ignorevpn';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

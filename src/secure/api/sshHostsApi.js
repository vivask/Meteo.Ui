import { tableWrapper } from 'src/app/api/tableWrapper.js';

const api = '/sshclient/sshhosts';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

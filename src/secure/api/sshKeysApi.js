import { tableWrapper } from '@/shared/api/tableWrapper.js';

const api = '/sshclient/sshkeys';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

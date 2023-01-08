import { tableWrapper } from 'src/app/api/tableWrapper.js';

const api = '/radius/auth';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

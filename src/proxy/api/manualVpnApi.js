import { tableWrapper } from '@/shared/api/tableWrapper.js';
import { jwtClient } from '../../shared/api/jwtClient';

const api = '/proxy/manualvpn';

export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

export default {};

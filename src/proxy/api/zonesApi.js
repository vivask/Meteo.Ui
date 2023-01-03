import { useTableWrapper } from '@/shared/composables/useTableWrapper.js';

const api = '/proxy/zones';

export function zonesApi(rows) {
  return useTableWrapper(api, rows);
}

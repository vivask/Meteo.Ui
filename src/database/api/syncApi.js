import { jwtClient } from '../../shared/api/jwtClient';

/**
 * Request tables
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getTables() {
  const empty = [];
  return jwtClient
    .get('/database/tables')
    .then(({ success, result }) => {
      if (!success) {
        return empty;
      } else {
        for (let idx in result) {
          result[idx].selected = false;
          result[idx].method = 'Replace';
          result[idx].direction = 'Main => Back';
          for (let i in result[idx].params) {
            result[idx].params[i].note = result[idx].params[i].stype.note;
          }
        }
        return result;
      }
    })
    .catch(() => empty);
}

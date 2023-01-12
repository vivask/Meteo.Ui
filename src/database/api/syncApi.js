import { jwtClient } from 'src/app/api/jwtClient';

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
          result[idx].direction = 'Main => Back';
          for (let i in result[idx].params) {
            result[idx].params[i].note = result[idx].params[i].stype.note;
          }
          result[idx].method = result[idx].params[0];
        }
        return result;
      }
    })
    .catch(() => empty);
}

/**
 * Sync table
 */
export async function syncTable(row) {
  const url = `/database/${row.method.stype.id}/${row.name}/${row.direction === 'Main => Back' ? 'forward' : 'back'}`;
  console.log(url);
  jwtClient.put(url);
}

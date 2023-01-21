import { tableWrapper } from '../../app/api/tableWrapper.js';
import { jwtClient } from '../../app/api/jwtClient';

const api = '/database/tables';

/**
 * Create table wrapper
 * @param rows
 * @returns {tableWrapper}
 */
export function createWrapper(rows) {
  return tableWrapper(api, rows);
}

/**
 * Delete table from list
 * @param rows
 * @returns {Promise<ResultContainer<any>>}
 */
export async function Delete(rows) {
  return jwtClient
    .post('/database/tables/delete', rows)
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Import records from csv
 * @param rows
 * @returns {Promise<ResultContainer<any>>}
 */
export async function Import(rows) {
  return jwtClient
    .put('/database/import', rows)
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Save records to csv
 * @param rows
 * @returns {Promise<ResultContainer<any>>}
 */
export async function Save(rows) {
  return jwtClient
    .put('/database/save', rows)
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Drop table
 * @param rows
 * @returns {Promise<ResultContainer<any>>}
 */
export async function Drop(rows) {
  return jwtClient
    .post('/database/tables/drop', rows)
    .then(({ success }) => success)
    .catch(() => false);
}

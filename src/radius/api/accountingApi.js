import { jwtClient } from '../../shared/api/jwtClient';

/**
 * Request radius accounting
 * @param filter
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getAccounting(filter) {
  const empty = [];
  const url = '/radius/accounting/' + filter;
  return jwtClient
    .get(url)
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Apply validation
 * @param id
 * @returns {Promise<ResultContainer<any>>}
 */
export async function applyValidation(id) {
  const url = '/radius/accounting/verified/' + id;
  return jwtClient
    .put(url)
    .then(({ success }) => success)
    .catch(() => false);
}

/**
 * Clear accounting
 * @param filter
 * @returns {Promise<ResultContainer<any>>}
 */
export async function Clear(filter) {
  const url = '/radius/accounting/clear/' + filter;
  return jwtClient
    .put(url)
    .then(({ success }) => success)
    .catch(() => false);
}

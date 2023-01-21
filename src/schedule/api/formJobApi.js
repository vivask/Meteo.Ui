import { jwtClient } from '../../app/api/jwtClient';

/**
 * Request list executors
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getExecutors() {
  const empty = [];
  return jwtClient
    .get('/schedule/executors')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request list tasks
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getTasks() {
  const empty = [];
  return jwtClient
    .get('/schedule/tasks')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

/**
 * Request list periods
 * @returns {Promise<ResultContainer<any>>}
 */
export async function getPeriods() {
  const empty = [];
  return jwtClient
    .get('/schedule/periods')
    .then(({ success, result }) => (success ? result : empty))
    .catch(() => empty);
}

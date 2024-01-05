import { httpRequest } from '@/utilities';

const path = '/user';

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpSignIn = async body => await httpRequest(`${path}/sing-in`, { body, method: 'POST' });

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateUser = async body => await httpRequest(path, { body, method: 'PUT' });

/**
 *
 * @returns {Promise}
 */
export const httpGetAllUsers = async () => await httpRequest(path);

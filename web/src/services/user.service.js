import { _POST_FORMDATA, httpRequest } from '@/utilities';

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
export const httpAddOrUpdateUser = async body => await _POST_FORMDATA(path, body);

/**
 *
 * @returns {Promise}
 */
export const httpGetAllUsers = async () => await httpRequest(path);

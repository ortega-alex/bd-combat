import { httpRequest } from '@/utilities';

const path = '/user';

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpSignIn = async body => await httpRequest(`${path}/sing-in`, { body, method: 'POST' });

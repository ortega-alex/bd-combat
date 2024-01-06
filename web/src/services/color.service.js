import { httpRequest } from '@/utilities';

const path = '/color';

/**
 *
 * @returns {Promise}
 */
export const httpGetColor = async () => await httpRequest(path);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateColor = async body => httpRequest(path, { body, method: 'POST' });

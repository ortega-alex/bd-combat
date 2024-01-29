import { httpRequest } from '@/utilities';

const path = '/position';

/**
 *
 * @returns {Promise}
 */
export const httpGetPositions = async () => await httpRequest(path);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdatePosition = async body => httpRequest(path, { body, method: 'POST' });

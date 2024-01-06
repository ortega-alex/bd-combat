import { httpRequest } from '@/utilities';

const path = '/inventory';

/**
 *
 * @returns {Promise}
 */
export const httpGetInventory = async () => await httpRequest(path);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateInventory = async body => httpRequest(path, { body, method: 'POST' });

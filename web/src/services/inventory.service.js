import { httpRequest } from '@/utilities';

const path = '/inventory';

/**
 *
 * @returns {Promise}
 */
export const httpGetInventory = async () => await httpRequest(path);

/**
 *
 * @returns {Promise}
 */
export const httpGetStock = async () => await httpRequest(`${path}/stock`);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateInventory = async body => httpRequest(path, { body, method: 'POST' });

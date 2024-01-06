import { httpRequest } from '@/utilities';

const path = '/product';

/**
 *
 * @returns {Promise}
 */
export const httpGetProducts = async () => await httpRequest(path);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateProduct = async body => httpRequest(path, { body, method: 'POST' });

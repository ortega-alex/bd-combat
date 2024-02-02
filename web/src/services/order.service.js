import { httpRequest } from '@/utilities';

const path = '/order';

/**
 *
 * @returns {Promise}
 */
export const httpGetOrders = async () => await httpRequest(path);

/**
 *
 * @returns {Promise}
 */
export const httpGetOrderDetailByOrderId = async id => await httpRequest(`${path}/detail/${id}`);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateOrder = async body => httpRequest(path, { body, method: 'POST' });

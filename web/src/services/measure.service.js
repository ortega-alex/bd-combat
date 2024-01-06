import { httpRequest } from '@/utilities';

const path = '/measure';

/**
 *
 * @returns {Promise}
 */
export const httpGetMeasure = async () => await httpRequest(path);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateMeasure = async body => httpRequest(path, { body, method: 'POST' });

import { _POST_FORMDATA, httpRequest } from '@/utilities';

const path = '/employee';

/**
 *
 * @returns {Promise}
 */
export const httpGetAllEmployees = async () => await httpRequest(path);

/**
 *
 * @param {Number} id
 * @returns {Promise}
 */
export const httpGetAllEmployeeById = async id => await httpRequest(`${path}/${id}`);

/**
 *
 * @param {Object} body
 * @returns {Promise}
 */
export const httpAddOrUpdateEmployee = async body => await _POST_FORMDATA(path, body);

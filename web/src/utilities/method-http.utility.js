import { _SERVER } from '@/models';
import axios from 'axios';

/**
 *
 * @param {String} path
 * @param {Object} options
 * @returns {Promise}
 */
export const httpRequest = async (path, options = {}) => {
    try {
        const res = await axios({
            method: options?.method || 'GET',
            url: _SERVER.apiUrl + path,
            data: options?.body || {},
            timeout: 20000,
            responseType: 'json'
        });

        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

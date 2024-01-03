import axios from 'axios';
import { getStorage } from '@/utilities';
import { _KEYS } from '@/models';

export const PublicPrivateInterceptor = () => {
    axios.interceptors.request.use(request => {
        const token = getStorage(_KEYS.TOKEN);
        if (token) request.headers.Authorization = `Bearer ${token}`;
        return request;
    });

    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return Promise.reject(error);
        }
    );
};

export default PublicPrivateInterceptor;

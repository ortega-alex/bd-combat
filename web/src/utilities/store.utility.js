import { decryptData, encryptData } from '../utilities';
export const saveStorage = (key, value) => {
    window.sessionStorage.setItem(key, encryptData(value));
};

export const getStorage = key => {
    const storage = window.sessionStorage.getItem(key);
    return storage ? decryptData(storage) : null;
};

export const clearStorage = key => {
    window.sessionStorage.removeItem(key);
};

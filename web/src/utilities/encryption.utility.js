import { _KEYS } from '@/models';
import CryptoJS from 'crypto-js';

export function encryptData(data) {
    const key = CryptoJS.enc.Hex.parse(_KEYS.SECRET.replace(/-/g, ''));
    const iv = CryptoJS.enc.Hex.parse(_KEYS.IV.replace(/-/g, ''));
    return CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv }).toString();
}

export function decryptData(data) {
    const key = CryptoJS.enc.Hex.parse(_KEYS.SECRET.replace(/-/g, ''));
    const iv = CryptoJS.enc.Hex.parse(_KEYS.IV.replace(/-/g, ''));
    const bytes = CryptoJS.AES.decrypt(data.toString(), key, { iv });
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

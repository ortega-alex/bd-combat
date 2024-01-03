import mysql from 'serverless-mysql';
import { DB_CONFING } from './envirinment.utility';

const conn = mysql({ config: DB_CONFING });

export const executeQuery = async (query, values) => {
    try {
        const result = await conn.query(query, values);
        await conn.end();
        return result;
    } catch (error) {
        return { error };
    }
};

import dayjs, { Dayjs } from 'dayjs';
import es from 'dayjs/locale/es';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import weekday from 'dayjs/plugin/weekday';

dayjs.locale(es);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

/**
 *
 * @param {Dayjs} date
 * @param {String} format
 * @returns {String}
 */
export const getDateFormat = (date, format = 'DD/MM/YYYY HH:MM') => dayjs(date ?? undefined).format(format);

/**
 *
 * @param {String} text
 * @param {String} formatReq
 * @returns {Dayjs}
 */
export const getDateFromString = (text, format = 'YYYY/MM/DD') => dayjs(dayjs(text, format));

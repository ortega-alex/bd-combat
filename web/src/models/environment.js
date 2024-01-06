let domain = null;
const version = process.env.VERSION_API || 'v1';

if (process.env.NODE_ENV === 'development') {
    domain = `//${process.env.DOMAIN_API || 'localhost:4000'}/`;
} else {
    const url = window.location.href;
    domain = url.split('#')[0];
}

export const _SERVER = {
    baseUrl: domain,
    apiUrl: `${domain}api/${version}`,
    socket: `//${process.env.DOMAIN_API + process.env.NODE_PORT || window.location.hostname + ':4000'}/`
};

export const _KEYS = {
    SESSION: process.env.SESSION || '3F60624A-433F-4D20-AA66-EA65334B31A7',
    SECRET: process.env.SECRET || '21BD63BC-0154-4494-A329-891DD14A9C0C',
    IV: process.env.IV || '917F8863-B23B-404C-82C9-71BEEABA080B',
    ENCODING: process.env.ENCODING || '7AFFE2F1-67BD-4D7C-A623-D46886722090',
    TOKEN: process.env.TOKEN || '6DBD19B1-D7E2-4F4A-B217-EE966F5030A0'
};

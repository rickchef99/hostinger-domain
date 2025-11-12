import ky from 'ky';

export const hostinger = ky.create({
  prefixUrl: 'https://developers.hostinger.com/api',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.HOSTINGER_API_KEY}`,
  },
  timeout: 30000,
});

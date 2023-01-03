import { serviceClient } from './serviceClient';

export const jwtClient = serviceClient({ baseURL: import.meta.env.VITE_API_URL, jwt: true });

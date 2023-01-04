import { serviceClient } from '../../shared/api/serviceClient';

export const webClient = serviceClient({ baseURL: import.meta.env.VITE_API_URL });

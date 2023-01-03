import { serviceClient } from '../../shared/api/serviceClient';
import { useProxyStore } from '../stores/useProxyStore';

const store = useProxyStore();

export const proxyClient = serviceClient({
  baseURL: import.meta.env.PROXY_API_URL,
  ca: store.cert.ca,
  crt: store.cert.crt,
  key: store.cert.key,
});

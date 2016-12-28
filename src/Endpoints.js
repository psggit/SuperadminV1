// const base = 'http://130.211.246.199';
const scheme = window.location.href.split(':')[0];
const baseHost = window.__env.baseDomain;
const dataUrl = scheme + '://data' + baseHost;
const authUrl = scheme + '://auth' + baseHost;
const fileUrl = scheme + '://api2' + baseHost;
const blogicUrl = scheme + '://api1' + baseHost;
const downloadRepUrl = scheme + '://downloadrep' + baseHost;

// const base = '';
const Endpoints = {
  login: authUrl + '/login',
  db: dataUrl + '/api/1',
  bulk: dataUrl + '/v1/query',
  getSchema: dataUrl + '/api/1/table',
  getConsumer: dataUrl + '/api/1/table/consumer/select',
  schemaChange: dataUrl + '/api/1/change',
  getCredentials: authUrl + '/user/account/info',
  file_upload: fileUrl + '/upload',
  file_get: fileUrl + '/get?fs_url=',
  integrations_dataUrl: 'http://localhost:5000',
  baseUrl: dataUrl,
  authUrl: authUrl,
  blogicUrl: blogicUrl
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy, dataUrl, authUrl, fileUrl, downloadRepUrl};

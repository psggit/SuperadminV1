// const base = 'http://130.211.246.199';
//

let dataUrl;
let authUrl;
let fileUrl;
let reportUrl;
let blogicUrl;
let backendUrl;
let downloadRepUrl;
let gremlinUrl;
let scheme;
let baseHost = 'TEST';

if (window.location.href.split(':')[1] === '//localhost') {
  const appName = 'amebae21';
  // const appName = 'hipbar-stg';
  dataUrl = 'https://data.' + appName + '.hasura-app.io';
  authUrl = 'https://auth.' + appName + '.hasura-app.io';
  reportUrl = 'https://reports.' + appName + '.hasura-app.io';
  fileUrl = 'https://api2.' + appName + '.hasura-app.io';
  backendUrl = 'https://api1.' + appName + '.hasura-app.io';
  blogicUrl = 'https://api1.' + appName + '.hasura-app.io';
  gremlinUrl = 'https://gremlin.' + appName + '.hasura-app.io';
  downloadRepUrl = 'https://downloadrep.' + appName + '.hasura-app.io';
} else {
  console.log(window.location.href);
  scheme = window.location.href.split(':')[0];
  baseHost = window.location.hostname.match(/.*?(\..*)/)[1];
  dataUrl = scheme + '://data' + baseHost;
  reportUrl = scheme + '://reports' + baseHost;
  authUrl = scheme + '://auth' + baseHost;
  fileUrl = scheme + '://api2' + baseHost;
  backendUrl = scheme + '://api1' + baseHost;
  blogicUrl = scheme + '://api1' + baseHost;
  gremlinUrl = scheme + '://gremlin' + baseHost;
  downloadRepUrl = scheme + '://downloadrep' + baseHost;
}

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
  backendUrl: backendUrl,
  gremlinUrl: gremlinUrl,
  reportUrl: reportUrl,
  authUrl: authUrl,
  blogicUrl: blogicUrl,
  dataUrl: dataUrl
};
const globalCookiePolicy = 'include';

export default Endpoints;
export {globalCookiePolicy, dataUrl, reportUrl, blogicUrl, authUrl, fileUrl, downloadRepUrl};

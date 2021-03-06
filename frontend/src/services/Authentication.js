import Utils from '../utils';
import APIClient from '../utils/api';
import APIConstants from '../utils/api/constants';


const loginAPI = (username, password) => {
  const path = '/api/v1/app-login/';
  const url = `${Utils.serverUrl}${path}`;
  const params = {
    username,
    password,
  };

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);

  return client.sendRequest(params);
};

const checkUserNameAPI = (username) => {
  const path = '/api/v1/check-username/';
  const url = `${Utils.serverUrl}${path}`;
  const params = {
    username
  };

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);

  return client.sendRequest(params);
};

const signupOfficerAPI = (params) => {
  const path = '/api/v1/officer-signup/';
  const url = `${Utils.serverUrl}${path}`;

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);

  return client.sendRequest(params);
};

const signupCitizenAPI = (params) => {
  const path = '/api/v1/citizen-signup/';
  const url = `${Utils.serverUrl}${path}`;

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);

  return client.sendRequest(params);
};

const forgetAPI = (email) => {
  const path = '/api/v1/password-reset/';
  const url = `${Utils.serverUrl}${path}`;
  const params = {
    email
  };

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);

  return client.sendRequest(params);
};

export { loginAPI,forgetAPI,checkUserNameAPI ,signupOfficerAPI,signupCitizenAPI};

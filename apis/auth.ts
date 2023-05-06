import API_URLS from '@/constants/apiUrls';

import http from './http';

interface LoginResponse {
  code: number;
  messages: string;
  data: {
    accessToken: string;
  };
}

interface LoginError {
  response: {
    data: {
      code: number;
      messages: string;
      data: {
        username: string;
        socialType: string;
      };
    };
  };
}

export const login = async (
  type: string,
  authenticationCode: string,
  redirectUri: string
) => {
  try {
    const data: LoginResponse = await http.post(API_URLS.LOGIN(type), {
      authenticationCode,
      redirectUri,
    });
    return data;
  } catch (error) {
    const err = error as LoginError;
    return err.response.data;
  }
};

export const signup = {};

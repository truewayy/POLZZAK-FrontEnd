import API_URLS from '@/constants/apiUrls';

import http from './http';

interface LoginResponse {
  data: {
    code: number;
    messages: string;
    data: {
      accessToken: string;
    };
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

interface RegisterError {
  response: {
    data: {
      code: number;
      messages: string;
      data: null;
    };
  };
}

export const login = async (
  type: string,
  authenticationCode: string,
  redirectUri: string
) => {
  try {
    const { data }: LoginResponse = await http.post(API_URLS.LOGIN(type), {
      authenticationCode,
      redirectUri,
    });
    return data;
  } catch (error) {
    const err = error as LoginError;
    return err.response.data;
  }
};

export const register = async (submitData: FormData) => {
  try {
    const { data }: LoginResponse = await http.post(API_URLS.REGISTER, {
      registerRequest: submitData,
    });
    return data;
  } catch (error) {
    const err = error as RegisterError;
    return err.response.data;
  }
};

export const duplicateCheck = async (nickname: string) => {
  try {
    const { status } = await http.get(API_URLS.DUPLICATE_CHECK(nickname));
    return status;
  } catch (error) {
    return error;
  }
};

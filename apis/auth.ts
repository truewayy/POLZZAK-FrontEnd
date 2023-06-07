import API_URLS from '@/constants/apiUrls';

import http from './http';

export interface LoginResponse {
  data: {
    code: 200;
    messages: string;
    data: {
      accessToken: string;
    };
  };
}

export interface LoginError {
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

interface MemberTypeResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      memberTypeDetailList: {
        memberTypeDetailId: number;
        detail: string;
      }[];
    };
  };
}

interface RegisterError {
  response: {
    data: {
      code: number;
      messages: string;
      data: {};
    };
  };
}

interface DuplicateCheckError {
  response: {
    status: number;
  };
}

export const getAuthToken = async (
  type: 'kakao' | 'google',
  authenticationCode: string
) => {
  try {
    const { data } = await http.post(
      API_URLS.AUTH_TOKEN[type](authenticationCode)
    );
    return data.access_token;
  } catch (error) {
    const err = error as LoginError;
    return err.response.data;
  }
};

// 로그인 API
export const login = async (type: string, oAuthAccessToken: string) => {
  try {
    const { data }: LoginResponse = await http.post(
      API_URLS.LOGIN(type),
      {
        oAuthAccessToken,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    const err = error as LoginError;
    return err.response.data;
  }
};

// 회원가입 API
export const register = async (submitData: FormData) => {
  try {
    const { data }: LoginResponse = await http.post(
      API_URLS.REGISTER,
      submitData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (error) {
    const err = error as RegisterError;
    return err.response.data;
  }
};

// 닉네임 중복체크 API
export const duplicateCheck = async (nickname: string) => {
  try {
    const { status } = await http.get(API_URLS.DUPLICATE_CHECK(nickname));
    return status;
  } catch (error) {
    const err = error as DuplicateCheckError;
    return err.response.status;
  }
};

export const memberType = async () => {
  try {
    const { data }: MemberTypeResponse = await http.get(API_URLS.MEMBER_TYPE);
    return data;
  } catch (error) {
    const err = error as RegisterError;
    return err.response.data;
  }
};

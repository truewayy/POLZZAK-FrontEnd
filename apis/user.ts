import API_URLS from '@/constants/apiUrls';

import http from './http';

export interface UserInfoResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      nickname: string;
      memberType: {
        name: string;
        detail: string;
      };
      profileUrl: string;
    };
  };
}

export interface UserInfoError {
  response: {
    data: {
      code: number;
      messages: string;
      data: null;
    };
  };
}

const userInfo = async () => {
  try {
    const { data }: UserInfoResponse = await http.get(API_URLS.USER_INFO, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    const err = error as UserInfoError;
    return err.response.data;
  }
};

export default userInfo;

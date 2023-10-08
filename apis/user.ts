import API_URLS from '@/constants/apiUrls';

import { http } from './http';

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

export const userInfo = async () => {
  try {
    const { data }: UserInfoResponse = await http.get(API_URLS.USER_INFO);
    return data;
  } catch (error) {
    const err = error as UserInfoError;
    return err.response.data;
  }
};

export const changeProfile = async (formData: FormData) => {
  try {
    const data = await http.patch(API_URLS.PROFILE_CHANGE, formData);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const changeNickname = async (nickname: string) => {
  try {
    const data = await http.patch(API_URLS.NICKNAME_CHANGE, { nickname });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const withDrawal = async () => {
  try {
    const data = await http.delete(API_URLS.WITH_DRAWAL);
    return data;
  } catch (error) {
    console.error(error);
  }
};

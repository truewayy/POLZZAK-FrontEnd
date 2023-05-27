import API_URLS from '@/constants/apiUrls';

import http from './http';

export interface FamiliesResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      families: {
        memberId: number;
        nickname: string;
        memberType: string;
        profileUrl: string;
      }[];
    };
  };
}

export interface FamiliesError {
  response: {
    data: {
      code: number;
      messages: string;
      data: null;
    };
  };
}

const familiesInfo = async () => {
  try {
    const { data }: FamiliesResponse = await http.get(API_URLS.FAMILIES);
    return data;
  } catch (error) {
    const err = error as FamiliesError;
    return err.response.data;
  }
};

export default familiesInfo;

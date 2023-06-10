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
        memberType: {
          name: string;
          detail: string;
        };
        profileUrl: string;
      }[];
    };
  };
}

export interface FamilyResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      memberId: number;
      nickname: string;
      memberType: {
        name: string;
        detail: string;
      };
      profileUrl: string;
      familyStatus: 'NONE' | 'RECEIVED' | 'APPROVE' | 'SENT';
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

export const familiesInfo = async () => {
  try {
    const { data }: FamiliesResponse = await http.get(API_URLS.FAMILIES);
    return data;
  } catch (error) {
    const err = error as FamiliesError;
    return err.response.data;
  }
};

export const searchFamilies = async (nickname: string) => {
  try {
    const { data }: FamilyResponse = await http.get(API_URLS.FAMILY(nickname));
    return data;
  } catch (error) {
    const err = error as FamiliesError;
    return err.response.data;
  }
};

export const receivedRequest = async () => {
  try {
    const { data }: FamiliesResponse = await http.get(
      API_URLS.RECEIVED_REQUEST
    );
    return data;
  } catch (error) {
    const err = error as FamiliesError;
    return err.response.data;
  }
};

export const sentRequest = async () => {
  try {
    const { data }: FamiliesResponse = await http.get(API_URLS.SENT_REQUEST);
    return data;
  } catch (error) {
    const err = error as FamiliesError;
    return err.response.data;
  }
};

export const sendRequest = async (targetId: number) => {
  try {
    const { data }: FamilyResponse = await http.post(API_URLS.FAMILIES, {
      targetId,
    });
    return data;
  } catch (error) {
    const err = error as FamiliesError;
    return err.response.data;
  }
};

export const cancelRequest = async (targetId: number) => {
  try {
    const { data }: FamilyResponse = await http.delete(
      API_URLS.FAMILY_CANCEL(targetId)
    );
    return data;
  } catch (error) {
    const err = error as FamiliesError;
    return err.response.data;
  }
};

/* eslint-disable import/prefer-default-export */
import API_URLS from '@/constants/apiUrls';

import http from './http';

interface StampboardListProps {
  memberId?: number;
  stampBoardGroup: string;
}

interface Partner {
  memberId: number;
  nickname: string;
  memberType: {
    name: string;
    detail: string;
  };
  profileUrl: string;
}

export interface StampBoard {
  stampBoardId: number;
  name: string;
  currentStampCount: number;
  goalStampCount: number;
  reward: string;
  missionRequestCount: number;
  status: string;
}

export interface StampboardListData {
  partner: Partner;
  stampBoardSummaries: StampBoard[];
}

interface StampboardListResponse {
  data: {
    code: 200;
    messages: string;
    data: {
      partner: Partner;
      stampBoardSummaries: StampBoard[];
    }[];
  };
}

interface StampboardListError {
  response: {
    data: {
      code: number;
      messages: string;
      data: null;
    };
  };
}

interface StampboardCreateInfo {
  kidId: number;
  name: string;
  goalStampCount: number;
  reward: string;
  missionContents: string[];
}

interface StampboardDetailResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      stampBoardId: number;
      name: string;
      status: string;
      currentStampCount: number;
      goalStampCount: 10 | 12 | 16 | 20 | 25 | 36 | 40 | 48 | 60;
      reward: string;
      missions: {
        id: number;
        content: string;
      }[];
      stamps: {
        id: number;
        stampDesignId: number;
        missionContent: string;
        createdDate: string;
      }[];
      missionRequestList: {
        id: number;
        missionContent: string;
        createdDate: string;
      }[];
      completedDate: null;
      rewardDate: null;
      createdDate: string;
    };
  };
}

export const stampboardList = async ({
  memberId,
  stampBoardGroup,
}: StampboardListProps) => {
  try {
    const { data }: StampboardListResponse = await http.get(
      API_URLS.STAMPBOARD_LIST,
      {
        params: memberId ? { memberId, stampBoardGroup } : { stampBoardGroup },
      }
    );
    return data;
  } catch (error) {
    const err = error as StampboardListError;
    return err.response.data;
  }
};

export const createStampboard = async (createInfo: StampboardCreateInfo) => {
  try {
    const { data } = await http.post(API_URLS.STAMPBOARD, createInfo);
    return data;
  } catch (error) {
    return error;
  }
};

export const stampboardDetail = async (stampboardId: string) => {
  try {
    const { data }: StampboardDetailResponse = await http.get(
      `${API_URLS.STAMPBOARD}/${stampboardId}`
    );
    return data;
  } catch (error) {
    const err = error as StampboardListError;
    return err.response.data;
  }
};

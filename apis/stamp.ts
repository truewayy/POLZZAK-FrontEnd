/* eslint-disable import/prefer-default-export */
import API_URLS from '@/constants/apiUrls';

import http from './http';

interface StampboardListProps {
  partnerMemberId?: number;
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
  status: 'progress' | 'completed' | 'issued_coupon' | 'rewarded';
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
      status: 'progress' | 'completed' | 'issued_coupon' | 'rewarded';
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
        missionId: number;
        missionContent: string;
        createdDate: string;
      }[];
      completedDate: string | null;
      rewardDate: Date;
      createdDate: string;
    };
  };
}

export const stampboardList = async ({
  partnerMemberId,
  stampBoardGroup,
}: StampboardListProps) => {
  try {
    const { data }: StampboardListResponse = await http.get(
      API_URLS.STAMPBOARD_LIST,
      {
        params: partnerMemberId
          ? { partnerMemberId, stampBoardGroup }
          : { stampBoardGroup },
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

export const stampMissionRequest = async (
  stampBoardId: number,
  missionId: number,
  guardianId: number
) => {
  try {
    await http.post(API_URLS.MISSION_REQUEST, {
      stampBoardId,
      missionId,
      guardianId,
    });
  } catch (error) {
    return error;
  }
};

export const refuseMission = async (missionRequestId: number) => {
  try {
    await http.delete(`${API_URLS.MISSION_REQUEST}/${missionRequestId}`);
  } catch (error) {
    return error;
  }
};

export const createStamp = async (
  stampBoardId: number,
  missionRequestId: number | null,
  missionId: number,
  stampDesignId: number
) => {
  try {
    await http.post(API_URLS.STAMP(stampBoardId), {
      missionRequestId,
      missionId,
      stampDesignId,
    });
  } catch (error) {
    return error;
  }
};

export const deleteStampboard = async (stampBoardId: string) => {
  try {
    await http.delete(`${API_URLS.STAMPBOARD}/${stampBoardId}`);
  } catch (error) {
    return error;
  }
};

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

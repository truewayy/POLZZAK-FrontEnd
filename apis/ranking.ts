/* eslint-disable import/prefer-default-export */

import API_URLS from '@/constants/apiUrls';

import http from './http';

export interface RankingResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      rankingSummaries: {
        ranking: number;
        rankingStatus: 'UP' | 'DOWN' | 'HOLD';
        nickname: string;
        point: number;
        level: number;
        memberTypeDetail: string;
        profileUrl: string;
      }[];
    };
  };
}

export interface RankingError {
  response: {
    data: {
      code: number;
      messages: string;
      data: null;
    };
  };
}

export const inquireRanking = async (type: string) => {
  try {
    const { data }: RankingResponse = await http.get(
      `${API_URLS.RANKING}/${type}`
    );
    return data;
  } catch (error) {
    const err = error as RankingError;
    return err.response.data;
  }
};

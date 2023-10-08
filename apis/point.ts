import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import API_URLS from '@/constants/apiUrls';

import { http } from './http';

export interface PointLogResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      startId: number;
      content: {
        description: string;
        increasedPoint: number;
        remainingPoint: number;
        createdDate: string;
      }[];
    };
  };
}

export interface MyPointResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      point: number;
      level: number;
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

export const pointLog = async (
  size: number,
  pageParam: number,
  startId: number | undefined = 0
) => {
  const params: Params = {
    size,
    startId,
  };
  try {
    const { data }: PointLogResponse = await http.get(API_URLS.POINT_LOG, {
      params,
    });
    const nextPage = pageParam + 1;

    return {
      response: data.data,
      nextPage,
    };
  } catch (error) {
    console.error(error);
  }
};

export const myPoint = async () => {
  try {
    const { data }: MyPointResponse = await http.get(API_URLS.MY_POINT);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

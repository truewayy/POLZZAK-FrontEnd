/* eslint-disable import/prefer-default-export */

import API_URLS from '@/constants/apiUrls';

import { http } from './http';

export interface Family {
  memberId: number;
  nickname: string;
  memberType: {
    name: string;
    detail: string;
  };
  profileUrl: string;
}

export interface Coupon {
  couponId: number;
  reward: string;
  rewardDate: Date;
  rewardRequestDate: Date;
}

interface CouponListResponse {
  data: {
    code: 200;
    messages: string;
    data: {
      family: Family;
      coupons: Coupon[];
    }[];
  };
}

interface CouponDetailResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      couponId: number;
      reward: string;
      guardian: {
        nickname: string;
        profileUrl: string;
      };
      kid: {
        nickname: string;
        profileUrl: string;
      };
      missionContents: string[];
      stampCount: number;
      state: 'ISSUED' | 'REWARDED';
      rewardDate: Date;
      rewardRequestDate: Date;
      startDate: Date;
      endDate: Date;
    };
  };
}

interface IssueCouponResponse {
  data: {
    code: 201;
    messages: null;
    data: null;
  };
}

export interface CouponListData {
  family: Family;
  coupons: Coupon[];
}

interface CouponListError {
  response: {
    data: {
      code: number;
      messages: string;
      data: null;
    };
  };
}

interface CouponListProps {
  partnerMemberId?: number;
  couponState: string;
}

export const couponList = async ({
  partnerMemberId,
  couponState,
}: CouponListProps) => {
  try {
    const { data }: CouponListResponse = await http.get(API_URLS.COUPON_LIST, {
      params: partnerMemberId
        ? { partnerMemberId, couponState }
        : { couponState },
    });
    return data;
  } catch (error) {
    const err = error as CouponListError;
    return err.response.data;
  }
};

export const couponDetail = async (couponId: string) => {
  try {
    const { data }: CouponDetailResponse = await http.get(
      API_URLS.COUPON_DETAIL(couponId)
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const issueCoupon = async (stampBoardId: string, rewardDate: number) => {
  try {
    const { data }: IssueCouponResponse = await http.post(
      API_URLS.ISSUE_COUPON(stampBoardId),
      {
        rewardDate,
      }
    );
    return data;
  } catch (error) {
    const err = error as CouponListError;
    return err.response.data;
  }
};

export const receiveCoupon = async (stampBoardId: string) => {
  try {
    const { data }: IssueCouponResponse = await http.post(
      API_URLS.COUPON_LIST,
      {
        stampBoardId,
      }
    );
    return data;
  } catch (error) {
    const err = error as CouponListError;
    return err.response.data;
  }
};

export const receiveGift = async (couponId: number | string) => {
  try {
    const { data }: IssueCouponResponse = await http.post(
      API_URLS.RECEIVE_GIFT(couponId)
    );

    return data;
  } catch (error) {
    const err = error as CouponListError;
    return err.response.data;
  }
};

export const requestGift = async (couponId: number | string) => {
  try {
    const { data }: IssueCouponResponse = await http.post(
      API_URLS.REQUEST_GIFT(couponId)
    );

    return data;
  } catch (error) {
    const err = error as CouponListError;
    return err.response.data;
  }
};

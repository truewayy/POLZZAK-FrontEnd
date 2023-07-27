/* eslint-disable import/prefer-default-export */

import API_URLS from '@/constants/apiUrls';

import http from './http';

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
  reward: string;
  rewardDate: Date;
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
  memberId?: number;
  couponState: string;
}

export const couponList = async ({
  memberId,
  couponState,
}: CouponListProps) => {
  try {
    const { data }: CouponListResponse = await http.get(API_URLS.COUPON_LIST, {
      params: memberId ? { memberId, couponState } : { couponState },
    });
    return data;
  } catch (error) {
    const err = error as CouponListError;
    return err.response.data;
  }
};

import API_URLS from '@/constants/apiUrls';

import { http } from './http';

export interface Notification {
  id: number;
  type:
    | 'FAMILY_REQUEST'
    | 'FAMILY_REQUEST_COMPLETE'
    | 'LEVEL_UP'
    | 'LEVEL_DOWN'
    | 'STAMP_REQUEST'
    | 'REWARD_REQUEST'
    | 'STAMP_BOARD_COMPLETE'
    | 'REWARDED'
    | 'REWARD_REQUEST_AGAIN'
    | 'REWARD_FAIL'
    | 'CREATED_STAMP_BOARD'
    | 'ISSUED_COUPON'
    | 'REWARDED_REQUEST';
  status:
    | 'READ'
    | 'UNREAD'
    | 'REQUEST_FAMILY'
    | 'REQUEST_FAMILY_ACCEPT'
    | 'REQUEST_FAMILY_REJECT';
  title: string;
  message: string;
  sender: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  link: string;
  requestFamilyId: number;
  createdDate: string;
}

export interface NotificationListResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      startId: number;
      notificationDtoList: Notification[];
    };
  };
}

export const notificationList = async (
  pageParam: number,
  startId: number | null = null
) => {
  try {
    const { data }: NotificationListResponse = await http.get(
      API_URLS.NOTIFICATION_LIST,
      {
        params: {
          startId,
        },
      }
    );
    const nextPage = pageParam + 1;

    return {
      response: data.data,
      nextPage,
    };
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotification = async (notificationIds: string) => {
  try {
    const data: NotificationListResponse = await http.delete(
      API_URLS.NOTIFICATION_LIST,
      {
        params: {
          notificationIds,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

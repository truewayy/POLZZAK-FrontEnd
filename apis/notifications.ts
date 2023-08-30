import API_URLS from '@/constants/apiUrls';

import http from './http';

export interface NotificationListResponse {
  data: {
    code: 200;
    messages: null;
    data: {
      startId: number;
      notificationDtoList: {
        id: number;
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
      }[];
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

export const notoficationDetail = '';

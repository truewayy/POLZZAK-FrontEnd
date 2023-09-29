// API URL 목록
const API_URLS = {
  REGISTER: '/api/v1/auth/register',
  AUTH_TOKEN: {
    kakao: (code: string) =>
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${code}`,
    google: (code: string) =>
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
  },
  MEMBER_TYPE: '/api/v1/member-types',
  LOGIN: (type: string) => `/api/v1/auth/login/${type}`,
  DUPLICATE_CHECK: (nickname: string) =>
    `/api/v1/auth/validate/nickname?value=${nickname}`,
  USER_INFO: '/api/v1/users/me',
  PROFILE_CHANGE: '/api/v1/users/profile',
  NICKNAME_CHANGE: '/api/v1/users/nickname',
  FAMILIES: '/api/v1/families',
  FAMILY_CANCEL: (memberId: number) => `/api/v1/families/cancel/${memberId}`,
  FAMILY_CLEAR: (memberId: number) => `/api/v1/families/${memberId}`,
  FAMILY_APPROVE: (memberId: number) => `/api/v1/families/approve/${memberId}`,
  FAMILY_REJECT: (memberId: number) => `/api/v1/families/reject/${memberId}`,
  FAMILY: (nickname: string) => `/api/v1/families/users?nickname=${nickname}`,
  SENT_REQUEST: '/api/v1/families/requests/sent',
  RECEIVED_REQUEST: '/api/v1/families/requests/received',
  STAMPBOARD_LIST: '/api/v1/stamps/stamp-boards',
  STAMPBOARD: '/api/v1/stamps/stamp-boards',
  ISSUE_COUPON: (id: string) =>
    `/api/v1/stamps/stamp-boards/${id}/issue-coupon`,
  COUPON_LIST: '/api/v1/coupons',
  COUPON_DETAIL: (couponId: string) => `/api/v1/coupons/${couponId}`,
  MISSION_REQUEST: '/api/v1/stamps/mission-requests',
  STAMP: (stampboardId: number) =>
    `/api/v1/stamps/stamp-boards/${stampboardId}/stamp`,
  RECEIVE_GIFT: (couponId: number | string) =>
    `/api/v1/coupons/${couponId}/receive`,
  REQUEST_GIFT: (couponId: number | string) =>
    `/api/v1/coupons/${couponId}/request`,
  NEW_REQUEST: '/api/v1/families/new-request-mark',
  RANKING: '/api/v1/rankings',
  POINT_LOG: '/api/v1/member-points/earning-histories/me',
  MY_POINT: '/api/v1/member-points/me',
  NOTIFICATION_LIST: '/api/v1/notifications',
};

export default API_URLS;

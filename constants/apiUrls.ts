// API URL 목록
const API_URLS = {
  REGISTER: '/api/v1/auth/register',
  AUTH_TOKEN: {
    kakao: (code: string) =>
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${code}`,
    google: (code: string) =>
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
  },
  LOGIN: (type: string) => `/api/v1/auth/login/${type}`,
  DUPLICATE_CHECK: (nickname: string) =>
    `/api/v1/auth/validate/nickname?value=${nickname}`,
  USER_INFO: '/api/v1/users/me',
  FAMILIES: '/api/v1/families',
};

export default API_URLS;

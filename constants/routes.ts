export const redirectUri = {
  kakao: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  google: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
};

const clientId = {
  kakao: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
  google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

const ROUTES = {
  SIGNUP: {
    TYPE: '/oauth/signup/type',
    NICKNAME: '/oauth/signup/nickname',
    PARENT: '/oauth/signup/parent',
    PROFILE: '/oauth/signup/profile',
  },
  MAIN: '/main',
  KAKAO_LOGIN: `https://kauth.kakao.com/oauth/authorize?client_id=${clientId.kakao}&redirect_uri=${redirectUri.kakao}&response_type=code`,
  GOOGLE_LOGIN: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId.google}&redirect_uri=${redirectUri.google}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`,
};

export default ROUTES;

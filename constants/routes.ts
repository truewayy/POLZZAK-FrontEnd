export const redirectUri = {
  kakao: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  google: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
};

const clientId = {
  kakao: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
  google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

const ROUTES = {
  LOGIN: '/',
  REDIRECT: '/oauth/redirect',
  SIGNUP: {
    ROOT: '/oauth/signup',
    TERMS: '/oauth/signup/terms',
    TYPE: '/oauth/signup/type',
    NICKNAME: '/oauth/signup/nickname',
    PARENT: '/oauth/signup/parent',
    PROFILE: '/oauth/signup/profile',
  },
  PROFILE: {
    ROOT: '/my-page',
    RANKING: '/my-page/ranking',
    POINTS: '/my-page/points',
    RULES: '/my-page/rules',
    CALL_CENTER: '/my-page/call-center',
    ACCOUNT: '/my-page/account',
    EXIT: '/my-page/account/exit',
    SETTING: '/my-page/setting',
  },
  MAIN: '/home',
  FIND: '/find',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  NOTICE: '/notice',
  FIND_FAMILY: '/find/family',
  ON_BOARDING: {
    PARENT: '/onboarding/parent',
    KID: '/onboarding/kid',
  },
  CREATE_STAMPBOARD: '/create/stampboard',
  KAKAO_LOGIN: `https://kauth.kakao.com/oauth/authorize?client_id=${clientId.kakao}&redirect_uri=${redirectUri.kakao}&response_type=code`,
  GOOGLE_LOGIN: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId.google}&redirect_uri=${redirectUri.google}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`,
};

export default ROUTES;

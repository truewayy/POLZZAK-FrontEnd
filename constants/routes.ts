const kakaoId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const googleId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
export const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

const ROUTES = {
  KAKAO_LOGIN: `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoId}&redirect_uri=${kakaoRedirectUri}&response_type=code`,
  GOOGLE_LOGIN: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`,
};

export default ROUTES;

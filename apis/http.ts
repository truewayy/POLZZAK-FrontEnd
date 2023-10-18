/* eslint-disable no-param-reassign */
import axios from 'axios';

import { TOKEN_KEY } from '@/constants/auth';
import { getLocalStorage } from '@/utils/storage';

// API 주소
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const googleAuth = 'https://oauth2.googleapis.com';
const kakaoAuth = 'https://kauth.kakao.com';

// axios 인스턴스 생성
// eslint-disable-next-line import/prefer-default-export
export const http = axios.create({ baseURL: API_BASE_URL });

http.interceptors.request.use(
  (config) => {
    // 헤더에 토큰 추가
    const accessToken = getLocalStorage(TOKEN_KEY);
    console.log(accessToken);
    if (accessToken) {
      if (
        !config.url?.includes(googleAuth) &&
        !config.url?.includes(kakaoAuth)
      ) {
        config.withCredentials = true;
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

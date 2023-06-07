/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';

import { TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

// API 주소
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const googleAuth = 'https://oauth2.googleapis.com';
const kakaoAuth = 'https://kauth.kakao.com';

// axios 인스턴스에 인터셉터를 추가하는 함수
const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      // 헤더에 토큰 추가
      const accessToken = getLocalStorage(TOKEN_KEY);
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

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const tokenInvalidErr = error.response.data.code === 431;
      const tokenExpiredErr = error.response.data.code === 434;
      if (tokenInvalidErr) {
        window.location.href = ROUTES.LOGIN;
      }
      if (tokenExpiredErr) {
        const newToken = error.response.data.data;
        setLocalStorage(TOKEN_KEY, newToken);
        return instance(error.response.config);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// axios 인스턴스 생성
const http = setInterceptor(axios.create({ baseURL: API_BASE_URL }));

export default http;

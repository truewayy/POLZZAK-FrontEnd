/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';

import { TOKEN_KEY } from '@/constants/auth';
import { getLocalStorage } from '@/utils/storage';

// API 주소
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// axios 인스턴스에 인터셉터를 추가하는 함수
const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      // 헤더에 토큰 추가
      const accessToken = getLocalStorage(TOKEN_KEY);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
};

// axios 인스턴스 생성
const http = setInterceptor(axios.create({ baseURL: API_BASE_URL }));

export default http;

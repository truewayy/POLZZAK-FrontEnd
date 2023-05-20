import axios, { AxiosInstance } from 'axios';

// API 주소
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// axios 인스턴스에 인터셉터를 추가하는 함수
const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => config,
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

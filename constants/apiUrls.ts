// API URL 목록
const API_URLS = {
  LOGIN: (type: string) => `/api/v1/auth/login/${type}`,
  DUPLICATE_CHECK: (nickname: string) =>
    `/api/v1/auth/validate/nickname?value=${nickname}`,
};

export default API_URLS;

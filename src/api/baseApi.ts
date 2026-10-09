import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// По умолчанию — наш сервер через proxy Vite. Чужой бэкенд: VITE_API_URL в .env
const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Products'],
  endpoints: () => ({}),
});

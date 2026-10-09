import { parseDate } from '../../utils/utils';
import { baseApi } from '../baseApi';
import type { Data, Point } from '../types/datas';

export const dataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query<Point[], void>({
      query: () => ({ url: '' }),
      transformResponse: (raw: Data[]) =>
        raw
          .map(({ date, value }) => ({ ts: parseDate(date), value }))
          .sort((a, b) => a.ts - b.ts),
    }),
  }),
});

export const {
  useGetDataQuery,
} = dataApi;

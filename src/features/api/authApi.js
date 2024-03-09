import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
    getVillage: build.query({
      query: ({ ward }) => ({
        url: `/api/data/villageByWard/${ward}`,
        method: 'GET',
      }),
    }),
    getSingleDetails: build.query({
      query: ({ id }) => ({
        url: `/api/data/single-details/${id}`,
        method: 'GET',
      }),
    }),
   
    postApplicationData: build.mutation({
      query: (data) => ({
        url: `/api/data/post-data`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: createdPost } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.upsertQueryData('getWardData', data, createdPost)
          )
        } catch (error) {
          console.error("Error in onQueryStarted:", error);
        }
      },
    }), 
    getWardData: build.query({
      query: ({ ward, page, perPage }) => ({
        url: `/api/data/ward-data/${ward}?page=${page}&perPage=${perPage}`,
        method: 'GET',
        providesTags: ['Post'],
      }),
    }), 

    getWardDataForCalculate: build.query({
      query: ({ward}) => ({
        url: `/api/data/ward-data-calculate/${ward}`,
        method: 'GET',
        providesTags: ['Post'],
      }),
    }), 
    
    singleDataUpdate: build.mutation({
      query: ({ data, id }) => ({
        url: `/api/data/update-data/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    singleDataDelete: build.mutation({
      query: ({ id }) => ({
        url: `/api/data/delete-data/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

// Export react hook
export const {
  useGetDetailsQuery,
  useGetVillageQuery,
  usePostApplicationDataMutation,
  useGetWardDataQuery,
  useGetSingleDetailsQuery,
  useSingleDataUpdateMutation,
  useSingleDataDeleteMutation,
  getWardDataForCalculate,
  useGetWardDataForCalculateQuery,
 
} = authApi;

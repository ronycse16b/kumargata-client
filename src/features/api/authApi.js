import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ['get','User'],
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
      providesTags: ['get'],
    }),
    getSingleDetails: build.query({
      query: ({ id }) => ({
        url: `/api/data/single-details/${id}`,
        method: 'GET',
      }),
      providesTags: ['get'],
   
    }),

    getAllData: build.query({
      query: () => ({
        url: `/api/data/all-data`,
        method: 'GET',
      }),
      providesTags: ['get'],
     

    }),
   

    
    
    
    getWardData: build.query({
      query: ({ ward, page, perPage }) => ({
        url: `/api/data/ward-data/${ward}?page=${page}&perPage=${perPage}`,
        method: 'GET',
      }),
      providesTags: ['get'],
   
    }), 
 

    getWardDataForCalculate: build.query({
      query: ({ward}) => ({
        url: `/api/data/ward-data-calculate/${ward}`,
        method: 'GET',
        
      }),
      providesTags: ['get'],
     
    }), 

    getTaxRegister: build.query({
      query: ({page,limit}) => ({
        url: `/api/data/tax-register?page=${page}&limit=${limit}`,
        method: 'GET',
        
      }),
      
      providesTags: ['get'],

    }),

    getSingleTaxRecipt: build.query({
      query: ({id}) => ({
        url: `/api/data/recipt/${id}`,
        method: 'GET',
      }),
      
      providesTags: ['get'],

    }),
    getMoneyRecipt: build.query({
      query: () => ({
        url: `/api/data/recipt`,
        method: 'GET',
        
      }),
      
      providesTags: ['get'],
      
    }),

    getAllUsers: build.query({
      query: () => ({
        url: `/api/user/all-users`,
        method: 'GET',
        
      }),
      
      providesTags: ['User'],
      
    }),

    
    postApplicationData: build.mutation({
      query: (data) => ({
        url: `/api/data/post-data`,
        headers: {
          'Content-Type':'application/json',
        },
        method: 'POST',
        body: data,
      }),
     invalidatesTags: ['get']
    }),
    
    AddTaxData: build.mutation({
      query: (data) => ({
        url: `/api/data/tax-pay`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      }),
     invalidatesTags: ['get']
    }),
    
    singleDataUpdate: build.mutation({
      query: ({ data, id }) => ({
        url: `/api/data/update-data/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body:data,
      }),
       
      invalidatesTags:['get']

    }),
    userUpdate: build.mutation({
      query: ({id,...data }) => ({
        url: `/api/user/update/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body:data,
      }),
       
      invalidatesTags:['User']

    }),
    userProfileUpdate: build.mutation({
      query: ({email,...data }) => ({
        url: `/api/user/profile-update?email=${email}`,
        method: 'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body:data,
      }),
       
      invalidatesTags:['User']

    }),
    updateAvatar: build.mutation({
      query: ({...avatar}) => ({
        url: '/api/user/avatar',
        method: 'PUT',
     
        body: avatar,
      }),
      invalidatesTags: ['User'],
    }),

    requestPasswordReset: build.mutation({
      query: ({ email }) => ({
        url: `/api/user/request-password?email=${email}`,
        method: 'POST',
      }),
      providesTags: ['User'],
   
    }), 

    passwordReset: build.mutation({
      query: ({ email,pin,password }) => ({
        url: `/api/user/reset-password?email=${email}&&pin=${pin}&password=${password}`,
        method: 'POST',
      }),
      providesTags: ['User'],
   
    }), 


    singleDataDelete: build.mutation({
      query: ({ id }) => ({
        url: `/api/data/delete-data/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
        },
      }),
      invalidatesTags: ['get'] // Specify which cached data should be invalidated after deletion
    }),

    userDelete: build.mutation({
      query: ({ id }) => ({
        url: `/api/user/delete/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
        },
        
      }),
       
      invalidatesTags:['User']

    }),
    
  }),
});

// Export react hook
export const {
  useGetDetailsQuery,useUserProfileUpdateMutation,
  useGetVillageQuery,
  usePostApplicationDataMutation,useRequestPasswordResetMutation,usePasswordResetMutation,
  useGetWardDataQuery,
  useGetSingleDetailsQuery,
  useSingleDataUpdateMutation,
  useSingleDataDeleteMutation,
  getWardDataForCalculate,
  useGetWardDataForCalculateQuery,useGetTaxRegisterQuery
, useGetSingleTaxReciptQuery , useGetMoneyReciptQuery,useGetAllDataQuery,useAddTaxDataMutation,useGetAllUsersQuery,useUserDeleteMutation,useUserUpdateMutation,
} = authApi;

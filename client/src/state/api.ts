import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetCompanyResponse,
  GetEventResponse,
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
  GetWaiterResponse,
} from "./types";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://re-order-server.vercel.app/',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Credentials', 'true');
      let token = getCookie('token')
      headers.set('Credentials', `${token}`);
      return headers;
    }, 
  }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions", "Companies", "Events", "Waiters", "Users"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
    getTransactionsById: build.query<GetTransactionsResponse, string>({
      query: (id) => ({ url: `transaction/transactions/${id}` }),
      //@ts-ignore
      providesTags: (result, error, id) => [{ type: 'Transactions', id }],
    }),
    getCompanies: build.query<Array<GetCompanyResponse>, void>({
      query: () => "company/companies/",
      providesTags: ["Companies"],
    }),
    getEvents: build.query<Array<GetEventResponse>, void>({
      query: () => "event/events/",
      providesTags: ["Events"],
    }),
    getEventById: build.query<GetEventResponse, string>({
      query: (id) => ({ url: `event/events/${id}` }),
      //@ts-ignore
      providesTags: (result, error, id) => [{ type: 'Events', id }],
    }),
    getWaiters: build.query<Array<GetWaiterResponse>, void>({
      query: () => "waiter/waiters/",
      providesTags: ["Waiters"],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: `product/products/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    addEvent: build.mutation({
      query: (body) => ({
        url: `event/events/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Events'],
    }),
    addCompany: build.mutation({
      query: (body) => ({
        url: `company/companies/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Companies'],
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: `transaction/transactions/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transactions'],
    }),
    login: build.mutation({
      query: (body) => ({
        url: `user/users/`,
        method: 'POST',
        body,
        credentials: "include"
      }),
      invalidatesTags: ['Users'],
    }),
    isLoggedIn: build.query<any, void>({
      query: () => ({
        url:"user/users/",
        credentials: "include"
      }),
      providesTags: ["Users"],
    }),
    updateOrder: build.mutation<GetTransactionsResponse, any>({
      query: ({ id, ...patch }) => ({
        url: `transaction/transactions/${id}`,
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['Transactions'],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getTransactions', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteOrder: build.mutation<GetTransactionsResponse, string>({
      query: (id) => ({
        url: `transaction/transactions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Transactions']
    }),
  }),
});

export const { useLoginMutation, useIsLoggedInQuery, useGetKpisQuery, useGetCompaniesQuery, useGetProductsQuery, useGetTransactionsQuery, useGetTransactionsByIdQuery, useGetWaitersQuery, useAddProductMutation, useAddCompanyMutation, useCreateOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation, useGetEventsQuery, useAddEventMutation, useGetEventByIdQuery } =
  api;
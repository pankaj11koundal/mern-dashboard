import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["News", "List", "Geography", "Overview", "Daily", "PieChart", 'Dashboard'],
    endpoints: (build) => ({
        getNews: build.query({
            query: () => "general/news",
            providesTags: ["News"]
        }),
        getList: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "general/list",
                method: 'GET',
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["List"]
        }),
        getGeography: build.query({
            query: () => 'general/geography',
            providedTags: ['Geography']
        }),
        getOverview: build.query({
            query: () => 'visuals/overview',
            providesTags: ['Overview']
        }),
        getDaily: build.query({
            query: () => 'visuals/daily',
            providedTags: ['Daily']
        }),
        getPieChart: build.query({
            query: () => 'visuals/pie%20chart',
            providedTags: ['PieChart']
        }),
        getDashboard: build.query({
            query: () => 'dashboard/dashboard',
            providesTags: ['Dashboard']
        })
    }),

})

export const {
    useGetNewsQuery, 
    useGetListQuery,
    useGetGeographyQuery,
    useGetOverviewQuery,
    useGetDailyQuery,
    useGetPieChartQuery,
    useGetDashboardQuery
} = api;
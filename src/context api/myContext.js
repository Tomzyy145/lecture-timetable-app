import {createContext, useState} from 'react'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const globalState = {
    Students: [],
    Levels: []
}

// Redux API
export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['book'],
    // baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}), 
    // 
    baseQuery: fetchBaseQuery({baseUrl: `https://lecture-timetable-api-production.up.railway.app`}),
    endpoints: builder => ({
        getData: builder.query({
            query: () => '/data',
            transformResponse: res => {
                globalState.Students = res.Students
                globalState.Levels = res.Levels
                return res
            },
            providesTags: ['book']
        }),
        addStudents: builder.mutation({
            query: (data) => {
                console.log(data)
                
                return {
                    url: '/data',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['book']
        }),
    })
})

export const {
    useGetDataQuery,
    useAddStudentsMutation
} = apiSlice


// CONTEXT
const AppContext = createContext()

function ContextProvider(props) {
    
    const [test, setTest] = useState('Jack mangrove')
    const [adminLogged, setAdminLogged] = useState(false)
    return (
        <AppContext.Provider value={{test, setTest, adminLogged, setAdminLogged, globalState}}>
            {props.children}
        </AppContext.Provider>
    )

}

export {ContextProvider, AppContext}
// export default AppContext

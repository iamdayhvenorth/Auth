import axios from "axios"
import {create} from "zustand"
import { immer } from 'zustand/middleware/immer'
import {createJSONStorage, persist} from "zustand/middleware"





type User = {
    email: string,
    name: string,
    token: string
}

type UserAuth = {
    isAuthenticated: boolean,
    user: User | null ,
    error: null | string
    isLoading: boolean
}


type Actions = {
    login: (email: string, password: string) => Promise<void>,
    // signup: (email: string, password: string) => Promise<void>,
    logout: () => void,
}



// axios default headers with credentials
// axios.defaults.withCredentials = true

// //axios default base url

axios.defaults.baseURL = "http://localhost:5000/api/auth"


// create user store with user authentication logic
const useUserAuthStore = create<UserAuth & Actions>()(
   persist(immer((set) => ({
    isAuthenticated: false,
    isLoading:false,
    user: null,
    token: null,
    error: null,
    logout: () => set({ isAuthenticated: false, user: {} as User }),
    login: async (email: string, password: string) => {
        set({isLoading: true, error: null})
        try {
            if(!email || !password) {
                set({error: "All fields are required"})
                return
            }
            const response = await axios.post("/login",{email,password},{
                headers: {
                    "Content-Type": "application/json",
                  }
            })

           if(response.data.success) {
               set({user: {
                   name: response.data.user.name,
                   email: response.data.user.email,
                   token: response.data.user.accessToken
               }, isAuthenticated: true })
           }

        } catch (err) {
            // set({error: (err as Error).message})
            if (axios.isAxiosError(err)) {
                // Handle Axios-specific errors
                const message = err.response
                  ? `${err.response.data.message || 'Something went wrong'}`
                  : 'Network error or no response from server';
                set({ error: message });
              } else {
                // Handle non-Axios errors
                set({ error: (err as Error).message});
              }
        } finally {
            set({isLoading: false})
        }
    }
   })),{
    name: "userAuth",
    version: 1,
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state)  => ({
        isAuthenticated: state.isAuthenticated
    }),
   })
)


export default useUserAuthStore
import {apiSlice} from '../api/apiSlice';
import {userLoggedIn, userRegistration} from './authSlice';

type RegistrationResponse = {
    message:string;
    activationToken:string;
};

type RegistrationData = {
    email: string;
    password: string;
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data,
                credentials: 'include' as const,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        activation: builder.mutation({
            query: ({activation_token, activation_code}) =>({
                url: 'activate-user',
                method: 'POST',
                body: { activation_token, activation_code },
            })
        }),
        userLoggedIn: builder.mutation({
            query: ({email, password}) => ({
                url: 'login',
                method: 'POST',
                body: { email, password },
                credentials: 'include' as const,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        userLoggedOut: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {useRegisterMutation, useActivationMutation, useUserLoggedInMutation} = authApi;

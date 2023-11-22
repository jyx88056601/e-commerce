import { useMutation } from '@tanstack/react-query'
import apiClient from "../services/apiClient";
import { UserInfo } from '../types/UserInfo'


interface SignInParams {
    email: string
    password: string
}

// useMutation hook:
export const useSigninMutation = () =>
  useMutation({
    mutationFn: ({email, password}: SignInParams) =>(
         apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).then(res  => res.data),
  })

// async await syntax:
// export const useSigninMutation = () =>
//   useMutation({
//     mutationFn: async ({
//       email,
//       password,
//     }: Props) =>
//       (
//         await apiClient.post<UserInfo>(`api/users/signin`, {
//           email,
//           password,
//         })
//       ).data,
//   })


interface SignUpParams {
  name: string
  email: string
  password: string
}

export const useSignupMutation = () =>
  useMutation({
    mutationFn: ({name, email, password}: SignUpParams ) =>(
         apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).then(res  => res.data),
  })


  interface UpdateProfileProps {
    name: string
    email: string
    password: string
  }

  export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({name,email, password} : UpdateProfileProps ) => (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          password,
        })
      ).data,
  })
import { useMutation } from '@tanstack/react-query'
import apiClient from "../services/apiClient";
import { UserInfo } from '../types/UserInfo'


interface Params {
    email: string
    password: string
}

// useMutation hook:
export const useSigninMutation = () =>
  useMutation({
    mutationFn: ({email, password}: Params) =>(
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
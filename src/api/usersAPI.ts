import { GetItemsType, ResponseType, instance } from './api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance
            .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => response.data) as Promise<ResponseType>
    },
    followUser(userId: number) {
        return instance
            .post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}
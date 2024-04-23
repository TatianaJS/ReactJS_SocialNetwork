import { PhotosType, UserProfileType } from '../types/types'
import { ResponseType, instance } from './api'

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance
            .get<UserProfileType>(`profile/` + userId)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance
            .get<string>(`profile/status/` + userId)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance
            .put<ResponseType>(`profile/status`, { status: status })
            .then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance
            .put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
    },
    saveProfile(profile: UserProfileType) {
        return instance
            .put(`profile`, profile)
            .then(res => res.data)
    }
}
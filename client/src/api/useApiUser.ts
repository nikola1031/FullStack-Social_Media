import { useFetch } from './useFetch';
import { userEndpoints } from './ENDPOINTS';
import { 
    Passwords, 
    UserData, 
    UserDataDTO, 
    UserImages, 
    ServerMessage, 
    UserProfilePicture, 
    FriendData,
    FriendStatus } from '../types/data';

export function useApiUsers() {
    const { get, post, put, del } = useFetch();

    const getProfileById: (userId: string) => Promise<UserData> = async (userId) => get(userEndpoints.profileById(userId));
    const uploadUserPhotos: (photos: FormData) => Promise<UserImages> = async (photos) => post(userEndpoints.uploadPhotos(), photos);
    const getProfilePhotos: (userId: string) => Promise<UserImages> = async (userId) => get(userEndpoints.getProfilePhotos(userId));
    const deleteProfilePhoto: (url: string) => Promise<UserImages> = async (url) => del(userEndpoints.deletePhoto(), {url});
    const updatePassword: (data: Passwords) => Promise<ServerMessage> = async (data) => put(userEndpoints.updatePassword(), data);
    const updateProfilePicture: (url: string) => Promise<UserProfilePicture> = async (url) => put(userEndpoints.updateProfilePicture(), {profilePicture: url});
    const updateProfile: (userData: UserDataDTO) => Promise<UserData> = async (userData) => put(userEndpoints.base(), userData);
    const toggleFriendRequest: (userId: string) => Promise<FriendData> = async (userId) => post(userEndpoints.friendRequest(userId), null);
    const toggleFriend: (userId: string) => Promise<FriendData> = async (userId) => post(userEndpoints.friend(userId), null);
    const getFriendStatus: (userId: string) => Promise<FriendStatus> = async (userId) => get(userEndpoints.friendStatus(userId));
    const followUser: (userId: string) => Promise<ServerMessage> = async (userId) => post(userEndpoints.followUser(userId), null);
    
    return {
        getProfileById,
        uploadUserPhotos,
        getProfilePhotos,
        deleteProfilePhoto,
        updatePassword,
        updateProfilePicture,
        updateProfile,
        toggleFriendRequest,
        toggleFriend,
        getFriendStatus,
        followUser
    };
}
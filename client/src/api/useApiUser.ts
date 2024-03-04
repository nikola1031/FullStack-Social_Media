import { useFetch } from './useFetch';
import { userEndpoints } from './ENDPOINTS';
import { Friend, FriendRequests, Image, Passwords, UserData, UserDataDTO } from '../types/data';

export function useApiUsers() {
    const { get, post, put, del } = useFetch()

    const getProfileById: (userId: string) => Promise<UserData> = async (userId) => get(userEndpoints.profileById(userId));
    const uploadUserPhotos: (photos: FormData) => Promise<{_id: string, photos: Image[]}> = async (photos) => post(userEndpoints.uploadPhotos(), photos);
    const getProfilePhotos: (userId: string) => Promise<{_id: string, photos: Image[]}> = async (userId) => get(userEndpoints.getProfilePhotos(userId));
    const deleteProfilePhoto: (url: string) => Promise<{_id: string, photos: Image[]}> = async (url) => del(userEndpoints.deletePhoto(), {url});
    const updatePassword: (data: Passwords) => Promise<void> = async (data) => put(userEndpoints.updatePassword(), data);
    const updateProfilePicture: (url: string) => Promise<void> = async (url) => put(userEndpoints.updateProfilePicture(), {profilePicture: url});
    const updateProfile: (userData: UserDataDTO) => Promise<void> = async (userData) => put(userEndpoints.base(), userData);
    const toggleFriendRequest: (userId: string) => Promise<{friends: Friend[], friendRequests: FriendRequests}> = async (userId) => post(userEndpoints.friendRequest(userId), null);
    const toggleFriend: (userId: string) => Promise<{friends: Friend[], friendRequests: FriendRequests}> = async (userId) => post(userEndpoints.friend(userId), null);
    const getFriendStatus: (userId: string) => Promise<'sent' | 'received' | 'friends' | 'none'> = async (userId) => get(userEndpoints.friendStatus(userId));
    const followUser: (userId: string) => Promise<void> = async (userId) => post(userEndpoints.followUser(userId), null);
    
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
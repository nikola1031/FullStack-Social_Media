import * as requestApi from './helpers/fetcher';
import { commentsEndpoints, postsEndpoints, userEndpoints } from './ENDPOINTS';
import { Image } from '../types/data';

// Posts
export const getPosts: () => Promise<any[]> = async () => requestApi.get(postsEndpoints.base(), null);
export const uploadPost: (post: any) => Promise<any> = async (post) => requestApi.post(postsEndpoints.base(), post);
export const getPostById: (postId: string) => Promise<any> = async (postId) => requestApi.get(postsEndpoints.postById(postId));
export const deletePostById: (postId: string) => Promise<any> = async (postId) => requestApi.del(postsEndpoints.postById(postId), null);
export const getLikedPostsByUser: (userId: string) => Promise<any[]> = async (userId) => requestApi.get(postsEndpoints.likedPosts(userId), null);
export const getPostsByUser: (userId: string) => Promise<any[]> = async (userId) => requestApi.get(postsEndpoints.postByUser(userId));
export const likePost: (postId: string) => Promise<{likeCount: number}> = async (postId) => requestApi.post(postsEndpoints.likePost(postId), null);

// Comments
export const getComments: (postId: string) => Promise<any[]> = async (postId) => requestApi.get(commentsEndpoints.base(postId), null);
export const updateComment: (postId: string, comment: any, commentId: string) => Promise<any> = async (postId, comment, commentId) => requestApi.put(commentsEndpoints.commentById(postId, commentId), comment);
export const postComment: (postId: string, comment: any) => Promise<any> = async (postId, comment) => requestApi.post(commentsEndpoints.base(postId), comment);
export const deleteCommentById: (postId: string, commentId: string) => Promise<any> = async (postId, commentId) => requestApi.del(commentsEndpoints.commentById(postId, commentId), null);
export const likeComment: (postId: string, commentId: string) => Promise<{likeCount: number}> = async (postId, commentId) => requestApi.post(commentsEndpoints.likeComment(postId, commentId), null);

// User
export const getProfileById: (userId: string) => Promise<any> = async (userId) => requestApi.get(userEndpoints.profileById(userId));
export const uploadUserPhotos: (photos: FormData) => Promise<{_id: string, photos: Image[]}> = async (photos) => requestApi.post(userEndpoints.uploadPhotos(), photos);
export const getProfilePhotos: (userId: string) => Promise<{_id: string, photos: Image[]}> = async (userId) => requestApi.get(userEndpoints.getProfilePhotos(userId));
export const deleteProfilePhoto: (url: string) => Promise<{_id: string, photos: Image[]}> = async (url) => requestApi.del(userEndpoints.deletePhoto(), {url});
export const updatePassword: () => Promise<void> = async () => requestApi.put(userEndpoints.updatePassword(), null);
export const updateProfilePicture: (url: string) => Promise<void> = async (url) => requestApi.put(userEndpoints.updateProfilePicture(), {profilePicture: url});
export const toggleFriendRequest: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.friendRequest(userId), null);
// export const denyFriendRequest: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.denyFriendRequest(userId), null);
export const toggleFriend: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.friend(userId), null);
export const followUser: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.followUser(userId), null);

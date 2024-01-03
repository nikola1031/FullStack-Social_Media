import * as requestApi from './helpers/fetcher';
import { commentsEndpoints, postsEndpoints, userEndpoints } from './ENDPOINTS';

export const getPosts: () => Promise<any[]> = async () => requestApi.get(postsEndpoints.base());
export const uploadPost: (post: any, token: string) => Promise<any> = async (post, token) => requestApi.post(postsEndpoints.base(), post, token);
export const getPostById: (postId: string) => Promise<any> = async (postId) => requestApi.get(postsEndpoints.postById(postId));
export const deletePostById: (postId: string, token: string) => Promise<any> = async (postId, token) => requestApi.del(postsEndpoints.postById(postId), null, token);
export const getPostsByUser: (userId: string) => Promise<any[]> = async (userId) => requestApi.get(postsEndpoints.postByUser(userId));
export const likePost: (postId: string, token: string) => Promise<void> = async (postId, token) => requestApi.post(postsEndpoints.likePost(postId), null, token);

export const getComments: (postId: string) => Promise<any[]> = async (postId) => requestApi.get(commentsEndpoints.base(postId));
export const postComment: (postId: string, comment: any, token: string) => Promise<any> = async (postId, comment, token) => requestApi.get(commentsEndpoints.base(postId), comment, token);
export const getCommentById: (postId: string, commentId: string) => Promise<any> = async (postId, commentId) => requestApi.get(commentsEndpoints.commentById(postId, commentId));
export const deleteCommentById: (postId: string, commentId: string, token: string) => Promise<any> = async (postId, commentId, token) => requestApi.del(commentsEndpoints.commentById(postId, commentId), null, token);
export const likeComment: (postId: string, commentId: string) => Promise<void> = async (postId, commentId) => requestApi.post(commentsEndpoints.likeComment(postId, commentId), null);

export const getUserProfile: () => Promise<any> = async () => requestApi.get(userEndpoints.base());
export const uploadUserPhotos: () => Promise<any> = async () => requestApi.post(userEndpoints.uploadPhotos(), null);
export const getProfilePhotos: (userId: string) => Promise<any[]> = async (userId) => requestApi.get(userEndpoints.getProfilePhotos(userId));
export const updatePassword: () => Promise<void> = async () => requestApi.put(userEndpoints.updatePassword(), null);
export const updateProfilePicture: () => Promise<void> = async () => requestApi.put(userEndpoints.updateProfilePicture(), null);
export const sendFriendRequest: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.sendFriendRequest(userId), null);
export const denyFriendRequest: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.denyFriendRequest(userId), null);
export const confirmFriendRequest: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.confirmFriendRequest(userId), null);
export const followUser: (userId: string) => Promise<void> = async (userId) => requestApi.post(userEndpoints.followUser(userId), null);

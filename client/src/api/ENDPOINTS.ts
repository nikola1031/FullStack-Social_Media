export const authEndpoints = {
    login: () => `/auth/login`,
    register: () => `/auth/register`,
    logout: () => `/auth/logout`,
}

export const postsEndpoints = {
    base: () => `/posts`,
    postById: (postId: string) => `/posts/${postId}`,
    postByUser: (userId: string) => `/posts/user/${userId}`,
    likePost: (postId: string) => `/posts/${postId}/like`
};

export const commentsEndpoints = {
    base: (postId: string) => `/posts/${postId}/comments`,
    commentById: (postId: string, commentId: string) => `/posts/${postId}/comments/${commentId}`,
    likeComment: (postId: string, commentId: string) => `/posts/${postId}/comments/${commentId}/like`
};

export const userEndpoints = {
    base: () => `/profile`,
    uploadPhotos: () => `/profile/photos`,
    getProfilePhotos: (userId: string) => `/profile/${userId}/photos`,
    updatePassword: () => `/profile/password`,
    updateProfilePicture: () => `/profile/picture`,
    sendFriendRequest: (userId: string) => `/friend/${userId}/request`,
    denyFriendRequest: (userId: string) => `/friend/${userId}/request/deny`,
    confirmFriendRequest: (userId: string) => `/friend/${userId}/confirm`,
    followUser: (userId: string) => `/follow/${userId}`
};
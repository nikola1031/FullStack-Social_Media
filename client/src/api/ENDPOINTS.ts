export const authEndpoints = {
    login: () => `/auth/login`,
    register: () => `/auth/register`,
    logout: () => `/auth/logout`,
}

export const postsEndpoints = {
    base: () => `/posts`,
    likedPosts: (userId: string) => `/posts/user/${userId}?liked=true`,
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
    base: () => `/users/profile`,
    profileById: (userId: string) => `/users/profile/${userId}`,
    updateProfile: (userId: string) => `/users/profile/${userId}`,
    uploadPhotos: () => `/users/profile/photos`,
    updatePassword: () => `/users/profile/password`,
    updateProfilePicture: () => `/users/profile/picture`,
    getProfilePhotos: (userId: string) => `/users/profile/${userId}/photos`,
    deletePhoto: () => `/users/profile/photos`,
    friendRequest: (userId: string) => `/users/friend/${userId}/request`,
    // denyFriendRequest: (userId: string) => `/users/friend/${userId}/request/deny`,
    friend: (userId: string) => `/users/friend/${userId}`,
    followUser: (userId: string) => `/users/follow/${userId}`
};
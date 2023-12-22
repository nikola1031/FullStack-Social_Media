enum PathKey {
    Home = 'Home',
    Friends = 'Friends',
    LikedPosts = 'LikedPosts',
    Profile = 'Profile',
    Register = 'Register',
    Login = 'Login',
    Photos = 'Photos',
    Edit = 'Edit',
    Posts = 'Posts',
    ChangePassword = 'ChangePassword',
}

const PathConstants: Record<PathKey, string> = {
    Home: '',
    Friends: 'friends',
    Posts: 'posts',
    LikedPosts: '?liked=true',
    Photos: 'photos',
    Profile: 'profile',
    Edit: 'edit',
    Login: 'login',
    Register: 'register',
    ChangePassword: 'change-password',
};

export default PathConstants;

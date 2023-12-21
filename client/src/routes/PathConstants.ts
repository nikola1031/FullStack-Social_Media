enum PathKey {
    Home = 'Home',
    Friends = 'Friends',
    LikedPosts = 'LikedPosts',
    Profile = 'Profile',
    Register = 'Register',
    Login = 'Login',
    Photos = 'Photos',
}

const PathConstants: Record<PathKey, string> = {
    Home: '',
    Friends: 'friends',
    LikedPosts: 'liked-posts',
    Photos: 'photos',
    Profile: 'profile',
    Login: 'login',
    Register: 'register'
}

export default PathConstants
enum PathKey {
    Home = 'Home',
    Friends = 'Friends',
    LikedPosts = 'LikedPosts',
    Profile = 'Profile',
    Register = 'Register',
    Login = 'Login',
}

const PathConstants: Record<PathKey, string> = {
    Home: '/',
    Friends: '/friends',
    LikedPosts: '/posts/liked',
    Profile: '/profile',
    Login: '/login',
    Register: '/register'
}

export default PathConstants
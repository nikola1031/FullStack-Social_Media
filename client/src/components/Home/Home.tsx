import './Home.css'

export default function Home() {
    return (
        <div className="home">
            <h1>Welcome to Our Social Media Platform</h1>
            <p>Connect, share, and engage with people around the world.</p>
            <p>Connect, share, and engage with people around the world.</p>

            {/* Buttons to trigger overlay for login/register */}
            <button className="btn">Login</button>
            <button className="btn">Register</button>
        </div>
    );
}

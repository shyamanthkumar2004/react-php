import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle redirection in useEffect
    console.log(user);
    useEffect(() => {
        if (!user) {
            console.log('Redirecting');
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    // Show loading state while checking auth
    if (!user) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    // Render dashboard content for authenticated users
    return (
        <div className="dashboard">
            <h1>Welcome, {user.username}!</h1>
            <p>Email: {user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
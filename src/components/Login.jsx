import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", { email, password }); // Add this
        try {
            const res = await axios.post('http://localhost/react-php-auth/api/login', {
                email,
                password
            });
            console.log("Complete response object:", res.data);
            console.log("Status code from server:", res.status); // HTTP status
            if (res.status === 200) {
                console.log("Login successful, redirecting..."); // Add this
                const jsonStart = res.data.indexOf('{');
                const jsonEnd = res.data.lastIndexOf('}') + 1;
                const jsonString = res.data.slice(jsonStart, jsonEnd);
                const responseData = JSON.parse(jsonString);
        
                console.log("Parsed response:", responseData);
                login(responseData.user);
                console.log("Shyam");
                navigate('/dashboard');
            } else {
                console.log("Login failed, error:", res.data.message); // Add this
                setError(res.data.message);
            }
        } catch (err) {
            setError('Login failed. Try again.');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
}
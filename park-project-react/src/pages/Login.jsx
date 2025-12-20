import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(formData.email, formData.password);

        if (result.success) {
            // Redirect based on user type
            if (result.user.type === 'admin') {
                navigate('/admin');
            } else if (result.user.type === 'employe') {
                navigate('/employee');
            } else {
                navigate('/');
            }
        } else {
            setErrorMessage(result.error);
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <label>Email or username:</label>
                            <input
                                type="text"
                                name="email"
                                className="t1"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                className="t1"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input type="submit" value="Login" className="submit-btn" />
                        </div>
                    </fieldset>
                </form>

                <div className="demo-credentials">
                    <p><strong>Demo Credentials:</strong></p>
                    <p>Admin: admin / admin123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;

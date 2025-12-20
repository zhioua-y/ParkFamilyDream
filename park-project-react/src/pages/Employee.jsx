import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/admin.css';

const Employee = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [activeSection, setActiveSection] = useState(0);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();

        // Simulate message submission
        console.log('Message from employee:', {
            from: currentUser.email,
            message: message
        });

        // Store in localStorage
        const messages = JSON.parse(localStorage.getItem('employeeMessages') || '[]');
        messages.push({
            id: Date.now(),
            email: currentUser.email,
            message: message,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('employeeMessages', JSON.stringify(messages));

        setSubmitted(true);
        setMessage('');

        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="employee-page">
            <nav>
                <h2>Employé</h2>
                <ul>
                    <li onClick={() => setActiveSection(0)}>Mes infos</li>
                    <li onClick={() => setActiveSection(1)}>Messagerie</li>
                    <li onClick={handleLogout}>Déconnecter</li>
                </ul>
            </nav>

            {/* Personal Info Section */}
            <section className="Emplye" id="emp" style={{ display: activeSection === 0 ? 'block' : 'none' }}>
                <h3>Mes informations</h3>
                {currentUser && (
                    <>
                        <p>Nom : {currentUser.username || currentUser.email}</p>
                        <p>Téléphone : {currentUser.tel || 'N/A'}</p>
                        <p>Poste : {currentUser.poste || 'Employee'}</p>
                    </>
                )}
            </section>

            {/* Messaging Section */}
            <section className="Emplye" id="msg" style={{ display: activeSection === 1 ? 'block' : 'none' }}>
                <h3>Envoyer un message</h3>

                {submitted && (
                    <div className="success-message">
                        Message envoyé avec succès!
                    </div>
                )}

                <form onSubmit={handleMessageSubmit}>
                    <textarea
                        placeholder="Votre message..."
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Envoyer</button>
                </form>
            </section>
        </div>
    );
};

export default Employee;

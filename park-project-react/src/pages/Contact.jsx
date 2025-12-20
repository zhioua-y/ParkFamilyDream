import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/contact.css';

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Server response:", data);

            setSubmitted(true);                  
            setFormData({ email: "", message: "" }); 

            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="contact-page">
            <section className="contact-section">
                <h2>Contactez-nous</h2>

                <div className="contact-info">
                    <p><strong>Téléphone :</strong> <a href="tel:+21690200502">90 200 502</a></p>
                    <p><strong>Facebook :</strong> <a href="https://www.facebook.com/profile.php?id=61560314944375" target="_blank" rel="noopener noreferrer">Notre Page Facebook</a></p>
                    <p><strong>Adresse :</strong> <a href="https://maps.app.goo.gl/rxa81KdAeGrPZyqs7" target="_blank" rel="noopener noreferrer">Voir sur Google Maps</a></p>
                </div>

                {submitted ? (
                    <div className="success-message">
                        <p>Merci! Votre message a été envoyé avec succès.</p>
                        <p>Redirection vers la page d'accueil...</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre adresse email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Votre message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Envoyer</button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Contact;

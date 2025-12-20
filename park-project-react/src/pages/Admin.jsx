import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const { logout, token } = useAuth();
    const [activeSection, setActiveSection] = useState(0);

    // Employees (Not implemented in backend yet, keeping static or empty)
    const [employees, setEmployees] = useState([]);

    // Food (Restaurant)
    const [foodItems, setFoodItems] = useState([]);
    const [showFoodForm, setShowFoodForm] = useState(false);
    const [foodForm, setFoodForm] = useState({
        food_name: '', food_price: '', food_desc: '', food_img: null
    });

    // Coffee
    const [coffeeItems, setCoffeeItems] = useState([]);
    const [showCoffeeForm, setShowCoffeeForm] = useState(false);
    const [coffeeForm, setCoffeeForm] = useState({
        coffee_name: '', coffee_price: '', coffee_img: null
    });

    // Messages
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Coffee
            const coffeeRes = await fetch('http://localhost:5000/api/coffee');
            const coffeeData = await coffeeRes.json();
            setCoffeeItems(coffeeData);

            // Fetch Restaurant (Food)
            const restRes = await fetch('http://localhost:5000/api/restaurant');
            const restData = await restRes.json();
            setFoodItems(restData);

            // Fetch Messages (Protected)
            if (token) {
                const msgRes = await fetch('http://localhost:5000/api/message', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const msgData = await msgRes.json();
                if (msgData.success) setMessages(msgData.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Food handlers
    const handleFoodSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', foodForm.food_name);
        formData.append('price', foodForm.food_price);
        formData.append('description', foodForm.food_desc);
        if (foodForm.food_img) {
            formData.append('image', foodForm.food_img);
        }

        try {
            const res = await fetch('http://localhost:5000/api/restaurant', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                fetchData(); // Refresh list
                setFoodForm({ food_name: '', food_price: '', food_desc: '', food_img: null });
                setShowFoodForm(false);
            }
        } catch (error) {
            console.error("Error adding food:", error);
        }
    };

    const deleteFood = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/restaurant/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error deleting food:", error);
        }
    };

    // Coffee handlers
    const handleCoffeeSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', coffeeForm.coffee_name);
        formData.append('price', coffeeForm.coffee_price);
        if (coffeeForm.coffee_img) {
            formData.append('image', coffeeForm.coffee_img);
        }

        try {
            const res = await fetch('http://localhost:5000/api/coffee', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                fetchData(); // Refresh list
                setCoffeeForm({ coffee_name: '', coffee_price: '', coffee_img: null });
                setShowCoffeeForm(false);
            }
        } catch (error) {
            console.error("Error adding coffee:", error);
        }
    };

    const deleteCoffee = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/coffee/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error deleting coffee:", error);
        }
    };

    // ... render return ....

    return (
        <div className="admin-page">
            <nav>
                <h2>Admin</h2>
                <ul>
                    <li onClick={() => setActiveSection(0)}>Messagerie</li>
                    <li onClick={() => setActiveSection(1)}>Pizzeria</li>
                    <li onClick={() => setActiveSection(2)}>Cafe</li>
                    <li onClick={() => setActiveSection(4)}>Profil</li>
                    <li onClick={handleLogout} style={{ color: 'red' }}>Déconnecter</li>
                </ul>
            </nav>

            {/* Messages Section (Moved to default/first tab as per request 'see what people send') */}
            <section className="Emplye" style={{ display: activeSection === 0 ? 'block' : 'none' }}>
                <h3>Messagerie - Messages des clients</h3>
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(msg => (
                            <tr key={msg._id}>
                                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                <td>{msg.email}</td>
                                <td>{msg.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Food Section */}
            <section className="Emplye" style={{ display: activeSection === 1 ? 'block' : 'none' }}>
                <h3>Menu Restaurant</h3>
                <button onClick={() => setShowFoodForm(!showFoodForm)} style={{ marginBottom: '15px' }}>
                    Ajouter un plat
                </button>

                {showFoodForm && (
                    <form onSubmit={handleFoodSubmit} style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={foodForm.food_name}
                            onChange={(e) => setFoodForm({ ...foodForm, food_name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Prix"
                            value={foodForm.food_price}
                            onChange={(e) => setFoodForm({ ...foodForm, food_price: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={foodForm.food_desc}
                            onChange={(e) => setFoodForm({ ...foodForm, food_desc: e.target.value })}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFoodForm({ ...foodForm, food_img: e.target.files[0] })}
                        />
                        <button type="submit">Enregistrer</button>
                    </form>
                )}

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodItems.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.imageUrl.startsWith('/uploads') ? `http://localhost:5000${item.imageUrl}` : item.imageUrl} width="50" alt={item.name} /></td>
                                <td>{item.name}</td>
                                <td>{item.price} DT</td>
                                <td>
                                    <button onClick={() => deleteFood(item._id)} style={{ background: 'red', color: 'white' }}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Coffee Section */}
            <section className="Emplye" style={{ display: activeSection === 2 ? 'block' : 'none' }}>
                <h3>Menu Café</h3>
                <button onClick={() => setShowCoffeeForm(!showCoffeeForm)} style={{ marginBottom: '15px' }}>
                    Ajouter un café
                </button>

                {showCoffeeForm && (
                    <form onSubmit={handleCoffeeSubmit} style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={coffeeForm.coffee_name}
                            onChange={(e) => setCoffeeForm({ ...coffeeForm, coffee_name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Prix"
                            value={coffeeForm.coffee_price}
                            onChange={(e) => setCoffeeForm({ ...coffeeForm, coffee_price: e.target.value })}
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setCoffeeForm({ ...coffeeForm, coffee_img: e.target.files[0] })}
                        />
                        <button type="submit">Enregistrer</button>
                    </form>
                )}

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coffeeItems.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.imageUrl.startsWith('/uploads') ? `http://localhost:5000${item.imageUrl}` : item.imageUrl} width="50" alt={item.name} /></td>
                                <td>{item.name}</td>
                                <td>{item.price} DT</td>
                                <td>
                                    <button onClick={() => deleteCoffee(item._id)} style={{ background: 'red', color: 'white' }}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="Emplye" style={{ display: activeSection === 4 ? 'block' : 'none' }}>
                <h3>Profil Admin</h3>
                <p>Connecté en tant que Admin</p>
            </section>
        </div>
    );
};

export default Admin;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('messages');
    const [messages, setMessages] = useState([]);
    const [coffee, setCoffee] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        fetchData(token);
    }, [navigate]);

    const fetchData = async (token) => {
        const headers = { Authorization: `Bearer ${token}` };

        try {
            // Fetch Messages
            const msgRes = await fetch('http://localhost:5000/api/message', { headers });
            const msgData = await msgRes.json();
            if (msgData.success) setMessages(msgData.data);

            // Fetch Coffee
            const coffeeRes = await fetch('http://localhost:5000/api/coffee');
            const coffeeData = await coffeeRes.json();
            setCoffee(coffeeData);

            // Fetch Restaurant
            const restRes = await fetch('http://localhost:5000/api/restaurant');
            const restData = await restRes.json();
            setRestaurant(restData);

        } catch (err) {
            console.error("Error fetching data", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard" style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} style={{ padding: '10px', background: 'red', color: 'white', border: 'none' }}>Logout</button>
            </header>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('messages')} style={{ fontWeight: activeTab === 'messages' ? 'bold' : 'normal' }}>Messages</button>
                <button onClick={() => setActiveTab('coffee')} style={{ fontWeight: activeTab === 'coffee' ? 'bold' : 'normal' }}>Coffee Menu</button>
                <button onClick={() => setActiveTab('restaurant')} style={{ fontWeight: activeTab === 'restaurant' ? 'bold' : 'normal' }}>Restaurant Menu</button>
            </div>

            <div className="content">
                {activeTab === 'messages' && (
                    <div>
                        <h2>Messages ({messages.length})</h2>
                        {messages.length === 0 ? <p>No messages.</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {messages.map(msg => (
                                    <li key={msg._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                                        <strong>From:</strong> {msg.email} <br />
                                        <strong>Date:</strong> {new Date(msg.createdAt).toLocaleString()} <br />
                                        <p>{msg.message}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {activeTab === 'coffee' && (
                    <div>
                        <h2>Coffee Menu</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {coffee.map(item => (
                                <div key={item._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'restaurant' && (
                    <div>
                        <h2>Restaurant Menu</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {restaurant.map(item => (
                                <div key={item._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

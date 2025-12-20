import { useEffect, useState } from "react";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/message");
                if (!res.ok) throw new Error("Failed to fetch messages");

                const data = await res.json();
                setMessages(data.data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="admin-messages">
            <style>{`
                .admin-messages {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    min-height: 100vh;
                }
                .admin-messages h2 {
                    margin-bottom: 20px;
                    color: #333;
                }
                .admin-messages table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #fff;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .admin-messages th, .admin-messages td {
                    border: 1px solid #ddd;
                    padding: 12px 15px;
                    text-align: left;
                }
                .admin-messages th {
                    background-color: #007BFF;
                    color: #fff;
                    font-weight: bold;
                }
                .admin-messages tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                .admin-messages tr:hover {
                    background-color: #e6f7ff;
                }
                .admin-messages p {
                    color: #666;
                    font-size: 16px;
                }
            `}</style>

            <h2>All Messages</h2>
            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(msg => (
                            <tr key={msg.id}>
                                <td>{msg.id}</td>
                                <td>{msg.email}</td>
                                <td>{msg.message}</td>
                                <td>{new Date(msg.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminMessages;

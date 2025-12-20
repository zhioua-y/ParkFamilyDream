import Card from '../components/Card';
import Header from '../components/Header';
import '../styles/coffee.css';
import React, { useState, useEffect } from "react";


const Coffee = () => {
    const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/coffee")
      .then(res => res.json())
      .then(data => setMessage(data));
  }, []);
    return (
        <div className="coffee-page">
            <Header headerImage="/images/head.jpg" />

            <div className="menu-container">
                <center>
                    {message.map(item => (
                        <Card
                            key={item.id}
                            image={item.imageUrl}
                            title={item.name}
                            price={item.price}
                        />
                    ))}
                </center>
            </div>
        </div>
    );
};

export default Coffee;

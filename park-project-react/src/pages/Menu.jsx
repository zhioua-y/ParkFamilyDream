import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Card from '../components/Card';
import '../styles/menu.css';

const Menu = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/restaurant")
            .then(res => res.json())
            .then(data => setFoods(data))
            .catch(err => console.error("Failed to fetch foods:", err));
    }, []);

    return (
        <div className="menu-page">
            <Header headerImage="/images/header2.png" />

            <section className="card_container">
                {foods.map(item => (
                    <Card
                        key={item.id}
                        image={item.imageUrl}
                        title={item.name}
                        button={<button>{item.price} DT</button>}
                    />
                ))}
            </section>
        </div>
    );
};

export default Menu;

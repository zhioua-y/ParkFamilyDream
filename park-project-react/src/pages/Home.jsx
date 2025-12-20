import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="home-page">
            <Header headerImage="/images/headd.jpg" />

            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Family Dream</h1>
                    <p>Your destination for delicious food and unforgettable experiences.</p>
                    <Link to="/menu" className="btn">Explore Our Menu</Link>
                </div>
            </section>

            <section className="menu">
                <center>
                    <Card
                        image="/images/pizza.jpg"
                        title="-Pizza-"
                    />
                    <Card
                        image="/images/makloub.jpg"
                        title="-Makloub-"
                    />
                </center>
            </section>

            <section className="hero">
                <div className="hero-content">
                    <h1>Enjoy Our Special Coffee</h1>
                    <p>Enjoy freshly brewed coffee, from espresso to lattes, perfect for any time of day!</p>
                    <Link to="/coffee" className="btn">Explore Our Coffee Menu</Link>
                </div>
            </section>

            <section>
                <center>
                    <Card
                        image="/images/espresso.jpg"
                        title="-Espresso-"
                    />
                    <Card
                        image="/images/latte.jpg"
                        title="-Latte-"
                    />
                </center>
            </section>
        </div>
    );
};

export default Home;

import { Link } from 'react-router-dom';
import SideNav from './SideNav';
import '../styles/header.css';

const Header = ({ headerImage = '/images/head.jpg', showNav = true }) => {
    return (
        <header>
            <div className="logo">
                <img src="/images/logo2.png" alt="Family Dream Logo" className="logoImg" />
            </div>

            {showNav && (
                <div className="navdiv">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/coffee">Coffee</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            )}

            <SideNav />

            <center>
                <img src={headerImage} alt="Header" className="headImg" />
            </center>
        </header>
    );
};

export default Header;

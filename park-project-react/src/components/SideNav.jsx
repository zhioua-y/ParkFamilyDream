import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                id="menuToggle"
                className="menu-button"
                onClick={toggleNav}
            >
                ☰
            </button>

            <nav
                id="sideNav"
                className="side-nav"
                style={{ right: isOpen ? '0px' : '-250px' }}
            >
                <ul>
                    <li><Link to="/" onClick={toggleNav}>Home</Link></li>
                    <li><Link to="/menu" onClick={toggleNav}>Restaurant</Link></li>
                    <li><Link to="/coffee" onClick={toggleNav}>Coffee</Link></li>
                    <li><Link to="/contact" onClick={toggleNav}>Contact</Link></li>
                    <li><Link to="/login" onClick={toggleNav}>Login</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default SideNav;

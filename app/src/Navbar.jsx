import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/"><a>Home</a></Link></li>
                <li><Link to="/journal"><a>Journal</a></Link></li>
                <li><Link to="/chat"><a>Chat</a></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const notFoundPage = () => (
    <div className="bg" >
        <h1 >Error 404</h1>
        <Link to="/"> <h2 >MainPage</h2></Link>
    </div>
)

//export component
export default notFoundPage;
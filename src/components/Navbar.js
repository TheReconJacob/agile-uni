import React from "react";
import { Link } from "react-router-dom";
import agileUniLogo from '../images/agileUniLogo.png'



class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="c-simple-masthead">
                    <div className="c-simple-masthead__inner o-container">
                        <img className="c-simple-masthead__logo" src={agileUniLogo} sizes="100vw"/>
                        <span className="c-simple-masthead__title">
                            <div>
                                <Link to="/">Home</Link>
                                <Link to="/courses">Courses</Link>
                            </div>
                        </span>
                    </div> 
                </div>
            </nav>
          
        )
    }
}

export default Navbar;

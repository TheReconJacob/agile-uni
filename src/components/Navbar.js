import React from "react";
import { SimpleMasthead } from "@sky-uk/molecules";
import { Link } from 'react-router-dom'


class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <SimpleMasthead
                    title={
                        <div>
                            <a><Link to="/">Home</Link></a>
                            <a><Link to="/courses">Courses</Link></a>
                        </div>
                    }               
                />

            </nav>
        )
    }
}

export default Navbar;

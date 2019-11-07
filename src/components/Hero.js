import React from "react";
import "../styles/hero.scss"

const Hero = (props) => {
    return (
        <div className="c-hero background-hero">
            <div className="c-hero__caption">
                <div className="o-container">
                        <p className="c-heading-alpha u-margin-bottom-none">{props.title}</p>
                </div>
            </div>
        </div>
    )
}

export default Hero;
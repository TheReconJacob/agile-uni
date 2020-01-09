import React, { useState, useEffect } from "react";
import "../App.scss";
import SearchBar from "../components/SearchBar.js";
import "../styles/errors.scss";
import { Link } from "react-router-dom";
import axios from "axios";

function ErrorPage () {
    const [imageUrl, setImageUrl] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/retrieveRandomAnimal", { responseType: "blob" })
            .then(response => {
                const urlCreator = window.URL || window.webkitURL;
                setImageUrl(urlCreator.createObjectURL(response.data));
            })
            .catch(response => {
                console.error(response.error);
            })
    }, [])
    return (
        <div>
            <div className="c-hero hero-background">
            <div className="hero-title">
                <p className="hero-title-text" style = {{textShadow: "2px 2px 3px black"}}>Find your next course...</p>
                <SearchBar />
            </div>
            </div> 
            <div className = "errorText">
                <h1 style={{fontSize:"70px"}}>Sorry</h1>
                <h2>we couldn't find that page <br/> Try searching again or return to the <Link to = {'/'}>Home Page.</Link></h2>
                <img src={imageUrl} alt="Image of cute animal" style={{maxWidth:"50%", maxHeight:"20%"}}/>
                {/* if error = 403
                    "you do not have access to this page."
                else 
                    "we couldn't find that page."
                end */}
            </div>
            
        </div>
    );
}

export default ErrorPage;
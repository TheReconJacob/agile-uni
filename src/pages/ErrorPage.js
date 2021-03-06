import React, { useState, useEffect } from "react";
import "../App.scss";
import "../styles/errors.scss";
import { Link } from "react-router-dom";
import axios from "axios";

function ErrorPage(props) {
  const [imageUrl, setImageUrl] = useState("");
  const { errorMessage, errorStatus } = props;

  useEffect(props => {
    axios
      .get(`http://${process.env.REACT_APP_SERVER_URL}/retrieveRandomAnimal`, {
        responseType: "blob"
      })
      .then(response => {
        const urlCreator = window.URL || window.webkitURL;
        setImageUrl(urlCreator.createObjectURL(response.data));
      })
      .catch(response => {
        console.error(response.error);
      });
  }, []);

  return (
    <div>
      <div className="errorText">
        <h1 style={{ fontSize: "70px" }}>Sorry</h1>
        <h2 style={{ fontSize: "50px" }}>Error {errorStatus}</h2>
        <h3>
          {errorMessage} or return to the <Link to={"/"}>Home Page</Link>
        </h3>
        <img
          src={imageUrl}
          alt="Cute Animal"
          style={{ maxWidth: "50%", maxHeight: "20%" }}
        />
      </div>
    </div>
  );
}

export default ErrorPage;

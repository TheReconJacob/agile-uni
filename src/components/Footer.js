import React from "react";
import skyLogo from "../images/skyLogo.jpg";
import '../styles/footer.scss'

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="o-container">
          <div className="o-layout">
            <div className="o-layout__item u-width-1/2 u-width-1/4@large c-text-smallprint">
                <span>
                  <img src={skyLogo} className="footer-img"/>
                </span>
                <span className="copyright-text">
                  © 2019 Sky UK
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
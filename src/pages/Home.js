import React from "react";
import "../App.scss";
import SearchBar from "../components/SearchBar.js";
import "../styles/home.scss";

function Home() {
  return (
    <>
      <div className="c-hero hero-background">
        <div className="hero-title">
          <p className="hero-title-text" style = {{textShadow: "2px 2px 3px black"}}>Find your next course...</p>
          <SearchBar />
        </div>
      </div>

      <div className="o-container o-container--ee u-padding-bottom-large u-padding-top-large">
        <div className="o-layout__item">
          <h2 className="c-heading-bravo">
            Welcome to Sky’s Agile University.
          </h2>
          <p className="c-text-body">
            The Agile University is a Sky internal training initiative which
            covers all sorts of topics. The reason that it is called the Agile
            University is that everything we do at Sky is for quick delivery of
            quality products to our customers. Agile allows us to do this and
            therefore is centric to everything we do and strive to be.
          </p>
          <p className="c-text-body">
            Our courses will cover a range of topics including:
          </p>
          <ul>
            <li>Agile training.</li>
            <li>Techincal training.</li>
            <li>Self-development training.</li>
            <li>Good practises training.</li>
            <li>Any other training needs within Sky.</li>
          </ul>
          <p className="c-text-body">
            The Agile University is open to any Sky employee that is wanting to
            improve in the above topics. From Academy intakes to the more
            seasoned members of our Sky family, we aim to offer something for
            everyone.
          </p>
          <p className="c-text-body">
            If you belong to one of these groups, the Agile University could
            help:
          </p>
          <ul>
            <li>Academy intakes starting out at Sky.</li>
            <li>Current Sky employees looking to re-train.</li>
            <li>Leaders who want to send their staff on Sky based training.</li>
            <li>
              People starting to work with new processes, procedures or
              technologies.
            </li>
            <li>
              People who want to explore what other options Sky has to offer.
            </li>
          </ul>
          <p className="c-text-body">
            But wait, don’t just get trained, become a trainer. If you are
            passionate about what you know and do, share it with your fellow Sky
            employees. That way we can make Sky an even better place to work and
            carry on delivering the fantastic products that we have and deliver
            better ones in the future.
          </p>
          <p className="c-text-body">
            Some of the other features that will help you in your career are:
          </p>
          <ul>
            <li>Track what courses you have attended.</li>
            <li>
              See if you like a subject before you commit to changing roles.
            </li>
            <li>Prove to new teams that you have had the relevant training.</li>
            <li>Get taught by subject matter experts from Sky.</li>
            <li>Become a trainer and share your knowledge.</li>
            <li>Learn about new ways of working to benefit your teams.</li>
            <li>Fun and interactive.</li>
            <li>It is free to all Sky employees!</li>
          </ul>
          <p className="c-text-body">
            How it works? To make use of the Agile University, all you need to
            do is find the course you want, make sure you are available and book
            it. Don’t forget to book it in your calendar!! If it is fully
            booked, don’t panic as depending on the demand for it, we will
            re-run it for you. Learning does not have to be boring. Our courses
            are mostly classroom based but with lots of participation! If you
            are interested, please contact us at{" "}
            <a href="mailto:agileuniversity@sky.uk@sky.uk">
              agileuniversity@sky.uk
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;

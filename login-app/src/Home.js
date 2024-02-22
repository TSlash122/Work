import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "./assets/pizza.jpeg";
import "./styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> TECH'S BUFFET </h1>
        <p> A Buffet At Your Convinience</p>
        <Link to="/">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

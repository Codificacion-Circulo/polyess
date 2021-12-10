import React, { Fragment } from "react";
import homeBg from "../../assets/homePage/homeBg1";
import { Container, Button, Row, Col } from "react-bootstrap";

import "./Home.css";

function Home(props) {
  return (
    <Fragment>
      <div className="container homeContainer">
        <div className="d-flex homeContent">
          <div className="homeContentHeading">
            <h1>
              <span>Chess</span> - Play to Live
            </h1>
          </div>
          <div className="homeContentButton">
            <button className={"transAll"}>
              <i class="fas fa-arrow-circle-right"></i> Play Now
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div class="container-fluid modesContainer d-flex flex-column">
        <div className="modesContentHeading text-center">
          <h1>Our Gaming Modes!!!</h1>
        </div>
        <div class="row justify-content-center">
            <div class="scene col modesColumns transAll">
              <div class="items items-2">
                <div class="item font">the</div>
                <div class="item back">secret</div>
              </div>
            </div>
            <div class="scene col modesColumns transAll">
              <div class="items items-3">
                <div class="item font">the</div>
                <div class="item back">secret</div>
              </div>
            </div>
            <div class="scene col modesColumns transAll">
              <div class="items items-2">
                <div class="item font">the</div>
                <div class="item back">secret</div>
              </div>
            </div>
        </div>
      </div>
      <hr />
      <div className="container-fluid nftContainer">
        <div className="nftcontent">
          <div className="row">
            <div className="col nftColumns nftContentHeading">
              <h1>Nft Marketplace</h1>
            </div>
            <div className="col nftColumns nftContentImg d-flex justify-content-center">
              <img src={homeBg} alt="" srcset="" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container-fluid stakeContainer">
        <div className="stakeContent">
          <div className="row">
            <div className="col stakeColumns stakeContentHeading">
              <h1>Stake and Earn</h1>
            </div>
            <div className="col stakeColumns stakeContentImg d-flex justify-content-center">
              ddsg
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container-fluid tokenContainer">
        <div className="tokenContent">
          <div className="row">
            <div className="col tokenColumns tokenContentImg">ddsg</div>
            <div className="col d-flex justify-content-center tokenColumns tokenContentHeading">
              <h1>Earn Token</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container-fluid whyUsContainer">
        <div className="whyUsContent">
          <div className="whyUsTitle d-flex justify-content-center">
            <h1>Why Us</h1>
          </div>
          <div className="row">
            <div className="col whyUsColumns whyUsContentHeading">
              <h1>Decentralized</h1>
            </div>
            <div className="col d-flex justify-content-center whyUsColumns whyUsContentImg">
              ddsg
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
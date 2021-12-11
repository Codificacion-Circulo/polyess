import React, { Fragment } from "react";
import freeplay from "../../assets/homePage/freeplay.png";
import token from "../../assets/homePage/token.png";
import nftStaking from "../../assets/homePage/nftStaking.png";
import nft from "../../assets/homePage/nft.jpeg"
import { Container, Button, Row, Col } from "react-bootstrap";

import "./Home.css";

function Home(props) {
  return (
    <Fragment>
      <div className="home">
        <div className="container homeContainer">
          <div className="d-flex homeContent">
            <div className="homeContentHeading">
              <h1>
                <span>Live to play</span>
              </h1>
              <h4 className="text-light mt-3">
                First Play to earn Decentralised Chess site{" "}
              </h4>
            </div>
            <div className="homeContentButton">
              <button className={"transAll"}>
                <i className="fas fa-arrow-circle-right"></i> Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />


      <div className="container-fluid modesContainer d-flex flex-column">
        <div className="modesContentHeading text-center">
          <h1 style={{color: "#d1996d"}}>Our Gaming Modes!!!</h1>
        </div>
        <div className="row justify-content-center">
          <div className="scene col-md-4 modesColumns transAll">
            <div className="items items-2">
              <div className="item font">
                <img src={freeplay} alt="" srcset="" />
              </div>
              <div className="item back p-3">
                <h5 className="text-light">
                  Enjoy a simple game of chess with your friend. Just add a
                  username or a wallet address and play with your friends3
                  anywhere in the world with a connection of internet.
                </h5>
              </div>
            </div>
          </div>
          <div className="scene col-md-4 modesColumns transAll">
            <div className="items items-3">
              <div className="item font">
                <img src={token} alt="" srcset="" />
              </div>
              <div className="item back p-3">
                <h5 className="text-light">
                  Use Native Hess tokens and bet with your friends on who wins
                  the classic game of Chess staking an equal amount of tokens and reflect your 
                  hard tested strategies on the game Leaderboard.
                </h5>
              </div>
            </div>
          </div>
          <div className="scene col-md-4 modesColumns transAll">
            <div className="items items-2">
              <div className="item font">
                <img src={nftStaking} alt="" srcset="" />
              </div>
              <div className="item back p-3">
                <h5 className="text-light">
                  Give the king avatar of your NFT and have a real experience of
                  betting your assets while playing the classic game with your
                  friend and have a chance winning your friends NFT.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />


      <div className="container-fluid nftContainer">
        <div className="nftcontent">
          <div className="row">
            <div className="col nftColumns nftContentHeading d-flex flex-column justify-content-center">
              <h1 style={{color: "#d1996d"}}>Nft Marketplace</h1>
              <p className="text-light">Buy NFTs using Hess tokens which you won from your friends or bought with ethers. These NFTs feature the best chess players in India and the world and are all handmade with great details. And it is a pride to have them.</p>
            </div>
            <div className="col nftColumns nftContentImg d-flex justify-content-center">
              <img src={nft} style={{width: "40%", textAlign: "center"}} alt="" srcset="" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container-fluid stakeContainer">
        <div className="stakeContent">
          <div className="row">
            <div className="col stakeColumns stakeContentHeading">
              <h1 style={{color: "#d1996d"}}>Stake and Earn</h1>
            </div>
            <div className="col stakeColumns stakeContentImg d-flex justify-content-center">
              ddsg
            </div>
          </div>
        </div>
      </div>
      <hr />


      <div className="container-fluid whyUsContainer">
        <div className="whyUsContent">
          <div className="whyUsTitle d-flex justify-content-center">
            <h1 style={{color: "#d1996d"}}>Why Us</h1>
          </div>
          <div className="row">
            <div className="col whyUsColumns whyUsContentHeading">
              <h1 >Decentralized</h1>
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

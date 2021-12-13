import {useState,useEffect,Fragment,useContext} from 'react'
import axios from 'axios';
import { Redirect,useParams,Link } from 'react-router-dom'
import uuid from 'uuid/v4'
import { ColorContext } from '../../../store/colorcontext' 
import { useWeb3React} from '@web3-react/core'
import freeMode from "../../../assets/game/freeMode.jpg"
import nftMode from "../../../assets/game/nftMode.jpg"
import tokenMode from "../../../assets/game/tokenMode.jpg"

const socket  = require('../../../integration/connection/socket').socket;


function CreateNewGame(props) {
    const context = useWeb3React()
    const params=useParams();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const inputText=account
    const [didGetUserName,setDidGetUserName]= useState(false);
    const [gameId,setGameId]=useState("");
    const [userData,setUserData] = useState([]);
    var data = JSON.stringify({
        "address": account||'0x596F08aDAa76889161A98c9Bb79869e7f9518C70'
      });
      var config = {
        method: 'post',
        url: 'http://polyess-listner.herokuapp.com/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      useEffect(() => {
  
  const fetchData = async () => {
    try{
      const response=await axios(config);
  const result=await response.data;
  setUserData(result)
  console.log(result)
    }catch(e){
      console.log(e);
    }
  }
  
    fetchData();
  }, []);
    function send(){
        const newGameRoomId = uuid()
        setGameId(newGameRoomId)
        socket.emit('createNewGame', newGameRoomId)
    }
    const optionArray=[]
    for (const nft in userData.nfts) {
      console.log(nft)
      const arr=(<option value={nft.name}>{nft.name}</option>)
        optionArray.push(arr)
    }
    return (
        <Fragment>
        
        {account?
            didGetUserName ? 

            <Redirect to = {"/game/" + gameId}><button className="btn btn-success" style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>Start Game</button></Redirect>

        :
        
           <div>
           <div className="container mt-2 gameModesContainer d-flex flex-column">
        <div className="gameModeContent text-center m-5">
            <h1 className="text-danger">Gaming Modes</h1>
            <h3 className="mt-3 text-light">Choose a Mode to Play</h3>
        </div>

        <div className="row mt-1 mb-3">
          <div className="col-md-4 col-sm-6">
            <div className="card bg-black border-info text-light">
            <img src={freeMode} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text text-center">
                    Free to Play
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="card bg-black border-info text-light">
         <img src={tokenMode} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text text-center">
                    Token Betting
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="card bg-black border-info text-light">
           <img src={nftMode} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text text-center">
                    Nft Betting
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
      <div className="register-screen">
      <form  className="register-screen__form">
        <h3 className="register-screen__title">Create Game</h3>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            id="username"
            placeholder="Username"
            
            // onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            required
            id="address"
            autoComplete="true"
            placeholder="Wallet Address"
            value={`${account.substring(0, 6)}..${account.substring(account.length-4)}`}
            // onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" className="form-btn form-btn-primary">
          Register
        </button>
      </form>
    </div>
                {/* <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}} className="text-danger">Your Username: {userData&&userData.username} </h1>
                <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 8)) + "px"}} className="text-white mb-4">Your Address:  </h1>
  

                <button className="btn btn-primary mb-4" 
                    style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                    disabled = {!account} 
                    onClick = {() => {
                        props.didRedirect() 
                        props.setUserName(inputText) 
                        setDidGetUserName(true)
                        send()
                    }}>Ready</button> */}
            </div>
            :
            <h1>Connect</h1>
        }
        </Fragment>
    )
}


    
const Onboard = (props) => {
    const color = useContext(ColorContext)

    return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
}


export default Onboard
import {useState,useRef,Fragment,useContext} from 'react'
import { Redirect } from 'react-router-dom'
import uuid from 'uuid/v4'
import { ColorContext } from '../../store/colorcontext' 
import { useWeb3React} from '@web3-react/core'
const socket  = require('../connection/socket').socket


function CreateNewGame(props) {
    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const inputText=account
    const [didGetUserName,setDidGetUserName]= useState(false);
    const [gameId,setGameId]=useState("");
    const [userData,setUserData] = useState([]);
    var data = JSON.stringify({
        "address": account
      });
      var config = {
        method: 'post',
        url: 'http://polyess-listner.herokuapp.com/search',
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

    return (
        <Fragment>
        {account?
            didGetUserName ? 

            <Redirect to = {"/game/" + gameId}><button className="btn btn-success" style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>Start Game</button></Redirect>

        :
           <div>
                <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}} className="text-white">Your Username: {inputText} </h1>
                <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 8)) + "px"}} className="text-white mb-4">Your Address: {`${account.substring(0, 6)}..${account.substring(account.length-4)}`} </h1>
                {/* <h4 style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px"}} 
                      >{inputText}</h4> */}
                       
                <button className="btn btn-primary mb-4" 
                    style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                    disabled = {!account} 
                    onClick = {() => {
                        // When the 'Submit' button gets pressed from the username screen,
                        // We should send a request to the server to create a new room with
                        // the uuid we generate here.
                        props.didRedirect() 
                        props.setUserName(inputText) 
                        setDidGetUserName(true)
                        send()
                    }}>Ready</button>
            </div>:<h1>Connect</h1>
        }
        </Fragment>
    )
}


    
const Onboard = (props) => {
    const color = useContext(ColorContext)

    return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
}


export default Onboard
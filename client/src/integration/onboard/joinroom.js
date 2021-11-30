import {Fragment,useState} from 'react'
import { useWeb3React} from '@web3-react/core'
import JoinGame from './joingame'
import ChessGame from '../../components/game/chessUI/chessgame'



function JoinRoom(props) {
     const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const inputText=account
    const [didGetUserName,setDidGetUserName]= useState(false);
    return (
        <Fragment>
        {account?
            didGetUserName ? 
            <Fragment>
                <JoinGame userName = {inputText} isCreator = {false}/>
                <ChessGame myUserName = {inputText}/>
            </Fragment>
        :
           <div>
                <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>Your Username:</h1>

                <h4 style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px"}} 
                      >{inputText}</h4>
                       
                       <button className="btn btn-primary" 
                    style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                    disabled = {!account} 
                    onClick = {() => {
                        // When the 'Submit' button gets pressed from the username screen,
                        // We should send a request to the server to create a new room with
                        // the uuid we generate here.
                        setDidGetUserName(true)
                    }}>Submit</button>
            </div>:<h1>Connect</h1>
        }
        </Fragment>
    )
}



export default JoinRoom


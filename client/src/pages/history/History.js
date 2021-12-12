import {Fragment,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './History.css'
import winner from "../../assets/game/winner.png"
import loser from "../../assets/game/loser.png"

export default function History() {
    const params=useParams();
    const [historyData,setHistoryData] = useState([]);
    useEffect(() => {
        const url = `http://polyess-listner.herokuapp.com/games?gameId=${params.id}`;
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setHistoryData(json)
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
    }, []);
    return (
        <Fragment>
        <div className="container" style={{alignItems: 'center'}}>
        <div className="container d-flex justify-content-center farm-minning__first p-4 my-4">
         <div className="container">
             <h1 className="m-3" >
                 Winner
             </h1>
             <div className="container  d-flex flex-row">
             <img className="mx-2 p-2 border border-warning" src={winner} alt="create" height="50" style={{borderRadius:"14px",borderWidth:"4px"}}/>
                 <p className="text-left mx-3 my-auto">User<br/>Address</p>
                 <p className="text-right mx-3 my-auto">0 Box<br/>{historyData[0]&& `${historyData[0].initialPlayer.substring(0, 6)}..${historyData[0].initialPlayer.substring(historyData[0].initialPlayer.length-3)}`}</p>
             </div>
         </div>
 
         <hr style={{ border:"none",borderLeft:"1px solid hsla(200, 10%, 50%,100)",height:"100px",width:"1px"}}/>
         <div className="container">
             <h1 className="m-3" >
                 Loser
             </h1>
             <div className="container  d-flex flex-row">
             <img className="mx-2 p-2 border border-warning" src={loser} alt="create" height="50" style={{borderRadius:"14px",borderWidth:"4px"}}/>
                 <p className="text-left mx-3 my-auto">User<br/>Address</p>
                 <p className="text-right mx-3 my-auto">0 Box<br/>{historyData[0]&&`${historyData[0].finalPlayer.substring(0, 6)}..${historyData[0].finalPlayer.substring(historyData[0].finalPlayer.length-3)}`}</p>
             </div>
         </div>
 
         </div>

 
 
 
 
         <div className="container d-flex justify-content-center farm-minning__first p-4 my-4">
         <div className="container">
             <p className="m-3" >
                 Game Started by-
             </p>
             <p className="m-3" >{historyData[0]&& `${historyData[0].initialPlayer.substring(0, 6)}..${historyData[0].initialPlayer.substring(historyData[0].initialPlayer.length-3)}`}</p>
 
 <p className="m-3" >
                 Game Joined by-
             </p>
             <p className="m-3" >{historyData[0]&&`${historyData[0].finalPlayer.substring(0, 6)}..${historyData[0].finalPlayer.substring(historyData[0].finalPlayer.length-3)}`}</p>
 
         </div>
         
        {historyData[0]&&historyData[0].amount?( <div className="container">
             <p className="m-3" >
                Bet Amount
             </p>
             <p className="m-3" >{historyData[0]&&historyData[0].amount}</p>
 
 <p className="m-3" >
                Bet Ammount
             </p>
             <p className="m-3" >{historyData[0]&&historyData[0].amount}</p>
 
         </div>):(
            <div className="container">
             <p className="m-3" >
                Bet NFT ID-
             </p>
             <p className="m-3" >{historyData[0]&&historyData[0].initialNftId}</p>
 
 <p className="m-3" >
                Bet NFT ID-
             </p>
             <p className="m-3" >{historyData[0]&&historyData[0].finalNftId}</p>
 
         </div>
         )}
 
 
         </div>
        </div>
     </Fragment>
    )
}

import React,{Fragment,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import './HistoryBoard.css'
function HistoryBoard(props) {
    const [rankData,setRankData] = useState([]);
    useEffect(() => {
        const url = "http://polyess-listner.herokuapp.com/games?sort=gameId";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setRankData(json)
            console.log(json);
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
    }, []);
    return (
        <Fragment>

<div className="farm-leaderboard container px-4">

<div className="farm-leaderboard__head mx-auto px-auto">
    <p>GameId</p>
    <p>Player1</p>
    <p>Player2</p>
    <p>Bet Type</p>
</div>

{rankData&&rankData.map((data)=>(
    <Link to={"/history/"+data.gameId}>
    <div className="farm-leaderboard__content container py-3 px-3 my-4">
    <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
    <p>{`${data.initialPlayer.substring(0, 4)}..${data.initialPlayer.substring(data.initialPlayer.length-3)}`}</p>
    <p>{`${data.finalPlayer.substring(0, 4)}..${data.finalPlayer.substring(data.finalPlayer.length-3)}`}</p>
    <p>{data.amount?"Token":"NFT"}</p>
</div></Link>))}
</div>
    </Fragment>
    )
}


export default HistoryBoard


import React,{Fragment,useCallback,useEffect,useState} from 'react'
import './Leaderboard.css'
function Leaderboard(props) {
    const [rankData,setRankData] = useState([]);
    useEffect(() => {
        const url = "http://polyess-listner.herokuapp.com/users?limit=10&sort=-rank";
    
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
    const resultData = rankData.filter((data) => data.username !== "zero")
    return (
        <Fragment>

    <div className="farm-leaderboard container px-4">

        <div className="farm-leaderboard__head mx-auto px-auto">
            <p>LeaderBoard</p>
            <p>Username</p>
            <p>Rank</p>
        </div>

           {resultData.map((data,index)=>(
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{index+1}</p>
            <p>{data.username}</p>
            <p>{data.rank}</p>
        </div>))}
    </div>
    </Fragment>
    )
}


export default Leaderboard


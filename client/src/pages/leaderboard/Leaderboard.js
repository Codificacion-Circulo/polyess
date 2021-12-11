import React,{Fragment,useCallback,useEffect,useState} from 'react'
import './Leaderboard.css'
function Leaderboard(props) {
    const [rankData,setRankData] = useState();
    useEffect(() => {
        const url = "http://polyess-listner.herokuapp.com/users?sort=-rank";
    
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
    // const array=[];
    // Object.keys(rankData).map(function(key, value) {
    //     array.push(rankData[key] = rankData[value]);
    //   });
    //   console.log(array);
    return (
        <Fragment>
        <div className="farm-leaderboard__outer container d-flex justify-content-center">

<input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked/>
<label class="btn mx-2 py-3" for="success-outlined">Ranking</label>

<input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off"/>
<label class="btn mx-2 py-3" for="danger-outlined">Assets</label>


        </div>

    <div className="farm-leaderboard container px-4">

        <div className="farm-leaderboard__head mx-auto px-auto">
            <p>LeaderBoard</p>
            <p>Matches Won / Played</p>
        </div>
            
        <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">002</p>
            <p>Player Two Sigma</p>
            <p>-
           
            </p>
        </div>

        <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">232</p>
            <p>Player Three Beta</p>
            <p>-
           
            </p>
        </div>
       
    </div>
    </Fragment>
    )
}


export default Leaderboard


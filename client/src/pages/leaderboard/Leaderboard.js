import React,{Fragment} from 'react'
import './Leaderboard.css'

function Leaderboard(props) {
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
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">001</p>
            <p>Player One 729</p>
            <p>200/300
            </p>
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


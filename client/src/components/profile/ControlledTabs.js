import {Fragment,useState,useEffect} from 'react'
 import './ControlledTabs.css'
 import { Tab,Tabs } from 'react-bootstrap';
import blue from '../../assets/market/blue.png'


 function ControlledTabs(props) {
    const [key, setKey] = useState('nft');
    return (
     <div className="container profile p-4">
          <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="nft" title="NFT Collection">
          
<div class="container market-container py-4">
	<div class="row">
		

<div class="col-md-4">
    <div class="profile-card-6"><img src={blue} class="img img-responsive"/>
        <div class="profile-name">VISHWANATH
            <br/>AANAND</div>
        <div class="profile-overview">
            <div class="profile-overview">
                <div class="row text-center">
                    <div class="col-xs-4">
                        <h3 className="text-white">969</h3>
                        <p className="text-danger">Rank</p>
                    </div>
                   
                    <div class="col-xs-4">
                    <h3 className="text-white">INDIA</h3>
                        <p className="text-danger">COUNTRY</p>
                    </div>

                    <div class="col-xs-4">
                      <button className="btn btn-success">BUY</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

	</div>
</div>
        </Tab>
        <Tab eventKey="history" title="Game History">
        <div className="farm-leaderboard container px-4">

        <div className="farm-leaderboard__head mx-auto px-auto">
            <p>GameId</p>
            <p>Player1</p>
            <p>Player2</p>
            <p>Status</p>
        </div>

        {props.arrayWin&&props.arrayWin.map((data)=>(
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
            <p>{data.initialPlayer}</p>
            <p>{data.finalPlayer}</p>
            <p>Won</p>
        </div>))}

        {props.arrayLost&&props.arrayLost.map((data)=>(
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
            <p>{data.initialPlayer}</p>
            <p>{data.finalPlayer}</p>
            <p>Lost</p>
        </div>))}
       
        </div>
        </Tab>
      </Tabs>
     </div>
    );
  }
  




export default ControlledTabs
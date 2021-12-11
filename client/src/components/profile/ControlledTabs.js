import {Fragment,useState,useEffect} from 'react'
 import './ControlledTabs.css'
 import { Tab,Tabs } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';


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
          <h1>Hello</h1>
        </Tab>
        <Tab eventKey="history" title="Game History">
        <div className="farm-leaderboard container px-4">

        <div className="farm-leaderboard__head mx-auto px-auto">
            <p>GameId</p>
            <p>Winner</p>
            <p>Loser</p>
        </div>
        {props.arrayWin&&props.arrayWin.map((data)=>(
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
            <p>{data.winner}</p>
            <p>{data.loser}</p>
        </div>))}

        {props.arrayLost&&props.arrayLost.map((data)=>(
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
            <p>{data.winner}</p>
            <p>{data.loser}</p>
        </div>))}
        </div>
        </Tab>
      </Tabs>
     </div>
    );
  }
  




export default ControlledTabs
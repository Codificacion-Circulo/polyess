import {Fragment,useState,useEffect} from 'react'
 import './ControlledTabs.css'
 import { Tab,Tabs } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';


 function ControlledTabs() {
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
        {propTypes.array.map((data,index)=>(
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{index+1}</p>
            <p>{data.username}</p>
            <p>{data.rank}</p>
        </div>))}
        </Tab>
      </Tabs>
     </div>
    );
  }
  




export default ControlledTabs
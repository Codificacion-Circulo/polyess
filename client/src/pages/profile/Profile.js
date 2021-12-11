import {Fragment,useState,useEffect} from 'react'
 import './Profile.css'
 import { Tab,Tabs } from 'react-bootstrap';
 import axios from 'axios'
 import { useWeb3React} from '@web3-react/core'


 function ControlledTabs() {
    const [key, setKey] = useState('collection');
  
    return (
     <div className="container text-center">
          <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="collection" title="NFT Collection">
          <h1>Change 1</h1>
        </Tab>
        <Tab eventKey="history" title="Game History">
          <h1>Change 2</h1>
        </Tab>
      </Tabs>
     </div>
    );
  }





function Profile(props) {
    const context = useWeb3React()
    const [UserData, setUserData] = useState({})
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const userAddr=account
    var data = JSON.stringify({
      "address": "0x596F08aDAa76889161A98c9Bb79869e7f9518C70"
    });
    var config = {
      method: 'post',
      url: 'http://polyess-listner.herokuapp.com/login',
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
    return (
        <section class="section about-section" id="about">
            <div class="container p-4 my-4 profile">
                <div class="row align-items-center flex-row-reverse justify-content-center text-center">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="text-light">{UserData.user && UserData.user.username}</h3>
                            <h6 class="theme-color lead">{account}</h6>
                        </div>
                    </div>
                </div>
                <div class="counter my-4">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="500" data-speed="500">{UserData.user && UserData.user.token}</h6>
                                <p class="m-0px font-w-600 text-light">Tokens Count</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="150" data-speed="150">{UserData.nfts && UserData.nfts.length}</h6>
                                <p class="m-0px font-w-600 text-light">NFT Count</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="850" data-speed="850">{UserData.win && UserData.win.length}</h6>
                                <p class="m-0px font-w-600 text-light">Games Won</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="190" data-speed="190">{UserData.loose && UserData.loose.length}</h6>
                                <p class="m-0px font-w-600 text-light">Total Games Played</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="m-0"/>
<ControlledTabs/>
        </section>
    )
}



export default Profile


import {Fragment,useState} from 'react'
 import './Profile.css'
 import { Tab,Tabs } from 'react-bootstrap';
 import { useWeb3React} from '@web3-react/core'


 function ControlledTabs() {
    const [key, setKey] = useState('home');
  
    return (
     <div className="container text-center">
          <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="home" title="Home">
          <h1>Change 1</h1>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <h1>Change 2</h1>
        </Tab>
      </Tabs>
     </div>
    );
  }
  



function Profile(props) {
    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const userAddr=account
    return (
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">Deepak Kumar</h3>
                            <h6 class="theme-color lead">{userAddr}</h6>
                            <p>specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                            <div class="row about-list">
   
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>info@domain.com</p>
                                    </div>
                                    <div class="media">
                                        <label>Twitter</label>
                                        <p>820-885-3321</p>
                                    </div>
                            
                                </div>
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Insta</label>
                                        <p>4th april 1998</p>
                                    </div>
                                    <div class="media">
                                        <label>Site</label>
                                        <p>22 Yr</p>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar text-center">
                            <img src="https://picsum.photos/id/237/400/400" className="ui-w-100 rounded-circle" title="" alt=""/>
                        </div>
                    </div>
                </div>
                <div class="counter my-4">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500">500</h6>
                                <p class="m-0px font-w-600">Tokens Count</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="150" data-speed="150">150</h6>
                                <p class="m-0px font-w-600">NFT Count</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="850" data-speed="850">850</h6>
                                <p class="m-0px font-w-600">Games Won</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="190" data-speed="190">190</h6>
                                <p class="m-0px font-w-600">Total Games Played</p>
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


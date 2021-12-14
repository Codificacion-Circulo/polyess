import { Fragment, useState, useEffect, useContext } from 'react';
 import './Profile.css';
 import axios from 'axios';
 import {useParams} from 'react-router-dom';
 import { useWeb3React} from '@web3-react/core';
 import ControlledTabs from '../../components/profile/ControlledTabs';
 import AuthContext from '../../store/auth-context';
 import LoadingSpinner from '../../components/misc/LoadingSpinner/LoadingSpinner';

function Profile(props) {
    const context = useWeb3React()
    const ctx = useContext(AuthContext);
    console.log(ctx.registered)
//     const [UserData, setUserData] = useState({})
//     const { connector, library, chainId, account, activate, deactivate, active, error } = context
//     let { id } = useParams();
//     var data = JSON.stringify({
//       "address": id||"0x596F08aDAa76889161A98c9Bb79869e7f9518C70"
//     });
//     var config = {
//       method: 'post',
//       url: 'http://polyess-listner.herokuapp.com/login',
//       headers: { 
//         'Content-Type': 'application/json'
//       },
//       data : data
//     };
//     useEffect(() => {

// const fetchData = async () => {
//   try{
//     const response=await axios(config);
// const result=await response.data;
// setUserData(result)
// console.log(result)
//   }catch(e){
//     console.log(e);
//   }
// }

//   fetchData();
// }, []);
    return (
        <Fragment>
        {ctx.loading&&<LoadingSpinner/>}
        <section class="section about-section" id="about">
            <div class="container p-4 my-4 profile">
                <div class="row align-items-center flex-row-reverse justify-content-center text-center">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="text-light">{ctx.registered && ctx.loginData.user && ctx.loginData.user.username}</h3>
                            <h6 class="theme-color lead">{ctx.loginData.user && `${ctx.loginData.user.address.substring(0, 6)}...${ctx.loginData.user.address.substring(ctx.loginData.user.address.length-4)}`}</h6>
                        </div>
                    </div>
                </div>
                <div class="counter my-4">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="500" data-speed="500">{ctx.loginData.user && ctx.loginData.user.token}</h6>
                                <p class="m-0px font-w-600 text-light">Tokens Count</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="150" data-speed="150">{ctx.loginData.nfts && ctx.loginData.nfts.length}</h6>
                                <p class="m-0px font-w-600 text-light">NFT Count</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="850" data-speed="850">{ctx.loginData.win && ctx.loginData.win.length}</h6>
                                <p class="m-0px font-w-600 text-light">Games Won</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2 text-success" data-to="190" data-speed="190">{ctx.loginData.loose && ctx.loginData.loose.length}</h6>
                                <p class="m-0px font-w-600 text-light">Games Lost</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="m-0"/>
<ControlledTabs arrayWin={ctx.loginData.win && ctx.loginData.win} arrayNft={ctx.loginData.nfts && ctx.loginData.nfts} arrayLost={ctx.loginData.loose && ctx.loginData.loose}/>
        </section>
        </Fragment>
    )
}



export default Profile


import {Fragment,useState} from 'react'
 import './Nft.css'
 import { Tab,Tabs } from 'react-bootstrap';
 import { useWeb3React} from '@web3-react/core'
 import blue from '../../assets/market/blue.png'

function Nft(props) {
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
                                        <label>Joined</label>
                                        <p>4th april 1998</p>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar text-center">
                            <img src={blue} title="" alt="" style={{width: "50%"}}/>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="m-0"/>
        </section>
    )
}



export default Nft

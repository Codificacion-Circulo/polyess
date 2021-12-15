import {Fragment,useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
 import './Nft.css'
 import { Tab,Tabs } from 'react-bootstrap';
 import { useWeb3React} from '@web3-react/core'

function Nft(props) {
    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const userAddr=account
    const params=useParams();
    const [nftData,setNftData] = useState([]);
    useEffect(() => {
        const url = 'https://polyess-listner.herokuapp.com/nfts?assetId='+params.id;
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setNftData(json)
            console.log(json);
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
    }, []);
    return (
        <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="text-info">{nftData[0] && nftData[0].name}</h3>
                            <h6 className="theme-color lead">Owned By - {nftData[0] && (nftData[0].owner_name || "OnSale")}</h6>
                            <p className='text-light'>{nftData[0] && nftData[0].description}</p>
                            <div className="row about-list">
   
                                <div className="col-md-6">
                                    <div className="media">
                                        <label className='text-danger'>Trait</label>
                                        <p className='text-light'>{nftData[0] && nftData[0].attributes.trait}</p>
                                    </div>
                                    <div className="media">
                                        <label className='text-danger'>Rank</label>
                                        <p className='text-light'>{nftData[0] && nftData[0].attributes.rank}</p>
                                    </div>
                            
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label className='text-danger'>Country</label>
                                        <p className='text-light'>{nftData[0] && nftData[0].attributes.country}</p>
                                    </div>
                                    <div className="media">
                                        <label className='text-danger'>Price</label>
                                        <p className='text-light'>{nftData[0] && nftData[0].price}</p>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar text-center">
                            <img src={"https://gateway.pinata.cloud/ipfs/QmPWCagNgzp5P2TigD471JMr2bzjkhsjLEQFHTR4hAqnrg/"+params.id+".png"} title="" alt="" style={{width: "50%"}}/>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="m-0"/>
        </section>
    )
}



export default Nft

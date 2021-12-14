import React, { Fragment, useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Market.css'
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner";
import blue from '../../assets/market/blue.png'
import red from '../../assets/market/red.png'
import golden from '../../assets/market/golden.png'

function Market(props) {
    const [nftData,setNftData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const url = "http://polyess-listner.herokuapp.com/nfts";
    
        const fetchData = async () => {
          try {
            setLoading(true)
            const response = await fetch(url);
            const json = await response.json();
            setNftData(json)
            console.log(json);
            setLoading(false)
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
    }, []);
    return (
        <Fragment>
{loading&&<LoadingSpinner/>}
             <div class="container text-center">

<div class="logo my-3">
      <h1 style={{color: "#d1996d"}}><b>NFT Marketplace</b></h1>
</div>

</div>


<div class="container">
  <div class="row">
    		
{nftData&&nftData.map((data)=>(
    <div class="col-4">

<Link to={"/market/"+data.assetId}>
   

    <div class="profile-card-6 mx-auto"><img src={data.image} class="img img-responsive"/>
        <div class="profile-name">{data.name}</div>
        <div class="profile-overview">
            <div class="profile-overview">
                <div class="row text-center">
                    <div class="col-xs-4">
                        <h3 className="text-white">{data.attributes.rank}</h3>
                        <p className="text-danger">Rank</p>
                    </div>
                   
                    <div class="col-xs-4">
                    <h3 className="text-white">{data.attributes.country}</h3>
                        <p className="text-danger">COUNTRY</p>
                    </div>

                  
                </div>
            </div>
        </div>
    </div>
</Link>

</div>))}
  </div>
</div>
        </Fragment>
    )
}



export default Market


import React, { Fragment, useState } from 'react'
import './Market.css'
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner";
import blue from '../../assets/market/blue.png'
import red from '../../assets/market/red.png'
import golden from '../../assets/market/golden.png'

function Market(props) {
    const [loading, setLoading] = useState(false)
    return (
        <Fragment>
        {loading&&<LoadingSpinner/>}
             <div class="container text-center">

<div class="logo my-3">
      <h1 style={{color: "#d1996d"}}><b>NFT Marketplace</b></h1>
</div>

</div>




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
        </Fragment>
    )
}



export default Market


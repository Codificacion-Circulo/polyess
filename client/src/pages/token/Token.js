import React, { Fragment } from 'react'
import './Token.css'
import BlueBox from '../../assets/header/logo.png'

export default function Token() {
    return (
        <Fragment>
        <div className="farm-mystrey container mt-4 pt-4">
          <div className="row">
            <div className="col-md">
              <div className="farm-mystrey__left d-flex flex-column justify-content-center text-center pt-3 m-3">
                <p>Buy / Sell Hess Tokens</p>
                <img src={BlueBox} class="img-fluid rounded mx-auto my-3 d-block" alt="Responsive image" width="50%" />
         
              </div>
            </div>
            <div className="col-md">
              <div className="container d-flex align-items-start flex-column m-sm-3">
                <div className="farm-mastrey__right__box container farm-mystrey__left d-flex flex-column text-center mb-3 py-3 px-2">
                  <p>Buy Tokens</p>
  
                  <div class="form-floating m-2">
                    <input type="number" class="form-control input-group-sm mb-3" id="floatingInput"/>
                  </div>
  
  
                  <div className="farm-mystrey__button my-2"> <button>Deposit</button>
                    <button>Withdraw</button></div>
  
                </div>
  
                <div className="farm-mastrey__right__box container farm-mystrey__left d-flex flex-column text-center mb-3 py-3 px-2">
                  <p>Sell Tokens</p>
  
                  <div class="form-floating m-2">
                    <input type="number" class="form-control input-group-sm mb-3" id="floatingInput"/>
                  </div>
  
  
                  <div className="farm-mystrey__button mt-0 my-2"> <button>Deposit</button>
                    <button>Withdraw</button></div>
  
                </div>
  
  
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
}

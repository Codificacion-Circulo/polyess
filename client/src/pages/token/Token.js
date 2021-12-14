import React, { Fragment,useEffect,useState } from 'react'
import './Token.css'
import { contract_addr,contract_abi } from '../../contracts/Contract'
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner"
import Web3 from 'web3'
import BlueBox from '../../assets/header/logo.png'

export default function Token() {
  const [account, setAccount] = useState('');
  const [contract, setcontract] = useState({});
  const [deposit,setDeposit]=useState('0');
  const [loading, setLoading] = useState(false)
  const loadBlockhainData=async()=>{
    const web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
    const accounts=await web3.eth.getAccounts()
    setAccount(accounts[0])
    const contr=new web3.eth.Contract(contract_abi,contract_addr)
    setcontract(contr)
  };
  useEffect(() => {
    loadBlockhainData();
    return function cleanup() {
        loadBlockhainData();
    }
  }, [account])
  const depositChangeHandler=(event)=>{
    const dAmount=event.target.value;
    setDeposit(dAmount)
  }

  const depositFormSubmission=async(e)=>{
    e.preventDefault();
    try {
      const recipt=await contract.methods.buy_hess().send({
        from:account,
        value:deposit.toString()
        })
      console.log(recipt)
    } catch (error) {
      console.log("Something went Wrong", error);
    }
  }

    return (
        <Fragment>
        {loading&&<LoadingSpinner/>}
        <div className="farm-mystrey container mt-4 pt-4">
          <div className="row">
            <div className="col-md">
              <div className="farm-mystrey__left d-flex flex-column justify-content-center text-center pt-3 m-3 my-2 rounded">
                <p>Buy / Sell Hess Tokens</p>
                <img src={BlueBox} class="img-fluid rounded mx-auto my-3 d-block" alt="Responsive image" width="50%" />
         
              </div>
            </div>
            <div className="col-md">
              <div className="container d-flex align-items-start flex-column m-sm-3">
                <div className="farm-mastrey__right__box container farm-mystrey__left d-flex flex-column text-center mb-3 py-3 px-2">
                  <p>Buy Tokens</p>
                  <p className='fs-6 text-info'>1 Eth = 10<sup>12</sup> &nbsp; Tokens</p>
                  <div class="form-floating m-2">
                    <input type="number" onChange={depositChangeHandler} class="form-control input-group-sm mb-3" id="floatingInput" required={true}/>
                  </div>
  
  
                  <div className="farm-mystrey__button my-2">
                  <button onClick={depositFormSubmission}>Deposit</button>
                  </div>
  
                </div>
  
                <div className="farm-mastrey__right__box container farm-mystrey__left d-flex flex-column text-center mb-3 py-3 px-2">
                  <p>Sell Tokens</p>
                  <p className='fs-6 text-info'>1 Eth = 9.09*10<sup>11</sup> &nbsp; Tokens</p>
                  <div class="form-floating m-2">
                    <input type="number" class="form-control input-group-sm mb-3" id="floatingInput"/>
                  </div>
  
  
                  <div className="farm-mystrey__button mt-0 my-2">
                    <button>Withdraw</button></div>
  
                </div>
  
  
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
}
